import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { ConvoTypes } from '../Services/Constant'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchConversationRequest: ['conversationId'],
  fetchConversationSuccess: ['conversation'],
  fetchConversationFailure: ['error'],
  setSelectedConversationId: ['conversationId'],
  createConversation: ['newConversation'],
  convoReceiveMessage: ['param'],
  getConversationList: ['param'],
  convoMerge: ['newState']
})

export const ConversationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  conversation: null,
  error: null,
  fetching: false,
  conversationId: null,
  conversationList: []
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

export const getConvoList = (state, { param }) => {
  return state
}

export const convoReceiveMessage = (state, { param }) => {
  // return state
  console.log('state.conversationList', state.conversationList)
  console.log('param', param)
  // till backend fix its team convo id
  return state

  if (param.conversation.type === ConvoTypes.USER || param.conversation.type === ConvoTypes.TEAM) {
    return state.merge({
      conversationList: [
      {...state.conversationList.find(message => message._id === param.conversation._id), lastMessage: param.payload.user.name + ': ' + param.payload.text},
        ...state.conversationList.filter(message => message._id !== param.conversation._id)]
    })
  }
  return state
}

export const getConversationList = (state, { param }) => {
  return state
}

export const convoMerge = (state, { newState }) => {
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_CONVERSATION_REQUEST]: request,
  [Types.FETCH_CONVERSATION_SUCCESS]: success,
  [Types.FETCH_CONVERSATION_FAILURE]: failure,
  [Types.SET_SELECTED_CONVERSATION_ID]: selectedConversationId,
  [Types.CREATE_CONVERSATION]: createdConversation,
  [Types.CONVO_RECEIVE_MESSAGE]: convoReceiveMessage,
  [Types.GET_CONVERSATION_LIST]: getConversationList,

  [Types.CONVO_MERGE]: convoMerge

})
