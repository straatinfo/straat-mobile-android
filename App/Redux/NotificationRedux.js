import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { notificationTypes, ConvoTypes, ReportTypes } from '../Services/Constant'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notificationRequestTypeA: ['data'],
  notificationRequestTypeB: ['data'],
  notificationRequestTypeC: ['data'],
  notificationMerge: ['newState'],
  updateByNotification: ['source', 'data'],
  addNotification: ['data'],
  clearNotification: ['data']

})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  typeAList: [],                              // i separate by type cos, for performance tuning
  typeBList: [],                              // i separate by type cos, for performance tuning
  typeCList: [],                              // i separate by type cos, for performance tuning

  typeCount_A: 0,                             // count of small red icon on top of its name
  typeCount_B: 0,
  typeCount_C: 0,
  chatCount: 0,
  errorA: null,
  fetchingA: true,

  errorB: null,
  fetchingB: true,

  errorC: null,
  fetchingC: true,
  dataReceive: []
})

/* ------------- Reducers ------------- */

// fire getting notification
export const notificationRequestTypeA = (state, {data}) => {
  return state.merge({ fetchingA: true })
}

// fire getting notification
export const notificationRequestTypeB = (state, {data}) => {
  return state.merge({ fetchingB: true })
}

// fire getting notification
export const notificationRequestTypeC = (state, {data}) => {
  return state.merge({ fetchingC: true })
}

export const updateByNotification = (state, {data}) => {
  return state
}
export const addNotification = (state, {data}) => {
  const { convo, count } = data
  if (convo.type === ConvoTypes.REPORT) {
    if (convo._report._reportType._id === ReportTypes.PUBLIC_SPACE._id) {
      return state.merge({chatCount: state.typeCount_A + count})
      //
    } else if (convo._report._reportType._id === ReportTypes.SAFETY._id) {
      return state.merge({chatCount: state.typeCount_B + count})
      //
    } else if (convo._report._reportType._id === ReportTypes.COMMUNICATION._id) {
      return state.merge({chatCount: state.typeCount_C + count})
    }
  } else if (convo.type === ConvoTypes.TEAM) {
    // cause 4th tab in notification screen is chat for team only as of now
    return state.merge({chatCount: state.chatCount + count})
  } else if (convo.type === ConvoTypes.USER) {
    // cause 4th tab in notification screen is chat for team only as of now
   // return state.merge({chatCount: state.chatCount + count})
  }

  return state
}
export const clearNotification = (state, {data}) => {
  const { type } = data
  if (type === notificationTypes.chat) {
    return state.merge({chatCount: 0})
  }
  return state
}

export const notificationMerge = (state, { newState }) => {
  console.log('newState', newState)
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATION_REQUEST_TYPE_A]: notificationRequestTypeA,
  [Types.NOTIFICATION_REQUEST_TYPE_B]: notificationRequestTypeB,
  [Types.NOTIFICATION_REQUEST_TYPE_C]: notificationRequestTypeC,
  [Types.NOTIFICATION_MERGE]: notificationMerge,
  [Types.UPDATE_BY_NOTIFICATION]: updateByNotification,
  [Types.ADD_NOTIFICATION]: addNotification,
  [Types.CLEAR_NOTIFICATION]: clearNotification

})

/* ------------- Selectors ------------- */

/**
 * @description get notifacation state
 * @param r
 *
 */

export const getNotification = (state) => {
  return state.notification
}
