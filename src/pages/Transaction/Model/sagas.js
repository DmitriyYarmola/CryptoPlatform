/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import { all, takeEvery, call, put } from 'redux-saga/effects'
import moment from 'moment'
import { message } from 'antd'
import { dateParser } from 'Lib/dateParser'
import { searchCodeError } from 'Lib/searchCodeError'
import { getTransactions } from '../../../API/rest/Transactions'
import { getUserTransactions } from '../../../API/rest/Transactions/User'

import { Actions } from './actions'

import * as types from './types'

function* getTransactionSaga({ payload }) {
  const { token, transactionCount, username } = payload
  yield put(Actions.setLoading(true))
  try {
    const transactionDetails = yield call(getTransactions, token, username)
    const transactionData = transactionDetails.data
    transactionData.forEach((element, index) => {
      element.no = index + 1 + (transactionCount?.no || 0)
      element.key = index + 1 + (transactionCount?.no || 0)
      if (element.timestamp) element.timestamp = dateParser(element.timestamp)
    })
    console.log('transa', transactionData)
    yield put(Actions.setTransaction(transactionData))
    yield put(Actions.setLoading(false))
  } catch (e) {
    if (searchCodeError(e.message) === '401') {
      yield put({ type: 'LOGOUT' })
      yield put(Actions.setLoading(false))
    } else {
      yield put(Actions.setLoading(false))
      message.error('Failed to load trasactions')
    }
  }
}

function* getUserTransactionsSaga({ payload }) {
  const { userName, token } = payload
  console.log('payload', payload)
  yield put(Actions.setLoading(true))
  try {
    const transactionDetails = yield call(getTransactions, token, userName)
    const transactionData = transactionDetails.data
    transactionData.forEach((element, index) => {
      element.key = index + 1
      if (element.timestamp) element.timestamp = dateParser(element.timestamp)
    })
    yield put(Actions.setUserTransactions(transactionData))
    yield put(Actions.setLoading(false))
  } catch (e) {
    console.log('e', e)
    if (searchCodeError(e.message) === '401') {
      yield put({ type: 'LOGOUT' })
      yield put(Actions.setLoading(false))
    } else {
      yield put(Actions.setLoading(false))
      message.error('Error in loading Data. Please Try again')
    }
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(types.GET_TRANSACTION, getTransactionSaga),
    takeEvery(types.GET_USER_TRANSACTIONS, getUserTransactionsSaga),
  ])
}
