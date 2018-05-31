import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changeRadius: ['radius'],
  settingMergeState: ['newState']
})

export const SettingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  hasGPS: false,
  radius: 0.25
})

/* ------------- Reducers ------------- */

export const changeRadius = (state, radius) => {
  return state.merge({ radius: radius })
}

export const settingMergeState = (state, { newState }) => {
  return state.merge(newState)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_RADIUS]: changeRadius,
  [Types.SETTING_MERGE_STATE]: settingMergeState
})

/**
 * @param is app using gps or not
 *
 */

export const isOffGPS = (state) => {
  return state.setting.hasGPS
}
