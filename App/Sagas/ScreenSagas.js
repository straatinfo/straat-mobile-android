import { call } from 'redux-saga/effects'
import { changeto } from '../Redux/ScreenRedux'

export const change = function * (action) {
  const { navigation, route } = action
  yield call(changeto, navigation, route)
}
