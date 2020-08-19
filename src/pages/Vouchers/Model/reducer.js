import * as types from './types'

const initialState = {
  vouchers: null,
  isLoading: true,
  editingKey: '',
  count: 1,
  activeVoucher: {},
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VOUCHERS:
      return {
        ...state,
        vouchers: action.payload,
      }
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case types.SET_ACTIVE_VOUCHER:
      return {
        ...state,
        activeVoucher: action.payload,
      }
    case types.ADD_VOUCHER:
      return {
        ...state,
        vouchers: [action.payload, ...state.vouchers],
      }
    default:
      return state
  }
}
