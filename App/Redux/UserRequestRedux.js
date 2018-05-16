import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setRequest: ['accept'],
    requestSuccess: ['request'],
    requestFailed: ['error'],
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const request = (state, accept) => {
  console.log('user data')
  console.log(accept)
  return state.merge({ fetching: true })
}

export const success = (state, { request }) => {
  state.merge({ fetching: false, error: null, request })
}
export const failure = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_REQUEST]: request,
  [Types.REQUEST_SUCCESS]: success,
  [Types.REQUEST_FAILURE]: failure,
})
