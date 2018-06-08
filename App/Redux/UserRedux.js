import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { convertActiveDesignToDesign, designDefault } from '../Transforms/themeHelper'
import { Design } from '../Services/Constant'

const { Types, Creators } = createActions({
  setCurrentUser: ['user'],
  setAccessCode: ['accessCodeContainer'],
  setHostId: ['hostId'],
  resetCurrentUser: [],
  registerRequest: ['registrationDatNavRoute'],
  registerSuccess: ['user'],
  registerFailure: ['error'],
  registerSetUsername: ['userName', 'primeUserName'],                        // usrname = username + postUserName, primeUserName = userName only
  registerSetEmail: ['userEmail'],
  registerSetPostalcode: ['postalCode'],
  registerSetHouseNumber: ['postalCode', 'houseNumber'],
  registerSetCity: ['city'],
  registerSetPhonenumber: ['phoneNumber'],
  registerSetTeamname: ['teamName', 'isVolunteer'],
  registerSetTeamemail: ['teamEmail'],
  getTeamlist: ['filter'],
  setTeamPhoto: ['photo'],
  mergeState: ['newMergingState'],
  getTeamByHost: ['_host'],
  forgotPasswordRequest: ['eMail', 'callback'],
  userReset: ['params'],
  userChangeRadius: ['radius'],
  updateUser: ['user'],
  teamlistGetuser: ['user']
})

export const CurrentUserTypes = Types
export default Creators

export const defauiltTeamList = { _id: 'aa', teamName: 'teamA', teamEmail: 'aaa', logoSecuredUrl: 'bb' }
export const defauiltTeamList1 = { _id: 'bb', teamName: 'teamB', teamEmail: 'bbbb', logoSecuredUrl: 'bb' }
export const defauiltTeamList2 = { _id: 'cc', teamName: 'teamC', teamEmail: 'ccc', logoSecuredUrl: 'https://res.cloudinary.com/hvina6sjo/image/upload/v1519208496/sample/image-5dc67bf1-d4bf-4f8e-bcba-233c923fa880.jpg_Wed%20Feb%2021%202018%2010:21:25%20GMT%2B0000%20%28UTC%29.jpg' }
export const defauiltTeamList3 = { _id: 'dd', teamName: 'teamA', teamEmail: 'aaa', logoSecuredUrl: 'bb' }
export const defauiltTeamList4 = { _id: 'ee', teamName: 'teamB', teamEmail: 'bbbb', logoSecuredUrl: 'bb' }
export const defauiltTeamList5 = { _id: 'ff', teamName: 'teamA', teamEmail: 'aaa', logoSecuredUrl: 'bb' }
export const defauiltTeamList6 = { _id: 'gg', teamName: 'teamB', teamEmail: 'bbbb', logoSecuredUrl: 'bb' }
export const defauiltTeamList7 = { _id: 'hh', teamName: 'teamA', teamEmail: 'aaa', logoSecuredUrl: 'bb' }
export const defauiltTeamList8 = { _id: 'ii', teamName: 'teamB', teamEmail: 'bbbb', logoSecuredUrl: 'bb' }
export const defauiltTeamList9 = { _id: 'jj', teamName: 'teamA', teamEmail: 'aaa', logoSecuredUrl: 'bb' }
export const defauiltTeamList10 = { _id: 'kk', teamName: 'teamB', teamEmail: 'bbbb', logoSecuredUrl: 'bb' }
export const defauiltTeamList11 = { _id: 'll', teamName: 'teamA', teamEmail: 'aaa', logoSecuredUrl: 'bb' }
export const defauiltTeamList12 = { _id: 'mm', teamName: 'teamB', teamEmail: 'bbbb', logoSecuredUrl: 'bb' }
export const testDataTeamList = [
  defauiltTeamList,
  defauiltTeamList1,
  defauiltTeamList2
]
const radius = 300
export const tempUser = {
  _id: '5a8b4afbac58ad00141a352e', // '5af5573ce0936b0014615dba', //'5a8b4afbac58ad00141a352e',
  username: 'jTestr',
  radius: radius,
  accessToken: 'no access code',
  isVolunteer: true,
  _host: '5a7b485a039e2860cf9dd19a',
  teamList: [],
  language: 'nl',
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YThiNGFmYmFjNThhZDAwMTQxYTM1MmUiLCJpYXQiOjE1MjcxNDA5MTY5OTV9.UDacF19-c8nbabww_8VrYXKZbjpnHTYlImKMviKfhZ0',
  _activeTeam: { _id: 'teamIdSample' }
}

export const defualtCoordinate = {
  lat: 53.2729807,
  long: 5.985930199999999
}
/* ------------- Intial State ------------- */

export const INITIAL_STATE = Immutable({
  user: __DEV__ ? tempUser : {language: 'nl'},
  accessCode: null,
  host: {_id: 'testHostId', language: 'nl'},
  hostId: null,
  _teamActive: '',
  radius: radius,
  error: null,
  fetching: false,
  userTeamList: [],
  // for registration
  isValidatedUserEmail: false,
  isValidatedPostalCode: false,
  isValidatedHouseNumber: false,
  isValidatedUserName: false,
  isValidatedTeamName: false,
  isValidatedTeamEmail: false,
  isValidatedPhoneNumber: false,
  isUploadingPhoto: false,
  filter: {},  // {hostId, isVolunteer}
  registrationUserName: '',
  registrationUserEmail: '',
  registrationPostalCode: '',
  registrationHouseNumber: '',
  registrationStreetName: '',
  registrationGeoLocation: {},
  registrationCity: '',
  registrationTeamName: '',
  registrationTeamEmail: '',
  registrationPhoneNumber: '',
  teamList: __DEV__ ? testDataTeamList : [],                // team list of by host or by host*!isVolunteer
  teamPhotoLocal: {},
  teamPhotoUploaded: { url: '', secure_url: '' },
  _activeDesign: {
    colorOne: '#7e3434',                                    // button color
    colorThree: '#812020',                                  // upper beam background color
    colorTwo: '#491111'                                     // menu background color,
  },

  design: Design,
  passwordRequestSuccess: false,                             // requet new password using email: forgot passowd status

  position: null,
  isCoor: false
})

export const setAccessCode = (state, {accessCodeContainer: { accessCode }}) => {
  return state.merge({
    accessCode: accessCode
  })
}

export const setHostId = (state, { hostId }) => {
  __DEV__ && console.log('state form setHost', state)
  return state.merge({
    hostId: hostId
  })
}

export const setCurrentUser = (state, { user }) => {
  return state.merge({
    user: user
  })
}

export const resetCurrentUser = (state, action) => state

// registration
export const registerRequest = (state, x) => {
  return state.merge({
    fetching: true
  })
}

export const registerSuccess = (state, { user }) => {
  return state.merge({
    user: user, fetching: false
  })
}

export const registerFailure = (state, x) => {
  return state.merge({
    fetching: false
  })
}

export const registerSetEmail = (state, {userEmail}) => {
  return state.merge({
    registrationUserEmail: userEmail
  })
}

export const registerSetPhonenumber = (state, {phoneNumber}) => {
  return state.merge({
    registrationPhoneNumber: phoneNumber
  })
}

export const registerSetUsername = (state, {userName}) => {
  return state.merge({
    registrationUserName: userName
  })
}

export const registerSetPostalcode = (state, {postalCode}) => {
  return state.merge({
    registrationPostalCode: postalCode
  })
}

export const registerSetHouseNumber = (state, {houseNumber}) => {
  return state.merge({
    registrationHouseNumber: houseNumber
  })
}

export const registerSetCity = (state, {city}) => {
  return state.merge({
    registrationCity: city
  })
}

export const registerSetTeamname = (state, {teamName}) => {
  return state.merge({
    registrationTeamName: teamName
  })
}
export const registerSetTeamemail = (state, {teamEmail}) => {
  return state.merge({
    registrationTeamEmail: teamEmail
  })
}

export const setTeamPhoto = (state, { photo }) => {
  return state.merge({
    teamPhotoLocal: photo
  })
}

export const getTeamlist = (state, {filter}) => {
  // when this redux dispatch, saga effect will catch it and process data Teamlist
  // actually hostId here is not need anymore beacouse in this state has already it but i will pass even not using it, maybe future will set him free
  return state.merge({
    filter: filter
  })
}

export const getTeamByHost = (state) => {
  return state
}

export const forgotPasswordRequest = (state, {eMail}) => {
  return state
}

export const userReset = (state, {params}) => {
  return INITIAL_STATE
}

export const userChangeRadius = (state, {radius}) => {
  return state.merge({user: {...state.user, radius: radius}, radius: radius})
}

export const updateUser = (state, {user}) => {
  const addedData = { _host: user._host ? user._host._id : null, isSpecific: user._host ? user._host.isSpecific : false }
  __DEV__ && console.log('updateUser user, addedData', user, addedData)
  return state.merge({user: {...state.user, ...user, ...addedData}})
}

// use this so not to make many method for setting redux state
export const mergeState = (state, {newMergingState}) => {
  __DEV__ && console.log('newMergingState', newMergingState)
  return state.merge(newMergingState)
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CURRENT_USER]: setCurrentUser,
  [Types.SET_ACCESS_CODE]: setAccessCode,
  [Types.SET_HOST_ID]: setHostId,
  [Types.RESET_CURRENT_USER]: resetCurrentUser,

  [Types.REGISTER_REQUEST]: registerRequest,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,

  [Types.REGISTER_SET_USERNAME]: registerSetUsername,
  [Types.REGISTER_SET_EMAIL]: registerSetEmail,
  [Types.REGISTER_SET_POSTALCODE]: registerSetPostalcode,
  [Types.REGISTER_SET_HOUSE_NUMBER]: registerSetHouseNumber,

  [Types.REGISTER_SET_CITY]: registerSetCity,
  [Types.REGISTER_SET_TEAMNAME]: registerSetTeamname,
  [Types.REGISTER_SET_TEAMEMAIL]: registerSetTeamemail,
  [Types.REGISTER_SET_PHONENUMBER]: registerSetPhonenumber,

  [Types.GET_TEAMLIST]: getTeamlist,
  [Types.SET_TEAM_PHOTO]: setTeamPhoto,
  [Types.MERGE_STATE]: mergeState,

  [Types.FORGOT_PASSWORD_REQUEST]: forgotPasswordRequest,
  [Types.USER_RESET]: userReset,
  [Types.USER_CHANGE_RADIUS]: userChangeRadius,

  [Types.UPDATE_USER]: updateUser
})

/* ------------- Some methods ------------- */

/**
 * @param  userName
 */

export const isValidUserName = (userName) => {
  // invalid name list
  // Pol
  // Politie
  // Agent
  // Bureau
  // Gemeente
  // Afdeling
  // Sectie
  // Dienst

  const given = userName.toLowerCase()
  // or implode array then use indexOf there
  const invalidNames = [
    'Pol', 'Politie', 'Agent', 'Bureau', 'Gemeente', 'Afdeling', 'Sectie', 'Dienst',
    'Pol', 'Police', 'Agent', 'Bureau', 'Town', 'Department', 'Section', 'Service'
  ]
    .filter((iname) => { return given.indexOf(iname.toLowerCase()) !== -1 })

  return !invalidNames.length > 0
}
/**
 * @param  phoneNumber
 * @description Sometmes people write with blancs so 06 12345678 or like this 06-12345678 or like this 0612345678
 *              all three optons should be accepted
 */

export const isValidMobileNumber = (phoneNumber = '') => {
  const netherNumberFormat = /^0[6]{1}(-)?[^0\D]{1}\d{7}$/
  return netherNumberFormat.test(phoneNumber.split(' ').join(''))
}

/**
 * @description set desing
 * @param _activeDesign
 *
 */

export const setTheme = (_activeDesign) => {
  global.appSetting = _activeDesign
}

/* -------------selector ------------- */
/**
 * @param  userName
 */

export const getUser = (state) => {
  return state.user.user
}

/**
 * @param  getUserState
 */

export const getUserState = (state) => {
  return state.user
}

/**
 * @description get teamlist in user Info
 * @param r
 *
 */

export const getTeamList = (state) => {
  return state.user.user.teamList
}

/**
 * @description
 * @param r
 * @return host
 */
export const getUserHost = (state) => {
  return state.user.host
}
