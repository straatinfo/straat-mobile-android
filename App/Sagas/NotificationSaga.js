import DebugConfig from './../Config/DebugConfig'
import NotificationActions, { getNotification } from './../Redux/NotificationRedux'
import { flatReports } from '../Transforms/ReportHelper'
import { getLanguageState } from './../Redux/LanguageRedux'
import { getUser, getUserHost } from './../Redux/UserRedux'
import { put, call, select } from 'redux-saga/effects'
import { ReportTypes, SocketTypes } from '../Services/Constant'
import { showAlertBox, logStore } from './../Redux/commonRedux'
import { createReportNotification } from '../Transforms/NotificationHelper'
import { getAppSetting } from '../Redux/SettingRedux'
import { localNotification } from '../Services/NotificationService'

const displayNotificationCountOfHisReport = DebugConfig.displayNotificationCountOfHisReport


export const notifactionRequestTypeA = function * (API, action) {
  const language = yield select(getLanguageState)
  const user = yield select(getUser)
  const host = yield select(getUserHost)
  // const coordinate = reportCoordinate
  yield put(NotificationActions.notificationMerge({fetchingA: true, errorA: ''}))
  try {
    const reports = yield call(API.getPublicReports, { _reportType: ReportTypes.PUBLIC_SPACE._id, user, host })
    if (reports.ok && reports.data.status === 1) {
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
  const language = yield select(getLanguageState)
  const user = yield select(getUser)
  const host = yield select(getUserHost)
  yield put(NotificationActions.notificationMerge({fetchingB: true, errorB: ''}))
  try {
    const reports = yield call(API.getPublicReports, { _reportType: ReportTypes.SAFETY._id, user, host })
    if (reports.ok && reports.data.status === 1) {
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
  const language = yield select(getLanguageState)
  const user = yield select(getUser)
  const host = yield select(getUserHost)
  yield put(NotificationActions.notificationMerge({fetchingC: true, errorC: ''}))
  try {
    const reports = yield call(API.getPublicReports, { _reportType: ReportTypes.COMMUNICATION._id, user, host })
    __DEV__ && console.log('reports C: ', reports)
    if (reports.ok && reports.data.status === 1) {
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
 *
 * @description start socket service
 * @param { user }
 *
 */

export const updateByNotification = function * (API, action) {
  console.log('updateByNotification action', action)
  try {
    const NotifactionState = yield select(getNotification)
    const user = yield select(getUser)
    const appSetting = yield select(getAppSetting)

    const { source, data: {data: {TYPE, content}} } = action
    let merging = { }
    // notification here
    // this will be refactor some day
    if (source === SocketTypes.RECEIVE_GLOBAL) {
      if (TYPE && TYPE === SocketTypes.REPORT && (content._reporter._id !== user._id || DebugConfig.displayNotificationAlertOfHisReport)) {
        // process report noti here
        if (content._reportType && content._reportType.code === ReportTypes.PUBLIC_SPACE.code) {
          merging.typeAList = [content, ...NotifactionState.typeAList]
          merging.typeCount_A = NotifactionState.typeCount_A + 1
          merging.countedListA = [...NotifactionState.countedListA, content._id]
        }
        if (content._reportType && content._reportType.code === ReportTypes.SAFETY.code) {
          merging.typeBList = [content, ...NotifactionState.typeBList]
          merging.typeCount_B = NotifactionState.typeCount_B + 1
          merging.countedListB = [...NotifactionState.countedListB, content._id]
        }
        if (content._reportType && content._reportType.code === ReportTypes.COMMUNICATION.code) {
          merging.typeCList = [content, ...NotifactionState.typeCList]
          merging.typeCount_C = NotifactionState.typeCount_C + 1
          merging.countedListC = [...NotifactionState.countedListC, content._id]
        }

        // push notification to device
        yield call(localNotification, createReportNotification(content), appSetting)
      }
    }
    merging.dataReceive = [...NotifactionState.dataReceive, content || {}]
    yield put(NotificationActions.notificationMerge(merging))
  } catch (e) {
    console.log(e)
  }
}
