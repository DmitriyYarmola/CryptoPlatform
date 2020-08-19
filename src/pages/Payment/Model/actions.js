import * as types from './types'

export const Actions = {
  setAddress: payload => ({
    type: types.SET_ADDRESS,
    payload,
  }),
  setLoading: payload => ({
    type: types.SET_LOADING,
    payload,
  }),
  setTransactions: payload => ({
    type: types.SET_TRANSACTIONS,
    payload,
  }),
  showResult: payload => ({
    type: types.SHOW_RESULT,
    payload,
  }),
}
