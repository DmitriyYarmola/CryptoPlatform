import * as types from './types'

export const Actions = {
  setNotifications: payload => ({
    type: types.SET_NOTIFICATIONS,
    payload,
  }),
  setLoading: payload => ({
    type: types.SET_LOADING,
    payload,
  }),
  setNotFound: payload => ({
    type: types.SET_NOT_FOUND,
    payload,
  }),
}
