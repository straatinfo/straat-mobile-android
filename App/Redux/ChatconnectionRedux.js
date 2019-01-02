import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  chatconnectionRequest: ['data'],
  chatconnectionSuccess: ['payload'],
  chatconnectionFailure: null,
  chatconnectionMerge: ['newState']
})

export const ChatconnectionTypes = Types
export default Creators
export const chatSocketEvent = {
  connect: 'connect',
  connect_error: 'connect_error',
  connect_timeout: 'connect_timeout',
  error: 'error',
  disconnect: 'disconnect',
  reconnect: 'reconnect',
  reconnect_attempt: 'reconnect_attempt',
  reconnecting: 'reconnecting', 
}
/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  isConnected: false,
  socketState: 'CONNECTED', // CONNECTED, CONNECTING, DISCONNECTED, RECONNECT

})

/* ------------- Selectors ------------- */

export const ChatconnectionSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })


export const chatconnectionMerge = (state, { newState }) => {
  console.log('chatconnectionMerge', newState)
  return state.merge(newState)
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHATCONNECTION_REQUEST]: request,
  [Types.CHATCONNECTION_SUCCESS]: success,
  [Types.CHATCONNECTION_FAILURE]: failure,
  [Types.CHATCONNECTION_MERGE]: chatconnectionMerge
  
})
