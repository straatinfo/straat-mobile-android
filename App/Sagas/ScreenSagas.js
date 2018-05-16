import { call } from 'redux-saga/effects'
import { changeto } from '../Redux/ScreenRedux'

export function * change (action) {
  const { navigation, route } = action
  yield call(changeto, navigation, route)
}
