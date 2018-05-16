import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  acceptRequest: ['params'],
  acceptSuccess: ['username'],
  loginFailure: ['error'],
  addNewTeamMergeState: ['newState'],
  uploadAddNewTeam: ['photo']
})

export const AddNewTeamTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  teamPhoto: null,
  teamName: '',
  teamEmail: '',
  _profilePic: '',
  description: '',
  isVolunteer: false,
  creationMethod: 'MOBILE'
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state, userpassnavroute) => {
  console.log('userpassnavroute')
  console.log(userpassnavroute)
  return state.merge({ fetching: true })
}

// we've successfully logged in
export const success = (state, { username }) => {
  state.merge({ fetching: false, error: null, username })
}

// we've had a problem logging in
export const failure = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}

export const uploadAddNewTeam = (state, { photo }) => {
  return state
}

// use this so not to make many method for setting redux state
export const addNewTeamMergeState = (state, {newState}) => {
  __DEV__ && console.log('addNewTeamMergeState', newState)
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */
console.log('Types: ')
export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPLOAD_ADD_NEW_TEAM]: uploadAddNewTeam,

  [Types.ADD_NEW_TEAM_MERGE_STATE]: addNewTeamMergeState

})

/**
 * @param  userName
 */

export const getUser = (state) => {
  return state.user.user
}
