import API from '../Services/Api'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import ProfileActions, { putEditUserState } from '../Redux/ProfileRedux'
import UserActions, { getUser, isValidMobileNumber, getUserState } from '../Redux/UserRedux'
import validator from 'validator'
import { changeto } from '../Redux/ScreenRedux'
import { fail } from 'assert'
import { hasErrorV1 } from '../Transforms/responseHelper';
import { popUpAlert } from '../Lib/Helper/alertHelper'
import { put, call, select } from 'redux-saga/effects'
import { onloginPopUp, getApprovedTeamList, isEmpty } from '../Transforms/Filters'
import { showAlertBox, logStore, AppData } from '../Redux/commonRedux'
import { toUserModel } from '../Transforms/RegistrationHelper';

export const editUserProfile = function * (API, action) {
  const language = yield select(getLanguageState)
  const { params: { data }} = action
  const user = yield select(getUser)

  try {
    yield call(loaderHandler.showLoader, language.saving)

    const params = yield select(putEditUserState)

    if(isEmpty(params.data)) {

      throw new Error(language.noChanges)
    }

    const editUserResponse = yield call(API.editUserProfile,{ params: params.data, user })

    if (editUserResponse.ok && editUserResponse.data.status === 1) {

      yield put(UserActions.updateUser(editUserResponse.data.data))

      const tuser = toUserModel(editUserResponse.data.data)

      yield put(ProfileActions.editprofileMerge({currentUser: tuser}))

      yield call(popUpAlert, { title: '', message: language.success, pressok: () => {}})

    } else if (editUserResponse.data && editUserResponse.data.status === 0) {

      throw new Error(hasErrorV1(editUserResponse.data) || language.saving + '' + language.failed)

    } else {

      throw new Error(language.saving + '' + language.failed)
    }
  } catch (error) {
    yield call(showAlertBox, error.message)
  }

  yield call(loaderHandler.hideLoader)
  yield call(logStore)
}

export const uploadUserPhoto = function * (API, action) {
  const language = yield select(getLanguageState)
  const { photo } = action
  let data = new FormData()
  data.append('photo', {uri: photo.uri, name: photo.fileName, type: photo.type})

  try {

    yield call(loaderHandler.showLoader, language.uploading + ' ' + language.txt_J16)

    const result = yield call(API.postProfileUploadPhoto, { data })
    if (result.ok && result.data.status === 1) {

      yield put(ProfileActions.editfieldProfile({_profilePic: result.data.data}))
    } else {
      throw new Error(language.uploading + ' ' + language.failed)
    }
  } catch (e) {
    showAlertBox(e.message)
  }
  yield call(loaderHandler.hideLoader)
}


// validation

/**
 *
 * @description setemailProfile
 * @param (API, { userEmail })
 * it listen to setemailProfile
 *
 */

export const validateEmailProfile = function * (API, { value }) {
  const language = yield select(getLanguageState)
  try {
    yield call(loaderHandler.showLoader, language.verifying)
    if (!validator.isEmail(value)) {
      throw new Error(language.email + ' ' + language.invalid)
    }

    const validationResult = yield call(API.postValidateUserEmail, { userEmail: value })

    if (validationResult.ok && validationResult.data.status === 1) {
     
      yield put(ProfileActions.editfieldProfile({inemail: false}))

    } else if (validationResult.data && validationResult.data.status === 0) {
      throw new Error(language.email + ' ' + language.alreadyTaken)
    } else {
      throw new Error(language.email + ' ' + language.invalid)
    }
  } catch (e) {
    yield  put(ProfileActions.editfieldProfile({inemail: true }))
    showAlertBox(e.message)
  }
  yield call(loaderHandler.hideLoader)
}

/**
 *
 * validate input UserName of registering user
 * @param (API, { userName })
 * it listen to RIGISTER_SET_USERNAME
 *
 */

export const validateUserNameProfile = function * (API, { value }) {
  const language = yield select(getLanguageState)
  try {

    yield call(loaderHandler.showLoader, language.verifying)

    const validationResult = yield call(API.postValidateUserName, { userName: value })

    if (validationResult.ok && validationResult.data.status === 1) {
      yield  put(ProfileActions.editfieldProfile({inusername: false}))
    } else if (validationResult.ok && validationResult.data.status === 0) {
      throw new Error(language.username + ' ' + language.alreadyTaken)
    } else {
      throw new Error(language.request + ' ' + language.failed)
    }
  } catch (e) {
    yield  put(ProfileActions.editfieldProfile({inusername: true}))
    showAlertBox(e.message)
  }
  yield call(loaderHandler.hideLoader)
}

/**
 *
 * validate input Postal code  of registering user
 * @param (API, { postalCode })
 * it listen to RIGISTER_SET_POSTALCODE
 *
 */

export const validatePostalCodeProfile = function * (API,  { value } ) {
  const language = yield select(getLanguageState)
  try {
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.postalCode)
    if (!validator.isPostalCode(value, 'NL')) {
      throw new Error(language.invalid + ' ' + language.postalCode)
    }
    yield  put(ProfileActions.editfieldProfile({inpostalCode: false}))

  } catch (e) {
    yield  put(ProfileActions.editfieldProfile({inpostalCode: true}))
    showAlertBox(e.message)
  }
  yield call(loaderHandler.hideLoader)
}

/**
 *
 * @description validate city: this will be base to get coordinate
 * @param (API, { city })
 * it listen to REGISTER_SET_CITY
 *
 */

export const validateCityProfile = function * (API, { value }) {
  const language = yield select(getLanguageState)
  const user = yield select(getUserState)

  try {
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.city)
    const validationResult = yield call(API.postValidateLocate, { city: value, coordinate: user.position, isCoor: false })
    if (validationResult.ok && validationResult.data.status === 1) {
      yield put(ProfileActions.editfieldProfile({incity: false})) 
    } else if (validationResult.data && validationResult.data.status === 0) {
      throw new Error(language.city + ' ' + language.invalid)
    } else {
      throw new Error(language.request + ' ' + language.failed)
    }
  } catch (e) {
    showAlertBox(e.message)
    yield put(ProfileActions.editfieldProfile({incity: true}))
  }
  call(loaderHandler.hideLoader)
}

/**
 *
 * validate input phone number of registering user
 * @param (API, { postalCode })
 * it listen to REGISTER_SET_PHONE_NUMBER
 *
 */

export const validatePhoneNumberProfile = function * (API, { value }) {
  const language = yield select(getLanguageState)
  try {
    yield call(loaderHandler.showLoader, language.verifying + ' ' + language.mobileNumber)
    if (!isValidMobileNumber(value)) {
      throw new Error(language.invalid + ' ' + language.mobileNumber)
    }

    yield put(ProfileActions.editfieldProfile({inphonenumber: false})) 
  } catch (e) {
    yield  put(ProfileActions.editfieldProfile({inphonenumber: true})) 
    showAlertBox(e.message)
  }
  yield call(loaderHandler.hideLoader)
}
 