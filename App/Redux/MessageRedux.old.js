import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

    /* Fetch Message */
    fetchMessageRequest: ['conversationId'],
    fetchMessageSuccess: ['messages'],
    fetchMessageFailure: ['error'],

    /* Send Message */
    sendMessageRequest: ['message'],
    sendMessageSuccess: ['newMessage'],
    sendMessageFailure: ['error']

})

export const MessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    conversationId: null,
    messages: null,
    error: null,
    fetching: false,
    message: null
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.FETCH_MESSAGE_REQUEST]: requestFetchMessage,
    [Types.FETCH_MESSAGE_SUCCESS]: successFetchMessage,
    [Types.FETCH_MESSAGE_FAILURE]: failureFetchMessage,
    [Types.SEND_MESSAGE_REQUEST]: requestSendMessage,
    [Types.SEND_MESSAGE_SUCCESS]: successSendMessage,
    [Types.SEND_MESSAGE_FAILURE]: failureSendMessage
})