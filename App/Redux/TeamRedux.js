import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Action Types ------------- */

const { Types, Creators } = createActions({
  getTeamDetails: ['teamId'],
  getDetailsSuccess: ['details'],
  getDetailsFailed: ['error'],
  editTeamDetails: ['params'],
  editTeamSuccess: ['team'],
  editTeamFailure: ['error'],
  getTeamRequest: ['teamId'],
  getRequestSuccess: ['join'],
  getRequestFailed: ['error'],
  addNewTeam: ['params'],
  addTeamSuccess: ['details'],
  addTeamFailed: ['error'],
  setRequest: ['accept'],
  requestSuccess: ['teamMembers'],
  requestFailed: ['error'],
  declineRequest: ['decline'],
  declineSuccess: ['reject'],
  declineFailed: ['error'],
  teamAcceptRequest: ['teamInvite'],
  teamRejectRequest: ['user'],
  editfieldTeam: ['fields'],

  submiteditTeam: ['params'],
  teamReset: [],
  teamMergeState: ['newState'],
  tarsTeam: ['teamInvite', 'teamMembers']
})

export const TeamTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  details: null,
  join: [],
  teamMembers: null,
  reject: null,
  error: null,
  fetching: false,
  isSuccess: false,
  getTeamInfoFetching: true,
  team: {_id: '', teamMembers: []},                // use by MyTetamScreen for fetching details team._id
  editTeam: {eteamName: '', eteamEmail: '', eteamLogo: null}

})

/* ------------- Reducers ------------- */

/* ------------- GET DETAILS ------------- */
export const requestDetails = (state, teamId) => {
  console.log('teamdeets', teamId)
  return state.merge({ fetching: true, teamId })
}

export const detailsSuccess = (state, { details }) => {
  console.log('success')
  console.log(details)
  return state.merge({ fetching: false, error: null, isSuccess: true, details })
}

export const detailsFailed = (state, { error }) => {
  return state.merge({ fetching: false, error: error})
}

/* ------------- EDIT PROFILE ------------- */
export const editRequest = (state, {params}) => {
  console.log('params')
  console.log(params)
  return state.merge({ fetching: true })
}

export const editTeamSuccess = (state, { team }) => {
  const { teamEmail, teamName, _profilePic } = team
  return state.merge({ team: {...state.team, teamEmail, teamName, _profilePic} })
  // state.merge({ fetching: false, error: null, details, isSuccess: true })
}

export const editFailure = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}

  /* ------------- GET REQUEST ------------- */
export const teamRequest = (state, teamId) => {
  return state.merge({ fetching: true, teamId })
}

export const requestSuccess = (state, { join }) => {
  console.log('success')
  console.log(join)
  return state.merge({ fetching: false, error: null, isSuccess: true, join })
}

export const requestFailed = (state, { error }) => {
  return state.merge({ fetching: false, error: error})
}

/* ------------- ADD NEW TEAM ------------- */

export const newRequest = (state, params) => {
  return state.merge({ fetching: true, params })
}

export const addSuccess = (state, { details }) => {
  console.log('success')
  console.log(user)
  return state.merge({ fetching: false, error: null, isSuccess: true, details })
}

export const addFailed = (state, { error }) => {
  return state.merge({ fetching: false, error: error})
}

/* ------------- ACCEPT USER REQUEST ------------- */

export const memberRequest = (state, {}) => {
  return state.merge({ fetching: true })
}

export const memberSuccess = (state, {teamMembers}) => {
  return state.merge({fetching: false, error: null, isSuccess: true, teamMembers })
}

export const memberFailed = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}

/* ------------- DECLINE USER REQUEST ------------- */

export const declineRequest = (state, {}) => {
  return state.merge({ fetching: true })
}

export const declineSuccess = (state, { reject }) => {
  return state.merge({fetching: false, error: null, isSuccess: true, reject })
}

export const declineFailed = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}
// ---

export const teamAcceptRequest = (state, { teamInvite }) => {
  return state
}

// tarsTeam - team accept request success
export const tarsTeam = (state, { teamInvite, teamMembers }) => {
  __DEV__ && console.log('ruuning tarsTeam:', teamMembers)
  return state.merge({
    join: state.join.filter(invite => invite._id !== teamInvite._id),
    team: {...state.team, teamMembers: teamMembers}
  })
}

export const teamRejectRequest = (state, { user }) => {
  return state
}
export const editfieldTeam = (state, { fields }) => {
  // __DEV__ && console.log('editfieldTeam = (state, { fields })', fields)
  // __DEV__ && console.log('state.editTeam', state.editTeam)
  // __DEV__ && console.log('state.team', state.team)

  return state.merge({editTeam: {...state.editTeam, ...fields}})
}

export const submiteditTeam = (state, { params }) => {
  return state
}

export const teamReset = (state, {params}) => {
  return INITIAL_STATE
}

export const teamMergeState = (state, { newState }) => {
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TEAM_DETAILS]: requestDetails,
  [Types.GET_DETAILS_SUCCESS]: detailsSuccess,
  [Types.GET_DETAILS_FAILED]: detailsFailed,
  [Types.GET_TEAM_REQUEST]: teamRequest,
  [Types.GET_REQUEST_SUCCESS]: requestSuccess,
  [Types.GET_REQUEST_FAILED]: requestFailed,
  [Types.EDIT_TEAM_DETAILS]: editRequest,
  [Types.EDIT_TEAM_SUCCESS]: editTeamSuccess,
  [Types.EDIT_TEAM_FAILURE]: editFailure,
  [Types.EDITFIELD_TEAM]: editfieldTeam,

  [Types.ADD_NEW_TEAM]: newRequest,
  [Types.ADD_TEAM_SUCCESS]: addSuccess,
  [Types.ADD_TEAM_FAILED]: addFailed,
  [Types.SET_REQUEST]: memberRequest,
  [Types.REQUEST_SUCCESS]: memberSuccess,
  [Types.REQUEST_FAILED]: memberFailed,
  [Types.DECLINE_REQUEST]: declineRequest,
  [Types.DECLINE_SUCCESS]: declineSuccess,
  [Types.DECLINE_FAILED]: declineFailed,
  [Types.TEAM_ACCEPT_REQUEST]: teamAcceptRequest,
  [Types.TEAM_REJECT_REQUEST]: teamRejectRequest,
  [Types.SUBMITEDIT_TEAM]: submiteditTeam,
  [Types.TEAM_RESET]: teamReset,

  [Types.TEAM_MERGE_STATE]: teamMergeState,
  [Types.TARS_TEAM]: tarsTeam
  
})

/* -------------selector ------------- */

/**
 * @param  get current actire team id for myTeamScreen
 *
 */

export const getTeamId = (state) => {
  return state.team.team._id
}

/**
 * @param  get edit team parameters for api
 *
 */

export const putEditTeamState = (state) => {
  // compere current team to edit team form and submit diff
  // return be form data for upload
  const { teamName, teamEmail, _id } = state.team.team // no team logo cuz it will always not desame
  const { eteamName, eteamEmail, eteamLogo } = state.team.editTeam
  const params = new FormData()

  // check if no changese at all

  if ((eteamName && eteamName === teamName) && (eteamEmail && eteamEmail === teamEmail) && !eteamLogo) {
    return false
  }

  if (eteamName && eteamName !== teamName) {
    params.append('teamName', eteamName)
  }

  if (eteamEmail && eteamEmail !== teamEmail) {
    params.append('teamEmail', eteamEmail)
  }

  if (eteamLogo) {
    params.append('team-logo', {uri: eteamLogo.uri, name: eteamLogo.fileName, type: eteamLogo.type})
  }
  return { data: params, _team: _id }
}
