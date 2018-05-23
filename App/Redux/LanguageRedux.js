import { createReducer, createActions } from 'reduxsauce'
import { Languages } from '../Services/Constant'
import Immutable from 'seamless-immutable'
import English from './../Lib/CutomLanguage/languages/en'
import Dutch from './../Lib/CutomLanguage/languages/dutch'
import { AppData } from './commonRedux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setLanguage: ['langCode'],
  initializeLanguage: [],
  languageMergeState: ['newState']
})

export const LanguageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

// export const INITIAL_STATE = Immutable({
//   langCode: Languages.DUTCH,
//   lang: English
// })

export const INITIAL_STATE = Immutable({
  loadedLaguage: false,
  langCode: Languages.DUTCH,
  Languages: Dutch
})

console.log('English INITIAL_STATE', INITIAL_STATE)

const getLanguage = (langCode) => {
  switch (langCode) {
    case Languages.ENGLISH:
      return English
      break
    case Languages.DUTCH:
      return Dutch
      break
    default:
      return Dutch
  }
}

/* ------------- Reducers ------------- */

export const setLanguage = (state, {langCode}) => {
  __DEV__ && console.log('setLanguage', langCode)
  if (langCode !== state.langCode) {
    return state.merge({Languages: getLanguage(langCode), langCode: langCode, loadedLaguage: true})
  }
  return state.merge({loadedLaguage: true})
}

export const initializeLanguage = async (state, action) => {
  const userInfo = await AppData.getUserInfo()
  const oldUser = JSON.parse(userInfo)

  if (oldUser.language) {
    __DEV__ && console.log('INITIALIZE_LANGUAGE', oldUser.language)
    if (oldUser.language !== state.langCode) {
      __DEV__ && console.log('getLanguage(oldUser.language)', getLanguage(oldUser.language))
     //  return state.merge(getLanguage(oldUser.language))
    }
  }
  return state
}

export const languageMergeState = (state, { newState }) => {
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LANGUAGE]: setLanguage,
  [Types.INITIALIZE_LANGUAGE]: initializeLanguage,
  [Types.LANGUAGE_MERGE_STATE]: languageMergeState
  

})

/* ------------- Selectors ---------------- */

/**
 * @description  get language state from redux
 * @param {*} state
 */
export const getLanguageState = ({language: { Languages }}) => {
  return Languages
}
