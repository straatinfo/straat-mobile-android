import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { SocketTypes } from '../Services/Constant'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myReportRequest: ['data'],
  myReportDetailRequest: ['_id'],
  myReportMerge: ['newState'],
  deleteMyreport: ['_id'],
  unfollowReport: ['_id'],
  removeMyreport: ['_id'],
  myReportUpdatemessage: ['params']
})

export const MyReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  myReportList: [],                              // list array of listblock in Myreport
  error: null,
  fetching: true,

  errorDetails: null,
  fetchingDetails: true
})

/* ------------- Reducers ------------- */

// fire getting notification
export const myReportRequest = (state, {data}) => {
  return state.merge({ fetchingA: true })
}

export const myReportDetailRequest = (state, {data}) => {
  return state.merge({ fetchingDetails: true })
}

export const deleteMyreport = (state, {data}) => {
  return state
}

export const unfollowReport = (state, {data}) => {
  return state
}

export const removeMyreport = (state, {_id}) => {
  // console.log(_id)
  // return state.myReportList.merge({ fetchingDetails: true })
  // const toRemove = state.myReportList.findIndex(report => report._id === _id )
  return state.merge({myReportList: state.myReportList.filter(report => report._id !== _id)})
}

const updateMessage = (r, messageID) => {
  return r.updateIn(['_conversation', 'messages'], (messages) => [...messages, messageID])
}

export const myReportUpdatemessage = (state, {params: {data, source}}) => {
  try {
    let reportIndex
    if (source === SocketTypes.RECEIVE_MESSAGE && data.conversation.type === 'REPORT') {
      const reportID = data.conversation._report._id
      const messageID = data.payload._id
      reportIndex = state.myReportList.findIndex((r) => r._id === reportID)
      if (reportIndex >= 0) {
        return state.merge({myReportList: state.myReportList.map((r, i) => r._id === reportID ? updateMessage(r, messageID) : r)})
      }
    }
  } catch (e) {
    console.log(e)
  }
  return state
}

export const myReportMerge = (state, { newState }) => {
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MY_REPORT_REQUEST]: myReportRequest,
  [Types.MY_REPORT_DETAIL_REQUEST]: myReportDetailRequest,
  [Types.MY_REPORT_MERGE]: myReportMerge,
  [Types.MY_REPORT_UPDATEMESSAGE]: myReportUpdatemessage,
  [Types.DELETE_MYREPORT]: deleteMyreport,
  [Types.UNFOLLOW_REPORT]: unfollowReport,
  [Types.REMOVE_MYREPORT]: removeMyreport

})

/* ------------- Selectors ------------- */
/**
 * @description  get my report list
 *
 */

export const getMyReportList = (state) => {
  return state.myReport.myReportList
}
