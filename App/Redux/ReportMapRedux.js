import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reportMapRequest: ['data'],
  reportMapSuccess: ['payload'],
  reportMapFailure: null,
  mergeReportmap: ['newState'],
  reportmapSearchlisttoggle: ['status'],
  reportMapSearch: null
})

export const ReportMapTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  isOnSearch: false,
  serchItems: [ ],
  searchListActive: false,                // can be hide by map viewer - 
  searchSelectedID: 0,
  mapFilterCode: 'AB'      // type A , B , AB ,etc

})

/* ------------- Selectors ------------- */

export const ReportMapSelectors = {
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

// request the data from an api
export const reportmapSearchlisttoggle = (state, { status }) =>
  state.merge({ searchListActive: status })

export const mergeReportmap = (state, {newState}) => {
  __DEV__ && console.log('newState', newState)
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REPORT_MAP_REQUEST]: request,
  [Types.REPORT_MAP_SUCCESS]: success,
  [Types.REPORT_MAP_FAILURE]: failure,
  [Types.REPORTMAP_SEARCHLISTTOGGLE]: reportmapSearchlisttoggle,
  
  [Types.MERGE_REPORTMAP]: mergeReportmap
})
