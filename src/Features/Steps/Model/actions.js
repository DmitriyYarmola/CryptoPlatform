import * as types from './types'

export const Actions = {
  setCity: payload => ({
    type: types.SET_CITY,
    payload,
  }),
  setEmail: payload => ({
    type: types.SET_EMAIL,
    payload,
  }),
  setName: payload => ({
    type: types.SET_NAME,
    payload,
  }),
  setAddress: payload => ({
    type: types.SET_ADDRESS,
    payload,
  }),
  setEditKey: payload => ({
    type: types.EDITING_KEY,
    payload,
  }),
}
