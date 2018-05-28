import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import UserActions from './../Redux/UserRedux'
import { changeto } from '../Redux/ScreenRedux'
import { getLanguageState } from './../Redux/LanguageRedux'
import { put, call, select } from 'redux-saga/effects'
import { showAlertBox, logStore, showSuccesstBox } from './../Redux/commonRedux'

/**
 *
 * @description confirmAccessCode
 * @param {username, password}
 *
 */
export const confirmAccessCode = function * (API, action) {
  const language = yield select(getLanguageState)
  const { accessCode, navigation, route } = action.accessCodeContainer
  try {
    yield call(loaderHandler.showLoader, language.authenticating)
    const requestedHostId = yield call(API.postConfirmAccessCode, {accessCode})
    if (requestedHostId.ok && requestedHostId.data.status === 1) {
      const hostID = requestedHostId.data.data._id
      yield put(UserActions.mergeState({hostId: hostID, accessCode: accessCode}))
      yield call(changeto, navigation, route)
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    yield call(showAlertBox, language.txt_B08)
  }
  yield call(loaderHandler.hideLoader)
  yield call(logStore)
}

/**
 *
 * @description registerAccessCode
 * @param {action: registrationData}
 *
 */
export const registerAccessCode = function * (API, action) {
  const language = yield select(getLanguageState)
  const { registrationData } = action.coderegistrationnavroute
  try {
    yield call(loaderHandler.showLoader, language.registering)
    const registration = yield call(API.postRequestAccessCode, {registrationData})
    if (registration.ok && registration.data.status === 1) {
      yield call(showSuccesstBox, language.txt_B17, 'appClosed')
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    yield call(showAlertBox, e.message)
  }
  yield call(loaderHandler.hideLoader)
  yield call(logStore)
}
