import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import UserActions from './../Redux/UserRedux'
import { showAlertBox, logStore, showSuccesstBox } from './../Redux/commonRedux'
import { put, call, select } from 'redux-saga/effects'
import { changeto } from '../Redux/ScreenRedux'
import { getLanguageState } from './../Redux/LanguageRedux'

/**
 * try update radius setting of current user
 * @param radius
 */

export const updatetRadius = function * (API, action) {
  const language = yield select(getLanguageState)
  const { radius } = action.accessCodeContainer
  try {
    yield call(loaderHandler.showLoader, language.saving)

    const request = yield call(API.postConfirmAccessCode, {radius})
    __DEV__ && console.log('requestedHostId: ', request)
    if (request.ok && request.data.status === 1) {
      __DEV__ && console.log('request.ok: ', request)
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
