import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myReportRequest: ['data'],
  myReportDetailRequest: ['_id'],
  myReportMerge: ['newState'],
  deleteMyreport: ['_id'],
  removeMyreport: ['_id']
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

export const removeMyreport = (state, {_id}) => {
  // console.log(_id)
  // return state.myReportList.merge({ fetchingDetails: true })
  // const toRemove = state.myReportList.findIndex(report => report._id === _id )
  return state.merge({myReportList: state.myReportList.filter(report => report._id !== _id)})
}

export const myReportMerge = (state, { newState }) => {
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MY_REPORT_REQUEST]: myReportRequest,
  [Types.MY_REPORT_DETAIL_REQUEST]: myReportDetailRequest,
  [Types.MY_REPORT_MERGE]: myReportMerge,
  [Types.DELETE_MYREPORT]: deleteMyreport,
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
