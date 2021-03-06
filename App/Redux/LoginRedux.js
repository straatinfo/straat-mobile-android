import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  appStart: ['params'],
  loginRequest: ['userpassnavroute'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  error: null,
  fetching: false
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

// we've logged out
export const logout = (state) => INITIAL_STATE

// we've logged out
export const appStart = (state) => state

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APP_START]: appStart,
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.username !== null
