import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import UserActions from './../Redux/UserRedux'
import { showAlertBox, logStore, showSuccesstBox } from './../Redux/commonRedux'
import { put, call } from 'redux-saga/effects'
import { changeto } from '../Redux/ScreenRedux'
import Lang from './../Lib/CutomLanguage'
import language from './../Lib/CutomLanguage'

/**
 * try log in user
 * @param {username, password}
 */

export const confirmAccessCode = function * (API, action) {
  console.log(action)
  // action.accessCodeContainer.navigation.navigate(action.accessCodeContainer.route)
  const { accessCode, navigation, route } = action.accessCodeContainer

  try {
    // show loader
    yield call(loaderHandler.showLoader, language.authenticating)

    const requestedHostId = yield call(API.postConfirmAccessCode, {accessCode})
    __DEV__ && console.log('requestedHostId: ', requestedHostId)
    // status success
    if (requestedHostId.ok && requestedHostId.data.status === 1) {

      __DEV__ && console.log('requestedHostId.ok: ', requestedHostId)
      // log in successfully
      // set user info to states for fast retrieving
      const hostID = requestedHostId.data.data._id
    
     // yield put(UserActions.setHostId(hostID))
      yield put(UserActions.mergeState({hostId: hostID, accessCode: accessCode}))
      // redirect user to dashboard after success login
      yield call(changeto, navigation, route)
      
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    // yield put(LoginActions.loginFailure(e.message))
    // message must be  fixed according to mister jacob
    // yield call(showAlertBox, e.message)
    __DEV__ && console.log('error in access code ', e)
    yield call(showAlertBox, Lang.txt_B08)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  yield call(logStore)
}

export const registerAccessCode = function * (API, action) {
  console.log(action)
  // action.accessCodeContainer.navigation.navigate(action.accessCodeContainer.route)
  const { registrationData } = action.coderegistrationnavroute
  console.log(action.coderegistrationnavroute)

  try {
    // show loader
    yield call(loaderHandler.showLoader, language.registering)

    // fetch Host Id
    const registration = yield call(API.postRequestAccessCode, {registrationData})
    // status success
    if (registration.ok && registration.data.status === 1) {
      __DEV__ && console.log('registrationAcesscode result', registration)
      // register successfully
      // successs mesage must thank you for your message. The app will now be closed
      yield call(showSuccesstBox, Lang.txt_B17, 'appClosed')

      // be remove becuase the must be closed after success
      // yield call(changeto, navigation, route)
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    // yield put(LoginActions.loginFailure(e.message))
    yield call(showAlertBox, e.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  yield call(logStore)
}
