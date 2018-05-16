import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchConversationRequest: ['conversationId'],
  fetchConversationSuccess: ['conversation'],
  fetchConversationFailure: ['error'],
  setSelectedConversationId: ['conversationId'],
  createConversation:['newConversation']
})

export const ConversationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  conversation: null,
  error: null,
  fetching: false,
  conversationId: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state, { conversationId }) => {
  return state.merge({ fetching: true })
}

// we've successfully logged in
export const success = (state, { conversation }) => {
  return state.merge({ fetching: false, error: null, conversation })
}

// we've had a problem logging in
export const failure = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}

export const selectedConversationId = (state, { conversationId }) => {
  return state.merge({ fetching: false, error: null, conversationId })
}

export const createdConversation = (state, { newConversation }) => {
  return state.merge({ fetching: false, error: null, conversation: [...newConversation, state.conversation] })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_CONVERSATION_REQUEST]: request,
  [Types.FETCH_CONVERSATION_SUCCESS]: success,
  [Types.FETCH_CONVERSATION_FAILURE]: failure,
  [Types.SET_SELECTED_CONVERSATION_ID]: selectedConversationId,
  [Types.CREATE_CONVERSATION]: createdConversation,
})