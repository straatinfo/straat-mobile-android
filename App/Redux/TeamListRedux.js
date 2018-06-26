import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Action Types ------------- */

const { Types, Creators } = createActions({
  setTeamId: ['teamId'],
  teamlistAddteam: ['team'],
  teamlistGetList: ['params'],
  teamlistnonvolGetList: ['params'],
  replaceTeamlist: ['team'],
  teamlistMerge: ['newState'],
  listtarsTeam: ['teamInvite'],
  teamlistReset: ['params']
})

export const TeamListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  identify: null,                          // list of teams user currently leads
  teamList: [],                            // fetch team list
  teamNonList: [],
  fetchingNon: true,

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
  console.log('state', state)
  console.log('team', team)
  return state.merge({teamList: [team, ...state.teamList.filter(cteam => cteam._id !== team._id)]})
 // return state.teamList.replace({teamList: [team, ...state.teamList.filter(cteam => cteam._id !== team._id)]})
}

export const teamlistGetList = (state, {params}) => {
  return state
}

export const teamlistnonvolGetList = (state, {params}) => {
  return state
}

/* ------------- Reducers ------------- */
export const teamlistMerge = (state, {newState}) => {
  return state.merge(newState)
}

// tarsTeam - team accept request success
// @param teamInvite
export const listtarsTeam = (state, { teamInvite: {_id, _team}, teamMembers }) => {
   // remove notification on the right side of team
  const team = state.teamList.find(team => team._id === _team)
  if (team && team.teamInvites && team.teamInvites.length > 0) {
    __DEV__ && console.log('ruuning listtarsTeam:', teamMembers)
    return state.merge({
      teamList: [{...team, teamInvites: team.teamInvites.filter(invite => invite !== _id)}, ...state.teamList]
    })
  }
  return state
}

export const teamlistReset = (state, { params }) => {
  return INITIAL_STATE
}

/* ------------ - Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TEAM_ID]: currentTeamId,
  [Types.TEAMLIST_ADDTEAM]: teamlistAddteam,
  [Types.REPLACE_TEAMLIST]: replaceTeamlist,

  [Types.TEAMLISTNONVOL_GET_LIST]: teamlistnonvolGetList,
  [Types.TEAMLIST_GET_LIST]: teamlistGetList,
  [Types.TEAMLIST_MERGE]: teamlistMerge,
  [Types.TEAMLIST_RESET]: teamlistReset,
  [Types.LISTTARS_TEAM]: listtarsTeam

})
