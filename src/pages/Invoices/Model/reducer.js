import * as types from './types'

const initialState = {
  invoices: [],
  isLoading: false,
  editingKey: '',
  count: 1,
  activeInvoice: {},
  newInvoice: false,
}

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      }
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case types.SET_EDITNGKEY:
      return {
        ...state,
        editingKey: action.payload,
      }
    case types.SET_COUNT:
      return {
        ...state,
        count: action.payload,
      }
    case types.SET_ACTIVE_INVOICE:
      return {
        ...state,
        activeInvoice: action.payload,
      }
    case types.ADD_ITEM_OF_INVOICE:
      return {
        ...state,
        invoices: [
          ...state.invoices.map(invoice => {
            if (invoice.invoiceId === action.payload.invoiceId) return action.payload
            return invoice
          }),
        ],
      }
    case types.DELETE_ITEM_OF_INVOICE:
      return {
        ...state,
        invoices: [
          ...state.invoices.map(invoice => {
            console.log('invoices', action)
            if (invoice.invoiceId === action.payload.invoiceId) return action.payload
            return invoice
          }),
        ],
      }
    case types.IS_CREATE_NEW_INVOICE:
      return {
        ...state,
        newInvoice: action.payload,
      }
    case types.SET_NEW_INVOICE:
      return {
        ...state,
        invoices: [action.payload, ...state.invoices],
      }
    case types.SAVE_UPDATED_ITEM:
      return {
        ...state,
        activeInvoice: {
          ...state.activeInvoice,
          items: [
            ...state.activeInvoice.items.map(item => {
              if (item.id === action.payload.id) {
                return action.payload
              }
              return item
            }),
          ],
        },
      }
    default:
      return state
  }
}
