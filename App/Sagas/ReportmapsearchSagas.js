/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import ReportmapsearchActions from '../Redux/ReportmapsearchRedux'
import ReportMapActions from './../Redux/ReportMapRedux'
import { getUserPosition } from '../Redux/ReportsRedux'
import { getUser } from '../Redux/UserRedux'
import { getLanguageState } from '../Redux/LanguageRedux'
import { formatMapSearchResult } from '../Transforms/ReportHelper'
// import { ReportmapsearchSelectors } from '../Redux/ReportmapsearchRedux'

export const getReportmapsearch = function * (api, googleApi, action) {
  try {
    const language = yield select(getLanguageState)
    const userPosition = yield select(getUserPosition)
    const user = yield select(getUser)
    const { data } = action
    // set radius for qureing google api
    // let radius = 300
    if (user.radius) {
      radius = user.radius
    }

    // get current data from Store
    // const currentData = yield select(ReportmapsearchSelectors.getData)
    // make the call to the api
    const response = yield call(googleApi.getSearchInMap, {radius, text: data, coordinate: userPosition})
    __DEV__ && console.log(response)

    // success?
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(ReportmapsearchActions.reportmapsearchSuccess(response.data))
      yield put(ReportMapActions.mergeReportmap({serchItems: formatMapSearchResult(response.data)}))
    } else {
      throw new Error(language.failed)
    }
  } catch (e) {
    __DEV__ && console.log(e)
    yield put(ReportMapActions.mergeReportmap({serchItems: []}))
    yield put(ReportmapsearchActions.reportmapsearchFailure())
  }
}
