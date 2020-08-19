/* eslint-disable no-unused-vars */
import { call, takeEvery, all, put } from 'redux-saga/effects'
import { message } from 'antd'
import { CartActions } from 'pages/Invoices/Cart'
import { searchCodeError } from 'Lib/searchCodeError'
import { addKey } from 'Lib/addKey'
import moment from 'moment'
import { deleteLetterInDate } from 'Lib/deleteLetterInDate'
import { dateParser } from 'Lib/dateParser'
import {
  getInvoices,
  addInvoice,
  getOwnInvoiceById,
  deleteInvoice,
} from '../../../API/rest/Invoices'
import { addItem, updateItem, deleteItem } from '../../../API/rest/Invoices/Items'
import { Actions } from './actions'
import * as types from './types'

function* getInvoicesSaga({ payload }) {
  const { token } = payload
  try {
    const response = yield call(getInvoices, token)
    const { data } = response
    console.log(response.data)
    data.forEach(item => {
      console.log(item)
      item.date = dateParser(item.date)
    })
    const invoices = addKey(data)
    yield put(Actions.setInvoices(invoices))
    yield put(Actions.setLoading(false))
  } catch (e) {
    if (searchCodeError(e.message) === '401') {
      yield put({ type: 'LOGOUT' })
      yield put(Actions.setLoading(false))
    } else {
      yield put(Actions.setLoading(false))
      message.error('Failed to load invoices')
    }
  }
}

function* createNewInvoiceSaga({ payload }) {
  const { token, description, total, amount, invoiceInfo } = payload
  yield put(Actions.setLoading(true))
  try {
    const response = yield call(addInvoice, token, description, total, amount)
    const { invoiceId } = response.data
    yield call(addItemToInvoice, { payload: { token, activeInvoiceId: invoiceId, invoiceInfo } })
    yield put(Actions.setNewInvoice(response.data))
    yield put(Actions.setLoading(false))
    message.success('Invoice has been successfully created')
  } catch (e) {
    message.error('Failed to create new invoice')
    yield put(Actions.setLoading(false))
  }
}

function* deleteInvoiceSaga({ payload }) {
  const { token, invoiceId } = payload
  yield put(Actions.setLoading(true))
  try {
    yield call(deleteInvoice, token, invoiceId)
    const response = yield call(getInvoices, token)
    yield put(Actions.setInvoices(response.data))
    yield put(Actions.setLoading(false))
    message.success('Invoice has been successfully deleted')
  } catch (e) {
    message.error('Failed to delete invoice. Please, try again!')
    yield put(Actions.setLoading(false))
  }
}

function* addItemToInvoice({ payload }) {
  const { token, activeInvoiceId, invoiceInfo } = payload
  yield put(CartActions.setLoading(true))
  try {
    const response = yield call(addItem, token, activeInvoiceId, invoiceInfo)
    yield put(Actions.addItemOfInvoice(response.data))
    yield put(Actions.setActiveInvoice(response.data))
    yield put(CartActions.setLoading(false))
  } catch (e) {
    if (searchCodeError(e.message) === '401') yield put({ type: 'LOGOUT' })
    yield put(CartActions.setLoading(false))
    message.error('Failed to create item. Please, try again!')
  }
}

function* updateItemSaga({ payload }) {
  const { token, item } = payload
  try {
    const response = yield call(updateItem, token, item)
    yield put(Actions.saveUpdatedItem(response.data))
  } catch (e) {
    message.error('Failed to update the item. Please, try again!')
  }
}

function* deleteItemSaga({ payload }) {
  const { token, itemId, invoiceId } = payload
  yield put(Actions.setLoading(true))
  try {
    yield call(deleteItem, token, itemId)
    const response = yield call(getOwnInvoiceById, invoiceId)
    yield put(Actions.setActiveInvoice(response.data))
    yield put(Actions.setLoading(false))
  } catch (e) {
    yield put(Actions.setLoading(false))
    message.error('Failed to delete item. Please, try again!')
  }
}
export function* rootSaga() {
  yield all([
    takeEvery(types.GET_INVOICES, getInvoicesSaga),
    takeEvery(types.CREATE_ITEM, addItemToInvoice),
    takeEvery(types.CREATE_NEW_INVOICE, createNewInvoiceSaga),
    takeEvery(types.UPDATE_ITEM, updateItemSaga),
    takeEvery(types.DELETE_ITEM, deleteItemSaga),
    takeEvery(types.DELETE_INVOICE, deleteInvoiceSaga),
  ])
}
