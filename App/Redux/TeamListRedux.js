import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Action Types ------------- */

const { Types, Creators } = createActions({
  setTeamId: ['teamId'],
  teamlistAddteam: ['team'],
  teamlistGetList: ['params'],
  replaceTeamlist: ['team'],
  teamlistMerge: ['newState']
})

export const TeamListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  identify: null,                         // list of teams user currently leads
  teamList: [],                            // fetch team list

  error: null,
  fetching: true

})

/* ------------- Reducers ------------- */

export const currentTeamId = (state, {teamId}) => {
  return state.merge({ identify: teamId })
}

export const teamlistAddteam = (state, {team}) => {
  return state.merge({teamList: [ ...state.teamList, team ]})
}

export const replaceTeamlist = (state, {team}) => {
  return state.merge({teamList: [team, ...state.teamList.filter(cteam => cteam._id !== team._id)]})
 // return state.teamList.replace({teamList: [team, ...state.teamList.filter(cteam => cteam._id !== team._id)]})
}

export const teamlistGetList = (state, {params}) => {
  return state
}

/* ------------- Reducers ------------- */
export const teamlistMerge = (state, {newState}) => {
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TEAM_ID]: currentTeamId,
  [Types.TEAMLIST_ADDTEAM]: teamlistAddteam,
  [Types.REPLACE_TEAMLIST]: replaceTeamlist,

  [Types.TEAMLIST_GET_LIST]: teamlistGetList,
  [Types.TEAMLIST_MERGE]: teamlistMerge
})
