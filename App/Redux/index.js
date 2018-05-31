import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  user: require('./UserRedux').reducer,
  language: require('./LanguageRedux').reducer,
  login: require('./LoginRedux').reducer,
  screen: require('./ScreenRedux').reducer,
  splash: require('./SplashRedux').reducer,
  accessCode: require('./AccessCodeRedux').reducer,
  reports: require('./ReportsRedux').reducer,
  setting: require('./SettingRedux').reducer,
  conversation: require('./ConversationRedux').reducer,
  message: require('./MessageRedux').reducer,
  team: require('./TeamRedux').reducer,
  teamList: require('./TeamListRedux').reducer,
  addNewTeam: require('./AddNewTeamRedux').reducer,
  teamProfile: require('./TeamRedux').reducer,
  myReport: require('./MyReportRedux').reducer,
  notification: require('./NotificationRedux').reducer,
  feedback: require('./FeedbackRedux').reducer,
  userProfile: require('./ProfileRedux').reducer,
  userinfo: require('./UserinfoRedux').reducer,
  socket: require('./SocketRedux').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
