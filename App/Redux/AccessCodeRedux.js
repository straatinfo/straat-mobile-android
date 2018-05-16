import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  codeRequest: ['coderegistrationnavroute'],
  codeSuccess: ['message'],
  codeFailure: ['error']
})

export const AccessCodeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  message: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state, coderegistrationnavroute) => {
  return state.merge({ fetching: true })
}

// we've successfully logged in
export const success = (state, { message }) => {
  state.merge({ fetching: false, error: null, message })
}

// we've had a problem logging in
export const failure = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}

// we've logged out
export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CODE_REQUEST]: request,
  [Types.CODE_SUCCESS]: success,
  [Types.CODE_FAILURE]: failure
})
