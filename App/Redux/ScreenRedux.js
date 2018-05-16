import { createReducer, createActions } from 'reduxsauce'

const INITIAL_STATE = { navigation: null }
const { Types, Creators } = createActions({
  change: ['navigation', 'route']
})
export const ScreenTypes = Types
export default Creators

export const change = (state, navigation, route) => {
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE]: change
})

/** some actions  */

export const changeto = (navigation, route) => {
  navigation.navigate(route)
}

export const switchTo = (switchToMethod, childKey) => {
  switchToMethod(childKey)
}
