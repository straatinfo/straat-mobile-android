import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  changeLoadingMessage: ['loadingMessage', 'route']
})
export const SplashTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loadingMesage: null
})

export const changeLoadingMessage = (state, action) => {
  return state.merge({
    loadingMessage: action.loadingMessage
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_LOADING_MESSAGE]: changeLoadingMessage
})

/** some actions

export const changeto = (navigation, route) => {
  navigation.navigate(route)
}
 */
