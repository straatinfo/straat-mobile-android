import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import LanguageActions from './../Redux/LanguageRedux'
import UserActions, { setTheme } from './../Redux/UserRedux'
import { AppData } from '../Redux/commonRedux'
import { designDefault } from '../Transforms/themeHelper'
import { is } from 'ramda'
import { put, select, call } from 'redux-saga/effects'

export const selectAvatar = GithubSelectors.selectAvatar

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
    if (design !== null && design.button !== undefined) {
      yield call(setTheme, design)
      yield put(UserActions.mergeState({design: design}))
    }

    // set up language base on old user
    const userInfo = yield call(AppData.getUserInfo)
    const oldUser = JSON.parse(userInfo)
    if (oldUser.language) {
      yield put(LanguageActions.setLanguage(oldUser.language))
    }
  } catch (e) {
    yield call(setTheme, designDefault)
  }
}
