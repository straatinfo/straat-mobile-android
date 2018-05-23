import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import UserActions from './../Redux/UserRedux'
import { getLanguageState } from './../Redux/LanguageRedux'
import { put, call, select } from 'redux-saga/effects'
import { showAlertBox, logStore } from './../Redux/commonRedux'

/**
 *
 * try update radius setting of current user
 * @param radius
 *
 */

export const updatetRadius = function * (API, action) {
  const language = yield select(getLanguageState)
  const { radius } = action.accessCodeContainer
  try {
    yield call(loaderHandler.showLoader, language.saving)

    const request = yield call(API.postConfirmAccessCode, {radius})
    if (request.ok && request.data.status === 1) {
      yield put(UserActions.userChangeRadius(radius))
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    yield call(showAlertBox, e.message)
  }
  yield call(loaderHandler.hideLoader)
  yield call(logStore)
}
