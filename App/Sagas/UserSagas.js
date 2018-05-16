import loaderHandler from 'react-native-busy-indicator/LoaderHandler'

import validator from 'validator'
import LoginActions from '../Redux/LoginRedux'
import UserActions, { isValidUserName, isValidMobileNumber, getUser, getUserState } from './../Redux/UserRedux'
import ReportsActions from './../Redux/ReportsRedux'
import { popUpAlert, popUpAlertV2 } from './../Lib/Helper/alertHelper'
import { messageLoginPopup } from './../Transforms/Filters'

import { showAlertBox, logStore, AppData, showSuccesstBox, showSuccessBox, showAlertBoxWithTitle } from './../Redux/commonRedux'
import { put, call, select } from 'redux-saga/effects'
import { changeto } from '../Redux/ScreenRedux'
import language from '../Lib/CutomLanguage'
import { teamGetIsApproved } from '../Transforms/TeamHelper'
import { getSuccessMessage, getLoginParams } from '../Transforms/RegistrationHelper';

/**
 *
 * this module is hidden registration saga hahaha
 * registerUser
 * @param (API, { registrationData, navigation, route })
 *
 */

export function * registerUser (API, action) {
  const { registrationData, navigation, route } = action.registrationDatNavRoute
  // const user = yield select(getUser)
  __DEV__ && console.log('registerUser* registrationData', registrationData)
  let userWithToken = {}
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.registering)
    // fetch result
    const registrationResult = yield call(API.postRegisterUser, { registrationData })

    __DEV__ && console.log('registrationResult', registrationResult)

    // status success
    if (registrationResult.ok && registrationResult.data.status === 1) {
      userWithToken = {...registrationResult.data.data.user, token: registrationResult.data.data.token}
      const successMessage = getSuccessMessage(registrationData.isVolunteer, registrationData._team ? true : false)
      const loginParams = getLoginParams(registrationData.isVolunteer, registrationData._team ? true : false, registrationData.username, registrationData.password)
      __DEV__ && console.log('requestedUserAccount', registrationResult)
      __DEV__ && console.log('userWithToken', userWithToken)
      global.usersAccount = userWithToken
      yield put(UserActions.setCurrentUser(userWithToken))
      yield call(AppData.setUserInfo, userWithToken)
      yield call(showSuccessBox, successMessage, () => navigation.navigate(route, loginParams))
      // yield call(changeto, navigation, route)
    } else if (registrationResult.status === 500) {
      // server error
      throw new Error(language.networkError)
    } else if (registrationResult.status === 400) {
      // client error
      if (registrationResult.data && registrationResult.data.data && registrationResult.data.data.error) {
        throw new Error(registrationResult.data.data.error) // success sending but error on something
      } else {
        throw new Error(language.failed) // success sending but error on something
      }
    } else {
      throw new Error(language.networkError)
    }

  } catch (e) {
//    yield put(LoginActions.loginFailure(e.message))
    yield call(showAlertBox, e.message)
    __DEV__ && console.log(e.message)
  }
  
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * validate input Email address of registering user
 * @param (API, { userEmail })
 * it listen to RIGISTER_SET_EMAIL
 *
 */

export function * validateEmail (API, action) {
  const { userEmail } = action
  __DEV__ && console.log('action', action)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying)

    // check localy if email is valid
    if (!validator.isEmail(userEmail)) {
      throw new Error(language.email + ' ' + language.invalid)
    }

    // validate from backend
    const validationResult = yield call(API.postValidateUserEmail, { userEmail })
    __DEV__ && console.log('Email validationResult', validationResult)

    // status success
    if (validationResult.ok && validationResult.data.status === 1) {
      yield put(UserActions.mergeState({isValidatedUserEmail: true}))
    } else if (validationResult.data && validationResult.data.status === 0) {
      throw new Error(language.email + ' ' + language.alreadyTaken)
    } else {
      throw new Error(language.email + ' ' + language.invalid)
    }
  } catch (e) {
    __DEV__ && console.log(e)
    yield put(UserActions.mergeState({isValidatedUserEmail: false}))
    showAlertBox(e.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * validate input UserName of registering user
 * @param (API, { userName })
 * it listen to RIGISTER_SET_USERNAME
 *
 */

export function * validateUserName (API, action) {
  const { userName, primeUserName } = action
  __DEV__ && console.log('action', action)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying)

    if (!(primeUserName.length > 1)) {
      throw new Error(language.username + ' ' + language.invalid)
    }

    // if (!isValidUserName(userName)) {
    //   throw new Error(language.txt_D42)
    // }

    // validate from backend
    const validationResult = yield call(API.postValidateUserName, { userName })
    __DEV__ && console.log('userName validationResult', validationResult)

    // status success
    if (validationResult.ok && validationResult.data.status === 1) {
      yield put(UserActions.mergeState({isValidatedUserName: true}))
    } else if (validationResult.ok && validationResult.data.status === 0) {
      throw new Error(language.username + ' ' + language.alreadyTaken)
    } else {
      throw new Error(language.request + ' ' + language.failed)
    }
  } catch (e) {
    __DEV__ && console.log(e)
    yield put(UserActions.mergeState({isValidatedUserEmail: false}))
    showAlertBox(e.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * validate input Postal code  of registering user
 * @param (API, { postalCode })
 * it listen to RIGISTER_SET_POSTALCODE
 *
 */

export function * validatePostalCode (API, action) {
  const { postalCode } = action
  __DEV__ && console.log('action', action)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.postalCode)

    // check localy if postalCode is valid
    if (!validator.isPostalCode(postalCode, 'NL')) {
      throw new Error(language.invalid + ' ' + language.postalCode)
    }
    yield put(UserActions.mergeState({isValidatedPostalCode: true}))
    /*
    // validate from backend
    const validationResult = yield call(API.postConfirmAccessCode, { postalCode })
    __DEV__ && console.log('userName validationResult', validationResult)

    // status success
    if (validationResult.ok && validationResult.data.status === 1) {
      yield put(UserActions.mergeState({isValidatedPostalCode: true}))
    } else {
      throw new Error('invalid postal code')
    }
    */
  } catch (e) {
    __DEV__ && console.log(e)
    yield put(UserActions.mergeState({isValidatedPostalCode: false}))
    showAlertBox(e.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * @description validate city: this will be base to get coordinate
 * @param (API, { city })
 * it listen to REGISTER_SET_CITY
 *
 */

export function * validateCity (API, action) {
  const { city } = action

  const user = yield select(getUserState)

  __DEV__ && console.log('user', user)
  __DEV__ && console.log('action', action)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.city)
    const validationResult = yield call(API.postValidateLocate, { city, coordinate: user.position, isCoor: user.isCoor })
    __DEV__ && console.log('city validationResult', validationResult)

    // status success
    if (validationResult.ok && validationResult.data.status === 1) {
      __DEV__ && console.log('validationResult', validationResult)
      // success in getting _host
      yield put(UserActions.mergeState({isValidatedCity: true})) // un finished <-------|
      yield put(UserActions.mergeState({hostId: validationResult.data.data._host}))
    } else if (validationResult.ok && validationResult.data.status === 0) {
      throw new Error(language.city + ' ' + language.invalid)
    } else {
      throw new Error(language.request + ' ' + language.failed)
    }
  } catch (e) {
    __DEV__ && console.log(e)
    yield put(UserActions.mergeState({isValidatedCity: false}))
    showAlertBox(e.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * validate input phone number of registering user
 * @param (API, { postalCode })
 * it listen to REGISTER_SET_PHONE_NUMBER
 *
 */

export function * validatePhoneNumber (API, action) {
  const { phoneNumber } = action
  __DEV__ && console.log('action', action)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.mobileNumber)

    // check localy if phoneNumber is valid
    // if (!validator.isMobilePhone(phoneNumber, 'any')) {
    //   throw new Error(language.invalid + ' ' + language.mobileNumber)
    // }
    // check localy if phoneNumber is valid

    if (!isValidMobileNumber(phoneNumber)) {
      throw new Error(language.invalid + ' ' + language.mobileNumber)
    }

    yield put(UserActions.mergeState({isValidatedPhoneNumber: true}))

    /*
    // validate from backend
    const validationResult = yield call(API.postConfirmAccessCode, { postalCode })
    __DEV__ && console.log('userName validationResult', validationResult)

    // status success
    if (validationResult.ok && validationResult.data.status === 1) {
      yield put(UserActions.mergeState({isValidatedPostalCode: true}))
    } else {
      throw new Error('invalid postal code')
    }
    */
  } catch (e) {
    __DEV__ && console.log(e)
    yield put(UserActions.mergeState({isValidatedPhoneNumber: false}))
    showAlertBox(e.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * validate input TeamName of registering user
 * @param (API, { postalCode })
 * it listen to REGISTER_SET_TEAMNAME
 *
 */

export function * validateTeamName (API, action) {
  const { teamName, isVolunteer } = action
  __DEV__ && console.log('action', action)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.txt_D38)

    // check localy if email is valid
    //                                 base on  ppt3:14
    if (!(teamName.length > 1) || (isVolunteer && !isValidUserName(teamName))) {
      throw new Error(language.nameInvalid)
    }

    // validate from backend
    const validationResult = yield call(API.postValidateTeamName, { teamName })
    __DEV__ && console.log('Team Name validationResult', validationResult)

    // status success
    if (validationResult.ok && validationResult.data.status === 1) {
      yield put(UserActions.mergeState({isValidatedTeamName: true}))
    } else if (validationResult.ok && validationResult.data.status === 0) {
      throw new Error(language.nameInvalid)
    } else {
      throw new Error(language.request + ' ' + language.failed)
    }
  } catch (e) {
    __DEV__ && console.log(e)
    yield put(UserActions.mergeState({isValidatedTeamName: false}))
    showAlertBox(e.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * validate input Email address of registering user
 * @param (API, { userEmail })
 * it listen to RIGISTER_SET_EMAIL
 *
 */

export function * validateTeamEmail (API, action) {
  const { teamEmail } = action
  __DEV__ && console.log('action', action)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.txt_D39)

    // check localy if email is valid
    if (!validator.isEmail(teamEmail)) {
      throw new Error(language.invalid + ' ' + language.txt_D39)
    }

    // validate from backend
    const validationResult = yield call(API.postValidateTeamEmail, { teamEmail })
    __DEV__ && console.log('Team Email validationResult', validationResult)

    // status success
    if (validationResult.ok && validationResult.data.status === 1) {
      yield put(UserActions.mergeState({isValidatedTeamEmail: true}))
    } else if (validationResult.ok && validationResult.data.status === 0) {
      throw new Error(language.txt_D39 + ' ' + language.alreadyTaken)
    } else {
      throw new Error(language.invalid + ' ' + language.txt_D39)
    }
    yield put(UserActions.mergeState({isValidatedTeamEmail: true}))
    __DEV__ && console.log(language.success, teamEmail)
  } catch (e) {
    __DEV__ && console.log(e)
    yield put(UserActions.mergeState({isValidatedTeamEmail: false}))
    showAlertBox(e.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * validate input Email address of registering user
 * @param (API, { userEmail })
 * it listen to RIGISTER_SET_EMAIL
 *
 */

export function * getTeamlist (API, action) {
  const { filter } = action
  __DEV__ && console.log(' filter: ', filter)

  try {
    // show loader
    // yield call(loaderHandler.showLoader, language.fetching + ' ' + language.txt_D03 + ' ' + language.list)
    yield put(ReportsActions.reportMergeState({fetchTeam: true}))

    // fetch from backend
    const result = yield call(API.getTeamList, { filter })
    __DEV__ && console.log('Team List result', result)

    // status success
    if (result.ok && result.data.status === 1) {
      yield put(UserActions.mergeState({teamList: teamGetIsApproved(result.data.data)}))
    } else {
      throw new Error(language.error)
    }
    __DEV__ && console.log('success', result.data.data)
  } catch (e) {
    __DEV__ && console.log(e)
    showAlertBox(e.message)
  }

  // clean screen
  // yield call(loaderHandler.hideLoader)
  yield put(ReportsActions.reportMergeState({fetchTeam: false}))
  // yield call(logStore)
}

/**
 * validate input Email address of registering user
 * @param (API, { userEmail })
 * it listen to RIGISTER_SET_EMAIL
 *
 */

export function * uploadTeamPhoto (API, action) {
  const { photo } = action
  let data = new FormData()
 // data.append('photo', photo)
  data.append('photo', {uri: photo.uri, name: photo.fileName, type: photo.type})

  __DEV__ && console.log(' photo: ', data)

  try {
    // show loader
    yield call(loaderHandler.showLoader, language.uploading + ' ' + language.txt_J16)
    // fetch from backend
    const result = yield call(API.postUploadPhoto, { data })
    __DEV__ && console.log('upload team photo', result)

    // status success
    if (result.ok && result.data.status === 1) {
      yield put(UserActions.mergeState({teamPhotoUploaded: result.data.data}))
    } else {
      throw new Error(language.uploading + ' ' + language.failed)
    }
    __DEV__ && console.log('success photo', result.data.data)
  } catch (e) {
    __DEV__ && console.log(e)
    showAlertBox(e.message)
  }

  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * @description request for new pasword using email
 * @param eMail
 * it listen to REGISTER_SET_PHONE_NUMBER
 *
 */

export function * requestPassword (API, action) {
  const { eMail, callback } = action
  __DEV__ && console.log('action', action)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.email)
    // check localy if email is valid
    if (!validator.isEmail(eMail)) {
      throw new Error(language.email + ' ' + language.invalid)
    }

    const result = yield call(API.postForgotPassword, { email: eMail})
    __DEV__ && console.log('forgot password result: ', result)

    // status success
    if (result.ok && result.data.status === 1) {
      yield put(UserActions.mergeState({passwordRequestSuccess: true}))
      popUpAlertV2(language.success, language.txt_D47, callback)
    } else if (result.status === 400) {
      throw new Error(language.email + ' ' + language.invalid)
    } else {
      throw new Error(language.request + ' ' + language.failed)
    }
  } catch (e) {
    __DEV__ && console.log(e)
    yield put(UserActions.mergeState({passwordRequestSuccess: false}))
   // showAlertBox(e.message)
    showAlertBoxWithTitle(language.errorMessage, e.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}
