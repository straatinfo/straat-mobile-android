import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

    /* Send Feedback */
    sendFeedbackRequest: ['feedback'],
    sendFeedbackSuccess: null,
    sendFeedbackFailure: ['error']

})

export const FeedbackTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    data: null,
    isSuccess: false,
    error: null,
    fetching: false
})

/* ------------- Reducers ------------- */

/*  Fetching Message */
export const requestSendFeedback = (state, { feedback }) => {
    return state.merge({ fetching: true, feedback })
}
export const successSendFeedback = (state) => {
    return state.merge({ fetching: false, error: null, isSuccess: true })
}
export const failureSendFeedback = (state, { error }) => {
    return state.merge({ fetching: false, error: error, isSuccess: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SEND_FEEDBACK_REQUEST]: requestSendFeedback,
    [Types.SEND_FEEDBACK_SUCCESS]: successSendFeedback,
    [Types.SEND_FEEDBACK_FAILURE]: failureSendFeedback
})