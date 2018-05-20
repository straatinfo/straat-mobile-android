import { put, select, call } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import { is } from 'ramda'
import { AppData } from '../Redux/commonRedux'

import UserActions, { setTheme } from './../Redux/UserRedux'
import LanguageActions from './../Redux/LanguageRedux'
import { designDefault } from '../Transforms/themeHelper'

// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar

// process STARTUP actions
export const startup = function * (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: selectAvatar
    })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
        someNormalFunction: selectAvatar
      }
    })
  }
  const avatar = yield select(selectAvatar)
  // only get if we don't have it yet
  if (!is(String, avatar)) {
    yield put(GithubActions.userRequest('GantMan'))
  }

  // configure app

}



export const configureApp = function * (action) {

  try {
    // set theam base on old user
    const theme = yield call(AppData.getTheme)
    const design = JSON.parse(theme)
    __DEV__ && console.log('AppData.getTheme', design)
    if (design !== null && design.button !== undefined) {
      yield call(setTheme, design)
      yield put(UserActions.mergeState({design: design}))
    }
  
    // set up language base on old user
    const userInfo = yield call(AppData.getUserInfo)
    const oldUser = JSON.parse(userInfo)
    __DEV__ && console.log('initializing language')
    if (oldUser.language) {
      yield put(LanguageActions.setLanguage(oldUser.language))
    }
  } catch (e) {
    yield call(setTheme, designDefault)
    // yield put(UserActions.mergeState({design: designDefault}))
  }
}

