import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import { put, call, select } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import UserActions, { setTheme, INITIAL_STATE as USER_INITIAL_STATE, defualtCoordinate } from './../Redux/UserRedux'
import { showAlertBox, logStore, AppData } from './../Redux/commonRedux'
import LanguageActions, { getLanguageState } from './../Redux/LanguageRedux'
import { changeto } from '../Redux/ScreenRedux'
import RepoertsActions from '../Redux/ReportsRedux'

import { popUpAlert } from './../Lib/Helper/alertHelper'
import { onloginPopUp, getApprovedTeamList } from './../Transforms/Filters'

import { convertActiveDesignToDesign, designDefault, getHostLangauge } from '../Transforms/themeHelper'
import validator from 'validator'
import { isOffGPS } from '../Redux/SettingRedux'

/**
 *
 * try log in user
 * @param {username, password}
 *
 */

export const login = function * (API, action) {
  const language = yield select(getLanguageState)
  const isHasGPS = yield select(isOffGPS)
  const {username, password, navigation, route, params} = action.userpassnavroute
  const { noLoader, onFailed } = params || { noLoader: false, onFailed: () => {} }
  try {
    if (!noLoader) {
      yield call(loaderHandler.showLoader, language.txt_C08)
    }
    const requestedUserAccount = yield call(API.postLogin, { username, password })
    let userWithToken = {}
    if (requestedUserAccount.ok && requestedUserAccount.data.status === 1) {
      // filter if use is blocked
      if (requestedUserAccount.data.data.user.isBlocked) {
        throw new Error(language.blockedUser)
      }

      const _host = requestedUserAccount.data.data.user._host ? requestedUserAccount.data.data.user._host._id : null
      const isSpecific = requestedUserAccount.data.data.user._host ? requestedUserAccount.data.data.user._host.isSpecific : false
      const userHost = requestedUserAccount.data.data.user._host

      userWithToken = {
        radius: USER_INITIAL_STATE.radius,
        ...requestedUserAccount.data.data.user,
        token: requestedUserAccount.data.data.token,
        teamList: getApprovedTeamList(requestedUserAccount.data.data.user)
      }
      // set _host couse backend change string to {} so i will manual here
      userWithToken._host = _host
      userWithToken._hostIsSpecific = isSpecific

      __DEV__ && console.log('requestedUserAccount', requestedUserAccount)
      __DEV__ && console.log('userWithToken', userWithToken)

      yield call(AppData.setUserInfo, userWithToken)

      // set user info to states for fast retrievinggs
      yield put(UserActions.setCurrentUser(userWithToken))

      // save to global for faster access to use account
      global.usersAccount = userWithToken
      const design = convertActiveDesignToDesign({ ...requestedUserAccount.data.data._activeDesign, isSpecific: isSpecific })
      const userLanguage = getHostLangauge(userHost)

      yield call(setTheme, design)
      yield call(AppData.setTheme, design)
      yield call(AppData.setLogin, { username: username, password: password })  // save user login data to local
      yield put(UserActions.mergeState({design: design, host: userHost}))

      yield call(AppData.setLanguage, {code: userLanguage})
      yield put(LanguageActions.setLanguage(userLanguage))

      yield call(AppData.setHost, userHost)  // save host

      // initalizse login
      const {lat, long} = userHost || defualtCoordinate
      if (!isHasGPS) {
        if (validator.isLatLong(`${lat},${long}`)) {
          yield put(RepoertsActions.setlogininitReport({lat: lat, long: long}))
        } else {
          // if host coordinate is invalid
          yield call(popUpAlert, { title: language.posistionError, message: language.hostCoordinateIsInvalid, pressok: () => {} })
        }
      }

      // filter if it has login message
      const hasBlocker = yield call(onloginPopUp, {userData: userWithToken})
      if (hasBlocker.access && hasBlocker.message) {
        if (params && !params.popup) {
          yield call(changeto, navigation, route)
        } else {
          yield call(popUpAlert, { title: 'Team', message: hasBlocker.message, pressok: () => changeto(navigation, route) })
        }
      } else if (hasBlocker.access) {
        yield call(changeto, navigation, route)
      } else {
        yield call(popUpAlert, { title: ' ', message: hasBlocker.message, pressok: () => {} })
      }
    } else if (requestedUserAccount.status === 401) {
      throw new Error(language.invalidCredentials)
    } else {
      throw new Error(language.txt_C07)
    }
  } catch (e) {
    __DEV__ && console.log('e.message: ', e)
    yield put(LoginActions.loginFailure(e.message))
    // run cb from referense
    if (noLoader) {
      onFailed()
    } else {
      yield call(showAlertBox, e.message)
    }
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  yield call(logStore)
}
/**
 * @description comfigure app
 * @param
 */

export const appStart = function * (API, action) {
  try {
    const theme = yield call(AppData.getTheme)
    const design = JSON.parse(theme)
    if (design !== null && design.button !== undefined) {
      yield call(setTheme, design)
      yield put(UserActions.mergeState({design: design}))
    }
  } catch (e) {
    yield call(setTheme, designDefault)
  }
}
