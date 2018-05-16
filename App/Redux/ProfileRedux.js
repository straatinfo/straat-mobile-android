import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { usernameSeparator } from '../Services/Constant'

export const emptyUser = {
  _profilePic: {_id: ''},
  fname: '',
  lname: '',
  houseNumber: '',
  streetName: '',
  postalCode: '',
  city: '',
  email: '',
  phoneNumber: '',
  username: '',
  password: '',
  usernameID: '',
  usernamePre: ''
}

/* ------------- Action Types ------------- */

const { Types, Creators } = createActions({
  submitEditprofile: ['params'],
  editProfileSuccess: ['userProfile'],
  editProfileFailed: ['error'],
  editfieldProfile: ['fields'],
  uploadEditprofile: ['photo'],

  setcityProfile: ['value'],
  setusernameProfile: ['value'],
  setemailProfile: ['value'],
  setphonenumberProfile: ['value'],
  setpostalcodeProfile: ['value'],
  editprofileMerge: ['newState']
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  userProfile: null,
  error: null,
  fetching: false,
  isSuccess: false,
  currentUser: emptyUser,
  editUser: emptyUser,
  photo: null
})

/* ------------- Reducers ------------- */
export const submitEditprofile = (state, {params}) => {
  return state.merge({ fetching: true })
}

export const userEditSuccess = (state, { user }) => {
  console.log('success')
  return state.merge({ fetching: false, error: null, isSuccess: true, user})
}

export const userEditFailed = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}

export const editfieldProfile = (state, { fields }) => {
  __DEV__ && console.log('editfieldTeam = (state, { fields })', fields)
  __DEV__ && console.log('state.editTeam', state.editTeam)
  __DEV__ && console.log('state.team', state.team)

  return state.merge({editUser: {...state.editUser, ...fields}})
}

export const uploadEditprofile = (state, { photo }) => {
  return state.merge({photo: photo})
}

// live validation
export const setemailProfile = (state, { value }) => {
  return state.merge({editUser: {...state.editUser, email: value}})
}

export const setusernameProfile = (state, { value }) => {
  console.log('setusernameProfile value', value)
  return state.merge({editUser: {...state.editUser, username: value}})
}

export const setcityProfile = (state, { value }) => {
  return state.merge({editUser: {...state.editUser, city: value}})
}

export const setphonenumberProfile = (state, { value }) => {
  return state.merge({editUser: {...state.editUser, phoneNumber: value}})
}
export const setpostalcodeProfile = (state, { value }) => {
  return state.merge({editUser: {...state.editUser, postalCode: value}})
}

export const editprofileMerge = (state, {newState}) => {
  __DEV__ && console.log('newMergingState', newState)
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBMIT_EDITPROFILE]: submitEditprofile,
  [Types.EDIT_PROFILE_SUCCESS]: userEditSuccess,
  [Types.EDIT_PROFILE_FAILED]: userEditFailed,
  [Types.EDITFIELD_PROFILE]: editfieldProfile,
  [Types.UPLOAD_EDITPROFILE]: uploadEditprofile,

  [Types.SETCITY_PROFILE]: setcityProfile,
  [Types.SETEMAIL_PROFILE]: setemailProfile,
  [Types.SETUSERNAME_PROFILE]: setusernameProfile,
  [Types.SETPHONENUMBER_PROFILE]: setphonenumberProfile,
  [Types.SETPOSTALCODE_PROFILE]: setpostalcodeProfile,
  
  [Types.EDITPROFILE_MERGE]: editprofileMerge

})

/* -------------selector ------------- */
/**
 * @param  get edit profile parameters for api
 *
 */

export const putEditUserState = (state) => {
  // compere current team to edit team form and submit diff
  // return be form data for upload
  const {
    _profilePic,
    fname,
    lname,
    houseNumber,
    streetName,
    postalCode,
    city,
    phoneNumber,
    username,
    email,
    usernameID,
    usernamePre
  } = state.userProfile.currentUser
  const {
    _profilePic: e_profilePic,
    fname: efname,
    lname: elname,
    houseNumber: ehouseNumber,
    streetName: estreetName,
    postalCode: epostalCode,
    city: ecity,
    email: eemail,
    phoneNumber: ephoneNumber,
    username: eusername,
    usernameID: eusernameID,
    usernamePre: eusernamePre
  } = state.userProfile.editUser
  const params = {}

  // check if no changese at all

  // if ((eteamName && eteamName === teamName) && (eteamEmail && eteamEmail === teamEmail) && !eteamLogo) {
  //   return false
  // }

  if (efname && fname !== efname) {
    params.fname = efname
  }

  if (elname && lname !== elname) {
    params.lname = elname
  }
  if (ehouseNumber && houseNumber !== ehouseNumber) {
    params.houseNumber = ehouseNumber
  }
  if (estreetName && streetName !== estreetName) {
    params.streetName = estreetName
  }
  if (epostalCode && postalCode !== epostalCode) {
    params.postalCode = epostalCode
  }
  if (ecity && city !== ecity) {
    params.city = ecity
  }

  if (eemail && email !== eemail) {
    params.email = eemail
  }

  if (ephoneNumber && phoneNumber !== ephoneNumber) {
    params.phoneNumber = ephoneNumber
  }
  // if (eusername && username !== eusername) {
  //   params.username = eusername
  // }
  
  const picId = _profilePic ? _profilePic._id : ''
  if ((e_profilePic && e_profilePic._id) && (e_profilePic._id !== picId)) {
    params._profilePic = e_profilePic._id
  }

  if (eusernamePre && usernamePre !== eusernamePre) {
    // params.usernamePre = eusernamePre
    params.username = eusernamePre + usernameSeparator + eusernameID
  }

  return { data: params }
}
