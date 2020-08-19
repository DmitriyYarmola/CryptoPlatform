import * as types from './types'

export const Actions = {
  setLoading: payload => ({
    type: types.SET_LOADING,
    payload,
  }),
  setNotificationDetails: payload => ({
    type: types.SET_NOTIFICATION_DETAILS,
    payload,
  }),
  setInvalidCredentials: payload => ({
    type: types.SET_INVALID_CREDENTIALS,
    payload,
  }),
  setAuthenticated: payload => ({
    type: types.SET_AUTETHENTICATED,
    payload,
  }),
  setToken: payload => ({
    type: types.SET_TOKEN,
    payload,
  }),
  setMerchants: payload => ({
    type: types.SET_MERCHANTS,
    payload,
  }),
}
