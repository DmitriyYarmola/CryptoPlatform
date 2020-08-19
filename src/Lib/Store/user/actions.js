import * as types from './types'

export const Actions = {
  setState: payload => ({
    type: types.SET_STATE,
    payload,
  }),
  login: payload => ({
    type: types.LOGIN,
    payload,
  }),
  loadCurrentAccount: payload => ({
    type: types.LOAD_CURRENT_ACCOUNT,
    payload,
  }),
  logout: payload => ({
    type: types.LOGOUT,
    payload,
  }),
}
