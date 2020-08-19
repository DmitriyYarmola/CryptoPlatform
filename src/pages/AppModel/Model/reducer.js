import * as types from './types'

const initialState = {
  valuteRates: null,
  users: ['Affipay'],
  transactionTypes: ['Credit', 'Debit', 'Account_creation'],
  valuteTypes: ['BTC', 'ETH', 'XTZ', 'BCH', 'LTC', 'SUST', 'USDT'],
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      }
    case types.SET_ADMINISTRATOR:
      return {
        ...state,
        administrator: action.payload,
      }
    case types.SET_ALL_RATES:
      return {
        ...state,
        valuteRates: action.payload,
      }
    default:
      return state
  }
}
