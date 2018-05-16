import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import UserActions from './../Redux/UserRedux'
import { showAlertBox, logStore, showSuccesstBox } from './../Redux/commonRedux'
import { put, call } from 'redux-saga/effects'
import { changeto } from '../Redux/ScreenRedux'
import Lang from './../Lib/CutomLanguage'
import language from './../Lib/CutomLanguage'

/**
 * try update radius setting of current user
 * @param radius
 */

export function * updatetRadius (API, action) {
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
