import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  editTeamRequest: ['params'],
  editTeamSuccess: ['updateTeam'],
  editTeamFailure: ['error'],
})

export const EditTeamTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  updateTeam: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const request = (state, params) => {
  console.log('params')
  console.log(params)
  return state.merge({ fetching: true })
}

export const success = (state, { teamDetails }) => {
  state.merge({ fetching: false, error: null, teamDetails })
}

export const failure = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EDIT_TEAM_REQUEST]: request,
  [Types.EDIT_TEAM_SUCCESS]: success,
  [Types.EDIT_TEAM_FAILURE]: failure,
})
