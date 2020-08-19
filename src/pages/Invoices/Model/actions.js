import * as types from './types'

export const Actions = {
  setInvoices: payload => ({
    type: types.SET_INVOICES,
    payload,
  }),
  setLoading: payload => ({
    type: types.SET_LOADING,
    payload,
  }),
  setEditKey: payload => ({
    type: types.SET_EDITNGKEY,
    payload,
  }),
  setCount: payload => ({
    type: types.SET_COUNT,
    payload,
  }),
  setActiveInvoice: payload => ({
    type: types.SET_ACTIVE_INVOICE,
    payload,
  }),
  addItemOfInvoice: payload => ({
    type: types.ADD_ITEM_OF_INVOICE,
    payload,
  }),
  deleteItemOfInvoice: payload => ({
    type: types.DELETE_ITEM_OF_INVOICE,
    payload,
  }),
  createNewInvoice: payload => ({
    type: types.IS_CREATE_NEW_INVOICE,
    payload,
  }),
  setNewInvoice: payload => ({
    type: types.SET_NEW_INVOICE,
    payload,
  }),
  saveUpdatedItem: payload => ({
    type: types.SAVE_UPDATED_ITEM,
    payload,
  }),
}
