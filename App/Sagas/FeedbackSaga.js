import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import FeedbackActions from '../Redux/FeedbackRedux'
import { showAlertBox, logStore, AppData } from './../Redux/commonRedux'
import { put, call, select } from 'redux-saga/effects'
import { changeto } from '../Redux/ScreenRedux'

import { popUpAlert } from './../Lib/Helper/alertHelper'
import { onloginPopUp, getApprovedTeamList } from './../Transforms/Filters'
import { getLanguageState } from './../Redux/LanguageRedux'
export const sendFeedback = function * (API, action) {
    const language = yield select(getLanguageState)
    try {
        console.log('Sending feedback...', action);
        console.log('Sending feedback API', API);

        // show loader
        yield call(loaderHandler.showLoader, language.txt_C08)

        // api call
        const feedbackResponse = yield call(API.postFeedback, action.feedback);
        if (feedbackResponse.ok && feedbackResponse.data.status === 1) {
            console.log('Sending feedback successful.', feedbackResponse);
            yield put(FeedbackActions.sendFeedbackSuccess());
            yield call(popUpAlert, { title: ' ', message: feedbackResponse.data.data.message, pressok: () => {} })
        }
    } catch (error) {
        console.log('Sending feedback failed. ', error);
        yield put(FeedbackActions.sendFeedbackFailure(error));
        yield call(showAlertBox, error.message);
    }
    // clean screen
    yield call(loaderHandler.hideLoader)
}
