import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import UserActions, { getUser } from './../Redux/UserRedux'
import MyReportActions from './../Redux/MyReportRedux'
import ReportsActions from './../Redux/ReportsRedux'
import { reportCoordinate } from './../Redux/ReportsRedux'
import { showAlertBox, logStore, showSuccesstBox } from './../Redux/commonRedux'
import { put, call, select } from 'redux-saga/effects'
import Lang from './../Lib/CutomLanguage'
import language from './../Lib/CutomLanguage'
import { orderBy, flatReports, flatReport } from '../Transforms/ReportHelper'
import { ReportTypes } from '../Services/Constant'

export function * myReportRequest (API, action) {
  const user = yield select(getUser)
  yield put(MyReportActions.myReportMerge({fetching: true, error: ''})) // set loader
  try {
    const reports = yield call(API.getReportsByReporter, {params: {}, user})
    if (reports.ok && reports.data.status === 1) {
      __DEV__ && console.log('reports result', reports)
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

export function * myReportDetailRequest (API, action) {
  const user = yield select(getUser)
  const { _id } = action
  yield put(MyReportActions.myReportMerge({fetchingDetails: true, errorDetails: ''})) // set loader
  try {
    const report = yield call(API.getReportById, {params: {_id}, user})
    if (report.ok && report.data.status === 1) {
      __DEV__ && console.log('reports result', report)
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
