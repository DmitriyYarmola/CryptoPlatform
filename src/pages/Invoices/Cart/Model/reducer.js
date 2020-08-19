import * as types from './types'

const initialState = {
  current: 0,
  count: 5,
  invoiceItems: [],
  isCartOpen: false,
  isLoading: true,
  invoiceById: {},
  rate: null,
  rateUSD: null,
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ORDERS_TABLE:
      return {
        ...state,
        invoiceItems: action.payload,
      }
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case types.SET_INVOICE_PRICE:
      return {
        ...state,
        invoicePrice: action.payload,
      }
    case types.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }
    case types.SET_COUNT:
      return {
        ...state,
        count: action.payload,
      }
    case types.SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: action.payload,
      }
    case types.ADD_ITEM:
      return {
        ...state,
        invoiceItems: [...state.invoiceItems],
      }
    case types.SET_OWN_INVOICE_BY_ID:
      return {
        ...state,
        invoiceById: action.payload,
      }
    case types.SET_RATE:
      return {
        ...state,
        rate: action.payload,
      }
    case types.SET_RATE_USD:
      return {
        ...state,
        rateUSD: action.payload,
      }
    default:
      return state
  }
}
