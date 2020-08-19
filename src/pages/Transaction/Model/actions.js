import * as types from './types'

export const Actions = {
  setTransaction: payload => ({
    type: types.SET_TRANSACTION,
    payload,
  }),
  setLoading: payload => ({
    type: types.SET_LOADING,
    payload,
  }),
  setMessageStatus: payload => ({
    type: types.SET_STATUS_MESSAGE,
    payload,
  }),
  setActiveUser: payload => ({
    type: types.SET_ACTIVE_USER,
    payload,
  }),
  setUserTransactions: payload => ({
    type: types.SET_USER_TRANSACTIONS,
    payload,
  }),
}
