import * as types from './types'

export const Actions = {
  addUser: payload => ({
    type: types.ADD_USER,
    payload,
  }),
  setAdministrator: payload => ({
    type: types.SET_ADMINISTRATOR,
    payload,
  }),
  setRates: payload => ({
    type: types.SET_ALL_RATES,
    payload,
  }),
}
