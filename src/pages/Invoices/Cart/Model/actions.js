import * as types from './types'

export const Actions = {
  ordersTable: payload => ({
    type: types.ORDERS_TABLE,
    payload,
  }),
  setCurrent: payload => ({
    type: types.SET_CURRENT,
    payload,
  }),
  setInvoicePrice: payload => ({
    type: types.SET_INVOICE_PRICE,
    payload,
  }),
  setCount: payload => ({
    type: types.SET_COUNT,
    payload,
  }),
  setCartOpen: payload => ({
    type: types.SET_CART_OPEN,
    payload,
  }),
  addItem: payload => ({
    type: types.ADD_ITEM,
    payload,
  }),
  setLoading: payload => ({
    type: types.SET_LOADING,
    payload,
  }),
  setOwnInvoiceById: payload => ({
    type: types.SET_OWN_INVOICE_BY_ID,
    payload,
  }),
  setRate: payload => ({
    type: types.SET_RATE,
    payload,
  }),
  setRateUSD: payload => ({
    type: types.SET_RATE_USD,
    payload,
  }),
}
