import * as types from './types'

export const Actions = {
  setState: payload => ({
    type: types.SET_STATE,
    payload,
  }),
  changeSetting: payload => ({
    type: types.CHANGE_SETTING,
    payload,
  }),
  setPrimaryColor: payload => ({
    type: types.SET_PRIMARY_COLOR,
    payload,
  }),
  setTheme: payload => ({
    type: types.SET_THEME,
    payload,
  }),
}
