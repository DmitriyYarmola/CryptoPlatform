import * as types from './types'

export const Actions = {
  setVouchers: payload => ({
    type: types.SET_VOUCHERS,
    payload,
  }),
  setLoading: payload => ({
    type: types.SET_LOADING,
    payload,
  }),
  setActiveVoucher: payload => ({
    type: types.SET_ACTIVE_VOUCHER,
    payload,
  }),
  setNewVoucher: payload => ({
    type: types.ADD_VOUCHER,
    payload,
  }),
}
