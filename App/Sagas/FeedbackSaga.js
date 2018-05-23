import FeedbackActions from '../Redux/FeedbackRedux'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import { getLanguageState } from './../Redux/LanguageRedux'
import { popUpAlert } from './../Lib/Helper/alertHelper'
import { put, call, select } from 'redux-saga/effects'
import { showAlertBox } from './../Redux/commonRedux'

export const sendFeedback = function * (API, action) {
  const language = yield select(getLanguageState)
  try {
    yield call(loaderHandler.showLoader, language.txt_C08)
    const feedbackResponse = yield call(API.postFeedback, action.feedback)
    if (feedbackResponse.ok && feedbackResponse.data.status === 1) {
      yield put(FeedbackActions.sendFeedbackSuccess())
      yield call(popUpAlert, { title: ' ', message: feedbackResponse.data.data.message, pressok: () => {} })
    }
  } catch (error) {
    yield put(FeedbackActions.sendFeedbackFailure(error))
    yield call(showAlertBox, error.message)
  }
  yield call(loaderHandler.hideLoader)
}
