/* eslint-disable no-unused-vars */
import { call, takeEvery, all, put } from 'redux-saga/effects'
// import { createNewAccount, getTransactionNotification } from '../../../API'
import { paymentStatus } from 'API/rest/Invoices'
import { Actions } from './actions'

import * as types from './types'

function* getPaymentStatusSaga({ payload }) {
  const { invoiceId } = payload
  const response = yield call(paymentStatus, invoiceId)
  yield put(Actions.setTransactions(response.data))
}

export function* rootSaga() {
  yield all([takeEvery(types.GET_PAYMENT_STATUS, getPaymentStatusSaga)])
}
