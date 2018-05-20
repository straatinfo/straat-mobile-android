import { put, call, select } from 'redux-saga/effects'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import { showAlertBox, logStore, AppData } from '../Redux/commonRedux'
import { changeto } from '../Redux/ScreenRedux'
import { popUpAlert } from '../Lib/Helper/alertHelper'
import { onloginPopUp, getApprovedTeamList, isEmpty } from '../Transforms/Filters'
import ProfileActions, { putEditUserState } from '../Redux/ProfileRedux'
import { fail } from 'assert'
import UserActions, { getUser, isValidMobileNumber, getUserState } from '../Redux/UserRedux'
import API from '../Services/Api'
import validator from 'validator'
import { hasErrorV1 } from '../Transforms/responseHelper';
import { toUserModel } from '../Transforms/RegistrationHelper';

export const editUserProfile = function * (API, action) {
  const language = yield select(getLanguageState)
  const { params: { data }} = action
  const user = yield select(getUser)
  try {

    yield call(loaderHandler.showLoader, language.saving)
    console.log('Fetching team data...', action)
    console.log('Fetching team data API...', API)
    
    const params = yield select(putEditUserState)
    // yield call(loaderHandler.showLoader, Lang.authenticating)
    console.log('Fetching editUserProfile', params)
    if(isEmpty(params.data)) {
      throw new Error(language.noChanges)
    }
    const editUserResponse = yield call(API.editUserProfile,{ params: params.data, user })
    console.log('Fetching success', editUserResponse)
    if (editUserResponse.ok && editUserResponse.data.status === 1) {
      console.log('Fetching success')

      // yield put(ProfileActions.editProfileSuccess(editUserResponse))
      // yield call(showAlertBox, 'Profile successfully updated.') 
      yield put(UserActions.updateUser(editUserResponse.data.data))
      const tuser = toUserModel(editUserResponse.data.data)
     
      yield put(ProfileActions.editprofileMerge({currentUser: tuser}))
      yield call(popUpAlert, { title: '', message: language.success, pressok: () => {}})
    } else if (editUserResponse.data && editUserResponse.data.status === 0) {
      // const error = hasErrorV1(editUserResponse.data) 
      throw new Error(hasErrorV1(editUserResponse.data) || language.saving + '' + language.failed)
    } else {
      throw new Error(language.saving + '' + language.failed)
    }
  } catch (error) {
    console.log('Fetching data failed', error)
    // yield put(ProfileActions.editProfileFailed(error))
    yield call(showAlertBox, error.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  yield call(logStore)
}

export const uploadUserPhoto = function * (API, action) {
  const language = yield select(getLanguageState)
  const { photo } = action
  let data = new FormData()
 // data.append('photo', photo)
  data.append('photo', {uri: photo.uri, name: photo.fileName, type: photo.type})

  __DEV__ && console.log(' photo: ', data)

  try {
    // show loader
    yield call(loaderHandler.showLoader, language.uploading + ' ' + language.txt_J16)
    // fetch from backend
    const result = yield call(API.postProfileUploadPhoto, { data })
    __DEV__ && console.log('upload team photo', result)

    // status success
    if (result.ok && result.data.status === 1) {
      yield put(ProfileActions.editfieldProfile({_profilePic: result.data.data}))
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


// validation

/**
 * @description setemailProfile
 * @param (API, { userEmail })
 * it listen to setemailProfile
 *
 */

export const validateEmailProfile = function * (API, { value }) {
  const language = yield select(getLanguageState)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying)

    // check localy if email is valid
    if (!validator.isEmail(value)) {
      throw new Error(language.email + ' ' + language.invalid)
    }

    // validate from backend
    const validationResult = yield call(API.postValidateUserEmail, { userEmail: value })
    __DEV__ && console.log('Email validationResult', validationResult)

    // status success
    if (validationResult.ok && validationResult.data.status === 1) {
     
      yield put(ProfileActions.editfieldProfile({inemail: false}))

    } else if (validationResult.data && validationResult.data.status === 0) {
      throw new Error(language.email + ' ' + language.alreadyTaken)
    } else {
      throw new Error(language.email + ' ' + language.invalid)
    }
  } catch (e) {
    __DEV__ && console.log(e)
    yield  put(ProfileActions.editfieldProfile({inemail: true }))
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

export const validateUserNameProfile = function * (API, { value }) {
  const language = yield select(getLanguageState)
 // __DEV__ && console.log('action', action)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying)

    // if (!(primeUserName.length > 1)) {
    //   throw new Error(language.username + ' ' + language.invalid)
    // }

    // if (!isValidUserName(userName)) {
    //   throw new Error(language.txt_D42)
    // }

    // validate from backend
    const validationResult = yield call(API.postValidateUserName, { userName: value })
    __DEV__ && console.log('userName validationResult', validationResult)

    // status success
    if (validationResult.ok && validationResult.data.status === 1) {
      yield  put(ProfileActions.editfieldProfile({inusername: false}))
    } else if (validationResult.ok && validationResult.data.status === 0) {
      throw new Error(language.username + ' ' + language.alreadyTaken)
    } else {
      throw new Error(language.request + ' ' + language.failed)
    }
  } catch (e) {
    __DEV__ && console.log(e)
    
    yield  put(ProfileActions.editfieldProfile({inusername: true}))
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

export const validatePostalCodeProfile = function * (API,  { value } ) {
  const language = yield select(getLanguageState)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.postalCode)

    // check localy if postalCode is valid
    if (!validator.isPostalCode(value, 'NL')) {
      throw new Error(language.invalid + ' ' + language.postalCode)
    }
    yield  put(ProfileActions.editfieldProfile({inpostalCode: false}))
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
    yield  put(ProfileActions.editfieldProfile({inpostalCode: true}))
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

export const validateCityProfile = function * (API, { value }) {
  const language = yield select(getLanguageState)
  const user = yield select(getUserState)

  __DEV__ && console.log('user', user)
  __DEV__ && console.log('value', value)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.city)
   //  const validationResult = yield call(API.postValidateLocate, { city, coordinate: user.position, isCoor: user.isCoor })
   const validationResult = yield call(API.postValidateLocate, { city: value, coordinate: user.position, isCoor: false })
    __DEV__ && console.log('city validationResult', validationResult)

    // status success
    if (validationResult.ok && validationResult.data.status === 1) {
      __DEV__ && console.log('validationResult', validationResult)
      // success in getting _host
      // yield put(UserActions.mergeState({isValidatedCity: true})) // un finished <-------|
      // yield put(UserActions.mergeState({hostId: validationResult.data.data._host}))
      yield put(ProfileActions.editfieldProfile({incity: false})) 
    } else if (validationResult.data && validationResult.data.status === 0) {
      throw new Error(language.city + ' ' + language.invalid)
    } else {
      throw new Error(language.request + ' ' + language.failed)
    }
  } catch (e) {
    __DEV__ && console.log(e)
    yield put(ProfileActions.editfieldProfile({incity: true}))
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

export const validatePhoneNumberProfile = function * (API, { value }) {
  const language = yield select(getLanguageState)
  try {
    // show loader
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.mobileNumber)

    // check localy if phoneNumber is valid
    // if (!validator.isMobilePhone(phoneNumber, 'any')) {
    //   throw new Error(language.invalid + ' ' + language.mobileNumber)
    // }
    // check localy if phoneNumber is valid

    if (!isValidMobileNumber(value)) {
      throw new Error(language.invalid + ' ' + language.mobileNumber)
    }

    yield put(ProfileActions.editfieldProfile({inphonenumber: false})) 

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
    yield  put(ProfileActions.editfieldProfile({inphonenumber: true})) 
    showAlertBox(e.message)
  }
  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}
 