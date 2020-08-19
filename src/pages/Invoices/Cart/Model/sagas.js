/* eslint-disable no-unused-vars */
import { call, takeEvery, all, put } from 'redux-saga/effects'
import { message } from 'antd'
import { addItemToInvoicesItems, authService } from 'API'
import { InvoicesActions } from 'pages/Invoices'
import { getOwnInvoiceById } from 'API/rest/Invoices'
import { searchCodeError } from 'Lib/searchCodeError'
import { getRateByPair, getRateByPairUSD } from 'API/rest/Rate'
import { addKey } from 'Lib/addKey'
import { Actions } from './actions'

import * as types from './types'

function* getInvoiceByIdSaga({ payload }) {
  const { invoiceId } = payload
  yield put(Actions.setLoading(true))
  try {
    const [responseInvoice, resonseRate, responseRteUSD] = yield all([
      call(getOwnInvoiceById, invoiceId),
      call(getRateByPair),
      call(getRateByPairUSD),
    ])
    console.log('3', responseRteUSD)
    const invoiceById = addKey(responseInvoice.data.items)
    const formatedInvoice = { ...responseInvoice.data, items: invoiceById }
    authService.saveInvoice(responseInvoice.data, resonseRate.data, responseRteUSD.data)
    console.log('invocieDddd', responseInvoice)
    // console.log("test", invoiceById)
    yield put(Actions.setOwnInvoiceById(formatedInvoice))
    yield put(Actions.setRate(resonseRate.data))
    yield put(Actions.setRateUSD(responseRteUSD.data))
    yield put(Actions.setLoading(false))
  } catch (e) {
    yield put(Actions.setLoading(false))
    message.error('Error in loading Data. Please Try again')
  }
}
export function* rootSaga() {
  yield all([takeEvery(types.GET_OWN_INVOICE_BY_ID, getInvoiceByIdSaga)])
}
