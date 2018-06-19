import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import { showAlertBox } from './../Redux/commonRedux'
import { put, call, select } from 'redux-saga/effects'
import { popUpAlertV2 } from '../Lib/Helper/alertHelper'
import { ReportStatus, SocketTypes } from '../Services/Constant'
import { getUser, getTeamList, getUserHost } from '../Redux/UserRedux'
import { filterReportsByMapView, sortCategories } from '../Transforms/ReportHelper'
import { getLanguageState } from './../Redux/LanguageRedux'
import ReportsActions, { processReport, getReportParams, stripUploadedPhoto, getReportMapMarkerList } from './../Redux/ReportsRedux'
import MyReportActions, { getMyReportList } from './../Redux/MyReportRedux'
import { CONNECTION } from '../Services/AppSocket'

/**
 * getNearbyReports
 * @param userPosition{long, lat, radius, _host)
 *
 */

const tempdata = {
  _id: 1324432,
  title: 'testTitle',
  reportCoordinate: {coordinates: [5.9869302, 53.2729801]},
  _mainCategory: {name: ' maincat 1'},
  note: ' note 1',
  location: 'kahit saan',
  timestamps: 'Wed Feb 14 2018 10:08:12 GMT+0800 (+08)'
}
/**
 * getNearbyReports
 * @param  { coordinate, user }
 *
 */
export const getNearbyReports = function * (API, action) {
  const { coordinate, user } = action.reportsParams
  const host = yield select(getUserHost)
  // coordinate { longitude, latitude}, user {accessToken, radius}
  try {
    // show loader
    // yield call(loaderHandler.showLoader, 'getting Nearby Reports') hide loader because it block the map

    __DEV__ && console.log('freportsParamss', action)
    const reports = yield call(API.getReportsByNearby, { coordinate, user, host })
    // test
    // const reports = {ok: true, data: {status: 1, data: [tempdata]}}

    __DEV__ && console.log('saga: reports', reports)
    // status success
    if (reports.ok && reports.data.status === 1) {
      __DEV__ && console.log('fetched reports', reports)
      // set user info to states for fast retrieving
      // get team list
      const teamList = yield select(getTeamList)
      const mapReports = filterReportsByMapView(reports.data.data, teamList)
      yield put(ReportsActions.reportMergeState({reportsListNear: reports.data.data, reportMapMarkerList: mapReports}))
      console.log('reports in map: ', mapReports)
    //  yield call(showAlertBox, 'alert')
    } else {
      throw new Error('error in getting Nearby Reports')
    }
  } catch (e) {
    console.log(e)
    yield call(showAlertBox, e.message)
  }
  // clean screen
  // yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * getUserAddress
 * @param { coordinate, user, _host }
 *
 */
export const getReportAddress = function * (API, action) {
  const { coordinate } = action // no need for token cuuse it only get from googleAPI
  const language = yield select(getLanguageState)
  const user = yield select(getUser)
  try {
    // show loader
    // yield call(loaderHandler.showLoader, language.fetching)

    __DEV__ && console.log('freportsParamss', action)
    const nearestAddress = yield call(API.getAddressByCoordinate, { coordinate })

    __DEV__ && console.log('saga: nearestAddress', nearestAddress)
    // status success
    if (nearestAddress.ok && nearestAddress.data['results'][0]['formatted_address']) {
      __DEV__ && console.log('fetched nearestAddress', nearestAddress)
      yield put(ReportsActions.reportMergeState({reportAddress: nearestAddress.data['results'][0]['formatted_address']}))
    } else {
      throw new Error(language.error)
    }
  } catch (e) {
    yield call(showAlertBox, e.message)
  }
  // clean screen
  // yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * upload report photo
 * @param (API, { photo })
 * it listen to UPLOAD_PHOTO
 *
 * @description upload photo
 * @param       photo {uri, fileName, type }
 *
 *
 *
 */
export const uploadPhoto = function * (API, action) {
  const language = yield select(getLanguageState)
  // show loader
  yield call(loaderHandler.showLoader, language.uploading)

  const { photo } = action
  let data = new FormData()
  // data.append('photo', photo)

  try {
    // if (photo.fileSize > 713876) {
    //   throw new Error('file too large')
    // }
    data.append('photo', {uri: photo.uri, name: photo.fileName, type: photo.type})

    __DEV__ && console.log(' photo: ', data)

    // fetch from backend
    const result = yield call(API.postUploadReportPhotos, { data })
    __DEV__ && console.log('UPLOAD_PHOTO', result)

    // status success
    if (result.ok && result.data.status === 1) {
      yield put(ReportsActions.addReportPhoto({live: stripUploadedPhoto(result.data.data), local: photo}))
    } else {
      throw new Error(language.error)
    }
    __DEV__ && console.log('success photo', result.data.data)
  } catch (e) {
    __DEV__ && console.log(e)
    showAlertBox(e.message)
  }

  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * get category
 * @param { reportsParams: { _reportType, _host } }
 * it listen to GET_CATEGORIES
 *
 */

export const getCategories = function * (API, action) {
  const language = yield select(getLanguageState)
  // show loader
  yield call(loaderHandler.showLoader, language.fetching)
  const { reportsParams: { _reportType } } = action
  const { _host, token} = yield select(getUser)
  const { isSpecific, language: lang } = yield select(getUserHost)

  __DEV__ && console.log('saga getCategories reportsParams', action)
  try {
    // getting general categories
    // fetch from backend _hostIsSpecific
    const result = yield call(API.getCategoriesGeneral, { _reportType, _host, token, language: lang })
    __DEV__ && console.log('saga getCategories', result)

    // status success
    if (result.ok && result.data.status === 1) {
     // must add sorting here base on may 19 , 2018
      yield put(ReportsActions.reportMergeState({reportGeneralCategoryList: sortCategories(result.data.data)}))
    } else {
      throw new Error(language.error)
    }

    if (isSpecific) {
      // getting specific categories
      const specificCategories = yield call(API.getCategories, { _reportType, _host, token, language: lang })
      __DEV__ && console.log('saga getCategories', result)

      // status success
      if (specificCategories.ok && specificCategories.data.status === 1) {
        // must add sorting here base on may 19 , 2018
        yield put(ReportsActions.reportMergeState({reportCategoryList: sortCategories(specificCategories.data.data)}))
      } else {
        throw new Error(language.error)
      }
    }

   // __DEV__ && console.log('success photo', result.data.data)
  } catch (e) {
    __DEV__ && console.log(e)
    showAlertBox(e.message)
  }

  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * subtmitReport
 * @param { reportsParams: { * } }
 * it listen to GET_CATEGORIES
 *
 */

export const submitReport = function * (API, action) {
  const language = yield select(getLanguageState)
  // show loader
  yield call(loaderHandler.showLoader, language.saving)
  const { _id, token } = yield select(getUser)

  const { reportParams: params } = action
  __DEV__ && console.log('saga submitReports', action)
  try {
    // fetch from backend
    const reportParams = yield select(getReportParams)
    __DEV__ && console.log('reportParams', reportParams)
    __DEV__ && console.log('reportParams', JSON.stringify(reportParams))
    const result = yield call(API.postReport, { reportParams })
    __DEV__ && console.log(reportParams)
    __DEV__ && console.log('API.postReport', result)
 
    // status success
    if (result.ok && result.data.status === 1) {
      // yield put(ReportsActions.reportMergeState({reportCategoryList: result.data.data}))
      if (reportParams.type === 'C') {
        popUpAlertV2(language.txt_J27, language.txt_J28c)
      } else {
        popUpAlertV2(language.txt_J27, language.txt_J28ab)
      }
      const data = result.data.data
      const pointList = yield select(getReportMapMarkerList)
      if (reportParams.type !== 'C') {
        yield put(ReportsActions.reportMergeState({reportMapMarkerList: [...pointList, data]}))
        yield put(ReportsActions.reportCreatesuccess(params))
      }

      params.callback(data._id)
      // send socket notification
      // shift to backend
      // const socketConnection = CONNECTION.getConnection(_id, token)
      // if (reportParams.type !== 'C') {
      //   socketConnection.emit(SocketTypes.SEND_GLOBAL, {TYPE: 'REPORT', content: data})
      // } else if (reportParams.type === 'C') {
      //   data.success.map(report => {
      //     socketConnection.emit(SocketTypes.SEND_GLOBAL, {TYPE: 'REPORT', content: report})
      //   })
      // } else {
      //   console.log('no noti to')
      // }

    } else if (result.ok && result.data.status === 0) {
      throw new Error(result.data.data.error) // success sending but error on something
    } else {
      throw new Error(language.error) // maybe no internet
    }
   // __DEV__ && console.log('success photo', result.data.data)
  } catch (e) {
    __DEV__ && console.log(e)
    showAlertBox(e.message)
  }

  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}

/**
 * subtmitReport
 * @param { reportsParams: { * } }
 * it listen to GET_CATEGORIES
 *
 */

export const changeStatus = function * (API, action) {
  const language = yield select(getLanguageState)
  // show loader
  yield call(loaderHandler.showLoader, language.saving)
  const user = yield select(getUser)
  const { report: { newData, _report } } = action
  __DEV__ && console.log('saga _report', _report)
  try {
    // fetch from backend
    // const reportParams = yield select(getReportParams)

    const result = yield call(API.putReport, {data: newData, _report, user})
    console.log(result)
    __DEV__ && console.log('API.putReport', result)

    // status success
    if (result.ok && result.data.status === 1) {
      // yield put(ReportsActions.reportMergeState({reportCategoryList: result.data.data}))
     // popUpAlertV2(language.txt_J27, language.txt_J28)
     // params.callback()
     // const data = result.data.data
    //  const pointList = yield select(getReportMapMarkerList)
    //  yield put(ReportsActions.reportMergeState({reportMapMarkerList: [...pointList, data]}))
    // updating mapListVIew
      const pointList = yield select(getReportMapMarkerList)
      const data = result.data.data
      // --                                                               ---------- remove current report ------------------ --add latest ---
      yield put(ReportsActions.reportMergeState({reportMapMarkerList: [...pointList.filter((report) => report._id !== _report), data], reportDetails: data}))

      // update my report list getMyReportList
      const myReportList = yield select(getMyReportList)
      yield put(MyReportActions.myReportMerge({ myReportList: myReportList.map((report) => report._id === data._id ? data : report) }))
    } else if (result.ok && result.data.status === 0) {
      throw new Error(result.data.data.error) // success sending but error on something
    } else {
      throw new Error(language.error) // maybe no internet
    }
   // __DEV__ && console.log('success photo', result.data.data)
  } catch (e) {
    __DEV__ && console.log(e)
    showAlertBox(e.message)
  }

  // clean screen
  yield call(loaderHandler.hideLoader)
  // yield call(logStore)
}
