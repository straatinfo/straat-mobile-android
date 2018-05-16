import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Action Types ------------- */

const { Types, Creators } = createActions({
    setSocketConnectionId: ['connectionId']
})

export const SocketTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    connectionId: null 
})

/* ------------- Reducers ------------- */

export const currentConnectionId = (state, {connectionId}) => {
    return state.merge({ connectionId })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SOCKET_CONNECTION_ID]: currentConnectionId,
})
