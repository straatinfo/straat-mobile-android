import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import UserActions, { getUser } from './../Redux/UserRedux'
import NotificationActions, { getNotification } from './../Redux/NotificationRedux'
import { reportCoordinate } from './../Redux/ReportsRedux'
import { showAlertBox, logStore, showSuccesstBox } from './../Redux/commonRedux'
import { put, call, select } from 'redux-saga/effects'
import Lang from './../Lib/CutomLanguage'
import language from './../Lib/CutomLanguage'
import { filterReportsByType, flatReports, orderBy } from '../Transforms/ReportHelper'
import { ReportTypes, SocketTypes } from '../Services/Constant'
import { CONNECTION } from '../Services/AppSocket'
import DebugConfig from './../Config/DebugConfig'
const displayNotificationCountOfHisReport = DebugConfig.displayNotificationCountOfHisReport

export const notifactionRequestTypeA = function * (API, action) {
  const user = yield select(getUser)
  // const coordinate = reportCoordinate
  yield put(NotificationActions.notificationMerge({fetchingA: true, errorA: ''})) // set loader
  try {
    const reports = yield call(API.getPublicReports, { _reportType: ReportTypes.PUBLIC_SPACE._id, user })
    __DEV__ && console.log('reports result', reports)
    if (reports.ok && reports.data.status === 1) {
      //                                                                                        ---  here will filter result ----
      // yield put(NotificationActions.notificationMerge({fetchingA: false, errorA: '', typeAList: flatReports(filterReportsByType(reports.data.data, ReportTypes.PUBLIC_SPACE.code))}))
      yield put(NotificationActions.notificationMerge({fetchingA: false, errorA: '', typeAList: flatReports(reports.data.data)}))
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    yield call(showAlertBox, e.message)
    yield put(NotificationActions.notificationMerge({fetchingA: false, errorA: e.message}))
  }
  yield call(logStore)
}

export const notifactionRequestTypeB = function * (API, action) {
  const user = yield select(getUser)
  // const coordinate = reportCoordinate
  yield put(NotificationActions.notificationMerge({fetchingB: true, errorB: ''})) // set loader
  try {
    const reports = yield call(API.getPublicReports, { _reportType: ReportTypes.SAFETY._id, user })
    if (reports.ok && reports.data.status === 1) {
      __DEV__ && console.log('reports result', reports)
      //                                                                                        ---  here will filter result ----
      yield put(NotificationActions.notificationMerge({fetchingB: false, errorB: '', typeBList: flatReports(reports.data.data)}))
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    yield call(showAlertBox, e.message)
    yield put(NotificationActions.notificationMerge({fetchingB: false, errorB: e.message}))
  }
  yield call(logStore)
}

export function * notifactionRequestTypeC (API, action) {
  const user = yield select(getUser)
  // const coordinate = reportCoordinate
  yield put(NotificationActions.notificationMerge({fetchingC: true, errorC: ''})) // set loader
  try {
    const reports = yield call(API.getPublicReports, { _reportType: ReportTypes.COMMUNICATION._id, user })
    if (reports.ok && reports.data.status === 1) {
      __DEV__ && console.log('reports result', reports)
      //                                                                                        ---  here will filter result ----
      yield put(NotificationActions.notificationMerge({fetchingC: false, errorC: '', typeCList: flatReports(reports.data.data)}))
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    yield call(showAlertBox, e.message)
    yield put(NotificationActions.notificationMerge({fetchingC: false, errorC: e.message}))
  }
  yield call(logStore)
}

/**
 * @description start socket service
 * @param { user }
 */

export const updateByNotification = function * (API, action) {
  try {
    const NotifactionState = yield select(getNotification)
    const user = yield select(getUser)
    __DEV__ && console.log(action)
    const { source, data: {data: {TYPE, content}} } = action
    const data = content.data
    console.log(SocketTypes.RECEIVE_GLOBAL, content.data)
    let merging = { }
    // notification here
    // this will be refactor some day
    if (source === SocketTypes.RECEIVE_GLOBAL) {
      if (TYPE && TYPE === SocketTypes.REPORT) {
        // process report noti here
        if (content._reportType && content._reportType.code === ReportTypes.PUBLIC_SPACE.code) {
          merging.typeAList = [content, ...NotifactionState.typeAList]
          if (content._reporter._id !== user._id || displayNotificationCountOfHisReport ) {
            merging.typeCount_A = NotifactionState.typeCount_A + 1
          }
        }
        if (content._reportType && content._reportType.code === ReportTypes.SAFETY.code) {
          merging.typeBList = [content, ...NotifactionState.typeBList]
          if (content._reporter._id !== user._id || displayNotificationCountOfHisReport ) { 
            merging.typeCount_B = NotifactionState.typeCount_B + 1
          }
        }
        if (content._reportType && content._reportType.code === ReportTypes.COMMUNICATION.code) {
          merging.typeCList = [content, ...NotifactionState.typeCList]
          if (content._reporter._id !== user._id  || displayNotificationCountOfHisReport ) { 
            merging.typeCount_C = NotifactionState.typeCount_C + 1
          }
        }
      }
    }
    merging.dataReceive = [...NotifactionState.dataReceive, content ? content : {}]
    yield put(NotificationActions.notificationMerge(merging))

    console.log('NotifactionState', NotifactionState.typeAList)
  } catch (e) {
    console.log(e)
  // yield call(setTheme, designDefault)
    // yield put(UserActions.mergeState({design: designDefault}))
  }
}
