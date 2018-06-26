import MyReportActions from './../Redux/MyReportRedux'
import ReportsActions from './../Redux/ReportsRedux'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import { flatReports, flatReport } from '../Transforms/ReportHelper'
import { getLanguageState } from '../Redux/LanguageRedux'
import { getUser, getUserHost } from './../Redux/UserRedux'
import { put, call, select } from 'redux-saga/effects'
import { showAlertBox, logStore } from './../Redux/commonRedux'
import { popUpAlertV2 } from '../Lib/Helper/alertHelper';

export const myReportRequest = function * (API, action) {
  const language = yield select(getLanguageState)
  const user = yield select(getUser)
  const host = yield select(getUserHost)
  yield put(MyReportActions.myReportMerge({fetching: true, error: ''}))
  try {
    const reports = yield call(API.getReportsByReporter, {params: {}, user, host})
    if (reports.ok && reports.data.status === 1) {
      yield put(MyReportActions.myReportMerge({fetching: false, error: '', myReportList: flatReports(reports.data.data)}))
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    yield call(showAlertBox, e.message)
    yield put(MyReportActions.myReportMerge({fetching: false, error: e.message}))
  }
  yield call(logStore)
}

export const myReportDetailRequest = function * (API, action) {
  const language = yield select(getLanguageState)
  const user = yield select(getUser)
  const host = yield select(getUserHost)
  const { _id } = action
  __DEV__ && console.log('action', action)
  yield put(MyReportActions.myReportMerge({fetchingDetails: true, errorDetails: ''}))
  try {
    const report = yield call(API.getReportById, {params: {_id}, user, host})
    if (report.ok && report.data.status === 1) {
      yield put(MyReportActions.myReportMerge({fetchingDetails: false, errorDetails: '', typeAList: report.data.data}))
      yield put(ReportsActions.reportMergeState({reportDetails: flatReport(report.data.data)}))
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    yield call(showAlertBox, e.message)
    yield put(MyReportActions.myReportMerge({fetchingDetails: false, errorDetails: e.message}))
  }
  yield call(logStore)
}

export const myReportDeleteRequest = function * (API, action) {
  const language = yield select(getLanguageState)
  const user = yield select(getUser)
  const host = yield select(getUserHost)
  const { _id } = action
  // __DEV__ && console.log('deleting')
  yield call(loaderHandler.showLoader, language.txt_C08)
  // yield put(MyReportActions.myReportMerge({fetchingDetails: true, errorDetails: ''}))
  try {
    const report = yield call(API.deleteReport, {_report: _id, user, host})
    if (report.ok && report.data.status === 1) {
      yield put(MyReportActions.removeMyreport(_id))
      popUpAlertV2(language.success, language.ReportHasBeenDeleted)
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    yield call(showAlertBox, e.message)
    yield put(MyReportActions.myReportMerge({fetchingDetails: false, errorDetails: e.message}))
  }
  yield call(loaderHandler.hideLoader)
  yield call(logStore)
}

