import * as types from './types'

export const Actions = {
  setBalance: payload => ({
    type: types.SET_BALANCE,
    payload,
  }),
  setLoading: payload => ({
    type: types.SET_LOADING,
    payload,
  }),
  setUnsucessful: payload => ({
    type: types.SET_STATUS_MESSAGE,
    payload,
  }),
  setActiveUser: payload => ({
    type: types.SET_ACTIVE_USER,
    payload,
  }),
}
