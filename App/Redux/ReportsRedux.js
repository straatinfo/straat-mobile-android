import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { ReportTypes } from '../Services/Constant'
import { Report } from '../Services/ReportDefaults'
import AppConfig from '../Config/AppConfig'
import { Dimensions } from 'react-native'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getReportsNearbyRequest: ['reportsParams'],
  getCategories: ['reportsParams'],
  setReportAddressByCoordinate: ['coordinate'],                 //  initializer / call for sagas
  setMainCategory: ['reportParam'],
  // statusBarMessage: ['message'],
  uploadPhoto: ['photo'],
  addReportPhoto: ['photo'],                                    // used by redux saga to add photo in list of uploaded photos
  reportSubmit: ['reportParams'],                               // listeen here is effect that submit report to the server
  reportMergeState: ['newState'],
  reportChangeStatus: ['report'],
  reportReset: ['params'],
  setlogininitReport: ['params']

})
export const ReportsTypes = Types
export default Creators

const reportUploadImages = [{uri: 'content://media/external/images/media/19486'}, {uri: 'content://media/external/images/media/19486'}]

export const ReportDefault = Report

// const { width, height } = Dimensions.get('window')
// const LATITUD_DELTA = 0.0922
// const LONGITUDE_DELTA = LATITUD_DELTA + (width / height)

export const reportCoordinate = {
  longitude: 5.985930199999999,
  latitude: 53.2729807,
  // longitudeDelta: 0.0020870938897132874,
  // latitudeDelta: 0.0032272724505109096,
  accuracy: 100,
  longitudeDelta: 0.005922652780981252,
  latitudeDelta: 0.009315140868091376
}
const reportsListNear = []

export const resetForm = {
  reportMainCategoryList: [],
  reportSubCategoryList: [],
  reportSelectMainCategoryID: 0,
  reportSelectSubCategoryID: 0,
  reportUploadImages: [],
  reportListImages: [],
  reportIsUrgent: false,
  reportDescription: '',
  reportType: {},
  submitButton: false,
  reportIsPersonInvoled: false,
  reportIsVehicleInvoled: false,
  reportPersonInvoledCount: 0,
  reportVehicleInvoledCount: 0,
  reportPersonInvoledDesc: '',
  reportVehicleInvoledDesc: ''
}

/* ------------- Initial State ------------- */
const blanckPosition = { longitude: 5.985930199999999, latitude: 53.2729807, latitudeDelta: 0.01, longitudeDelta: 0.0075, accuracy: 100 }
export const INITIAL_STATE = Immutable({
  userPosition: AppConfig.DEBUG ? reportCoordinate : reportCoordinate,     // {long: null, lat: null, radius: 500}
  reportsListNear: AppConfig.DEBUG ? reportsListNear : [],               // i this this will not be needed , use reportMapMarkerList instead
  reportMapMarkerList: AppConfig.DEBUG ? reportsListNear : [],           // this will be the data of mapview that will use pin icon and has the report tooltip
  reportCategoryList: [],                                        // where all category list base on hostid will be put here so to reduce reduntant fetching
  reportGeneralCategoryList: [],                                 // where all category list base on hostid will be put here so to reduce reduntant fetching
  reportMainCategoryList: [],                                    // value will be parse from backend when user select in report type
  reportSubCategoryList: [],                                     // will have value if user select in main category
  reportSelectMainCategoryID: 0,                                 // selected main category id will be place in submit
  reportSelectSubCategoryID: 0,                                  // selected sub category id will be place in submit
  reportUploadImages: AppConfig.DEBUG ? reportUploadImages : [],         // list of photos in photos that is uploaded and used by gallery
  reportListImages: [],                                          // collection of uploaded photo data
  reportListUser: [],                                            // list of report per user
  reportCoordinate: AppConfig.DEBUG ? reportCoordinate : reportCoordinate, // {long: null, lat: null, radius: 500}
  reportIsUrgent: false,
  reportDescription: '',
  reportIsPersonInvoled: false,
  reportIsVehicleInvoled: false,
  reportPersonInvoledCount: 0,
  reportVehicleInvoledCount: 0,
  reportPersonInvoledDesc: '',
  reportVehicleInvoledDesc: '',
  reportTeamSelected: [],

  isReportFormActive: false,                                     // use by report map if pointer location will show
  reportType: {_id: '', code: '', name: ''},                     // report A, B, C {ReportType}
  reportRadius: 500,                                             // radius of nearby pin icon, use this so report will be filtered at mininum
  reportAddress: '',                                             // location use in report ex: streetname, city, place something
  reportHostId: '',
  statusBarMessage: '',                                          // set this for showing message in app: its not plug now , will be fix later
  submitButton: false,
  reportDetails: Report,                                          // type: Report  this data will display on after click the callout on map or in message
  fetchTeam: true,
  errorTeam: ''
})

/* ------------- Reducers ------------- */

export const getReportsNearbyRequest = (state, { reportsParams: { coordinate } }) => {
  return state.merge({ reportCoordinate: coordinate })
}

export const setReportAddressByCoordinate = (state, { coordinate }) => {
  return state.merge({ reportCoordinate: coordinate })
}

export const setlogininitReport = (state, { params }) => {
  const { long, lat } = params
  return state.merge({
    reportCoordinate: {...state.reportCoordinate, longitude: long, latitude: lat},
    userPosition: {...state.userPosition, longitude: long, latitude: lat}
  })
}

export const setMainCategory = (state, { reportParam }) => {
  return state
}

export const setSubCategory = (state, { reportParam }) => {
  return state
}

export const uploadPhoto = (state, { photo }) => {
  return state
}

export const addReportPhoto = (state, { photo }) => {
  __DEV__ && console.log('addReportPhoto', photo)
  return state.merge({ reportListImages: [...state.reportListImages, photo.live], reportUploadImages: [...state.reportUploadImages, photo.local] })
}

export const getCategories = (state, { reportsParams }) => {
  return state // .merge({ reportListImages: [...state.reportListImages, photo.live], reportUploadImages: [...state.reportUploadImages, photo.local] })
}

export const reportSubmit = (state, { reportParams }) => {
  return state
}

export const reportChangeStatus = (state, { _report }) => {
  return state
}
export const reportReset = (state, { params }) => {
  return INITIAL_STATE
}

export const reportMergeState = (state, { newState }) => {
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_REPORTS_NEARBY_REQUEST]: getReportsNearbyRequest,
  [Types.GET_CATEGORIES]: getCategories,
  [Types.SET_REPORT_ADDRESS_BY_COORDINATE]: setReportAddressByCoordinate,
  [Types.UPLOAD_PHOTO]: uploadPhoto,
  [Types.ADD_REPORT_PHOTO]: addReportPhoto,
  [Types.REPORT_SUBMIT]: reportSubmit,

  [Types.REPORT_CHANGE_STATUS]: reportChangeStatus,
  [Types.REPORT_MERGE_STATE]: reportMergeState,
  [Types.REPORT_RESET]: reportReset,
  [Types.SETLOGININIT_REPORT]: setlogininitReport
})

/* ------------- Selectors ---------------- */

/**
 * @description converting global state to require fields in form
 *               reduce transition between components and saga
 * @param {*} state
 */
export const getReportParams = (state) => {
  const { reports, user: { user } } = state
  const { accessToken } = user
  console.log('state', state)
  // set first only required
  const reportParams = {
    _reporter: user._id,
    _host: user._host,
    _reportType: reports.reportType._id,
    reportTypeCode: reports.reportType.code,
    title: reports.reportType.name,
    description: reports.reportDescription,
    reportUploadedPhotos: reports.reportListImages
  }

  let requireInType = {}
  requireInType.teamList = []

  // type A
  if (reports.reportType.code === ReportTypes.PUBLIC_SPACE.code || reports.reportType.code === ReportTypes.SAFETY.code) {
    // validation
    if (reports.reportSelectMainCategoryID) {
      requireInType._mainCategory = reports.reportSelectMainCategoryID
    }
    if (reports.reportSelectSubCategoryID) {
      requireInType._subCategory = reports.reportSelectSubCategoryID
    }
    requireInType._team = user._activeTeam._id // pan samantagal lnagto 
    requireInType.isUrgent = reports.reportIsUrgent
    requireInType.location = reports.reportAddress
    requireInType.long = reports.reportCoordinate.longitude
    requireInType.lat = reports.reportCoordinate.latitude
    requireInType.reportCoordinate = { coordinates: [reports.reportCoordinate.longitude, reports.reportCoordinate.latitude] }
  }

  // type B
  if (reports.reportType.code === ReportTypes.SAFETY.code) {
    // validation

    requireInType.isPeopleInvolved = reports.reportIsPersonInvoled
    if (reports.reportIsPersonInvoled) {
      requireInType.peopleInvolvedCount = reports.reportPersonInvoledCount
      requireInType.peopleInvolvedDescription = reports.reportPersonInvoledDesc
    }

    requireInType.isVehicleInvoled = reports.reportIsVehicleInvoled
    if (reports.reportIsVehicleInvoled) {
      requireInType.vehicleInvolvedCount = reports.reportVehicleInvoledCount
      requireInType.vehicleInvolvedDescription = reports.reportVehicleInvoledDesc
    }
  }
  // type C
  if (reports.reportType.code === ReportTypes.COMMUNICATION.code) {
    // validation
    // validation
    if (reports.reportSelectMainCategoryID) {
      requireInType._mainCategory = reports.reportSelectMainCategoryID
    }
    if (reports.reportSelectSubCategoryID) {
      requireInType._subCategory = reports.reportSelectSubCategoryID
    }
    requireInType.location = ''
    requireInType.teamList = reports.reportTeamSelected
  }
  return {data: { ...reportParams, ...requireInType }, accessToken, type: reports.reportType.code}
}

/* ------------- Some methods ------------- */

/**
 * @param  photObjectUploadedFormBackend
 */

export const stripUploadedPhoto = (photo) => {
  return {
    mimetype: photo.mimetype,
    public_id: photo.public_id,
    url: photo.url,
    secure_url: photo.secure_url,
    format: photo.format,
    etag: photo.etag,
    width: photo.width,
    height: photo.height
  }
}

/**
 *
 * @description clean&set Data first befor submitting
 * @param reportParams
 *
 */
export const processReport = (reportParams = {}) => {
  return {}
}

/* ------------- selector ------------- */
/**
 *
 * @description getReportMapMarkerList
 * @param state
 *
 */
export const getReportMapMarkerList = (state) => {
  return state.reports.reportMapMarkerList
}

/**
 *
 * @description getReportMapMarkerList
 * @param state
 *
 */
export const getUserPosition = (state) => {
  return state.reports.userPosition
}
