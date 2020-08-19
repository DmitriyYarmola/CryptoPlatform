import * as types from './types'

export const Actions = {
  setState: payload => ({
    types: types.SET_STATE,
    payload,
  }),
  getData: payload => ({
    types: types.GET_DATA,
    payload,
  }),
}
