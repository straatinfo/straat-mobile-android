import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const tempMessage = [ {
  _id: '72f422ba-d4cf-455f-8dd2-f74d004d28d6',
  text: 'JAY LORD TESTING',
  createdAt: new Date(),
  user: {
    _id: '5a8b4afbac58ad00141a352e',
    name: 'JAY LORD TESTING',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png'
  }
        // image: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png'
}
]
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

    /* Fetch Message */
  fetchMessageRequest: ['conversationId'],
  fetchMessageSuccess: ['messages'],
  fetchMessageFailure: ['error'],

    /* Send Message */
  sendMessageRequest: ['message'],
  sendMessageSuccess: ['newMessage'],
  sendMessageFailure: ['error'],

  openMessage: ['convo'],
  newMessage: ['conversationId', 'message'],
  getConversation: ['param'],
  getMessagesByConvoId: ['param'],
  messageReceive: ['param'],
  createPostConvo: ['params'],
  sendlocalMessage: ['params'],
  chatMerge: ['newState']
})

export const MessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  conversationId: __DEV__ ? 'convoID' : null,
  title: '',
  messages: __DEV__ ? tempMessage : [],
  error: null,
  fetching: false,
  message: null,
  fetchingConvo: false
})

/* ------------- Reducers ------------- */

/*  Fetching Message */
export const requestFetchMessage = (state, { conversationId }) => {
  return state.merge({ fetching: true, conversationId })
}
export const successFetchMessage = (state, { messages }) => {
  return state.merge({ fetching: false, error: null, messages })
}
export const failureFetchMessage = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}

/* Sending Message */

export const requestSendMessage = (state, { message }) => {
  return state.merge({ fetching: true, message })
}
// return new array with the latest message added to the previous messages array
export const successSendMessage = (state, { newMessage }) => {
  return state.merge({ fetching: false, error: null, messages: [newMessage, ...state.messages] })
}
export const failureSendMessage = (state, { error }) => {
  return state.merge({ fetching: false, error: error })
}

export const newMessage = (state, { conversationId, message }) => {
  if (state.conversationId === conversationId) {
    __DEV__ && console.log('newMessage :', message)
    return state.merge({ messages: [ message, ...state.messages ] })
  }
  return state
}

export const openMessage = (state, { convo: {conversationId, messages, title} }) => {
  __DEV__ && console.log('conversationId, messages, title', conversationId, messages, title)
  if (state.conversationId === conversationId) {
    return state
  }
  return state.merge({ conversationId: conversationId, messages: messages, title: title })
}

export const getConversation = (state, { param }) => {
  return state
}

export const createPostConvo = (state, { params }) => {
  __DEV__ && console.log('create conbo here')
  return state
}

export const getMessagesByConvoId = (state, { param }) => {
  return state
}

export const sendlocalMessage = (state, { params }) => {
  return state.merge({messages: [params, ...state.messages]})
}

const filterRemoveTempMessage = (message, receive) => {
  __DEV__ && console.log('receive', receive)
  return message._id !== receive.sourceId
}

export const messageReceive = (state, { param }) => {
  __DEV__ && console.log('messageReceive', param)
  const { payload, _conversation } = param
  if (_conversation === state.conversationId) {
    return state.merge({messages: [
      payload,
      ...state.messages.filter((message) => filterRemoveTempMessage(message, payload)).filter((message) => message._id !== payload._id)
    
    ]})
  }
  return state
}

export const chatMerge = (state, { newState }) => {
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.FETCH_MESSAGE_REQUEST]: requestFetchMessage,
  // [Types.FETCH_MESSAGE_SUCCESS]: successFetchMessage,
  // [Types.FETCH_MESSAGE_FAILURE]: failureFetchMessage,
  // [Types.SEND_MESSAGE_REQUEST]: requestSendMessage,
  // [Types.SEND_MESSAGE_SUCCESS]: successSendMessage,
  // [Types.SEND_MESSAGE_FAILURE]: failureSendMessage,

  [Types.OPEN_MESSAGE]: openMessage,
  [Types.NEW_MESSAGE]: newMessage,
  [Types.GET_CONVERSATION]: getConversation,
  [Types.GET_MESSAGES_BY_CONVO_ID]: getMessagesByConvoId,
  [Types.MESSAGE_RECEIVE]: messageReceive,
  [Types.CREATE_POST_CONVO]: createPostConvo,
  [Types.SENDLOCAL_MESSAGE]: sendlocalMessage,

  [Types.CHAT_MERGE]: chatMerge

})
