/* eslint-disable no-unused-vars */
import { call, takeEvery, all, put } from 'redux-saga/effects'
import { message } from 'antd'
import { searchCodeError } from 'Lib/searchCodeError'
import {
  getVouchers,
  addVoucher,
  deleteVoucher,
  buyVoucher,
  editVoucher,
  myVouchers,
} from 'API/rest/Vauchers'
import { push } from 'react-router-redux'
import { addKey } from 'Lib/addKey'
import { Actions } from './actions'
import * as types from './types'

function* getVouchersSaga({ payload }) {
  const { isAuthenticated, token } = payload
  yield put(Actions.setLoading(true))
  try {
    let response
    if (isAuthenticated) response = yield call(myVouchers, token)
    else response = yield call(getVouchers)
    const vouchers = addKey(response.data)
    yield put(Actions.setVouchers(vouchers))
    yield put(Actions.setLoading(false))
  } catch (e) {
    if (searchCodeError(e.message) === '401') {
      yield put({ type: 'LOGOUT' })
      yield put(Actions.setLoading(false))
    } else {
      yield put(Actions.setLoading(false))
      message.error('Failed to load vaunchers. Please, refresh the page')
    }
  }
}

function* createNewVoucherSaga({ payload }) {
  const { token, formData } = payload
  yield put(Actions.setLoading(true))
  try {
    const response = yield call(addVoucher, token, formData)
    const vouchers = response.data
    console.log(vouchers)
    yield put(Actions.setNewVoucher(vouchers))
    yield put(Actions.setLoading(false))
    message.success('Voucher has been successfully created')
  } catch (e) {
    if (searchCodeError(e.message) === '401') yield put({ type: 'LOGOUT' })
    else message.error('Failed to create new voucher')
  }
}

function* deleteVoucherSaga({ payload }) {
  const { token, voucherId } = payload
  yield put(Actions.setLoading(true))
  try {
    const responsetes = yield call(deleteVoucher, token, voucherId)
    console.log(responsetes)
    const response = yield call(getVouchers, token)
    yield put(Actions.setVauchers(response.data))
    yield put(Actions.setLoading(false))
    message.success('Voucher has been successfully deleted')
  } catch (e) {
    message.error('Failed to delete voucher. Please, try again!')
    yield put(Actions.setLoading(false))
  }
}
function* editVoucherSaga({ payload }) {
  const { token, price, currency, description } = payload
  yield put(Actions.setLoading(true))
  try {
    const responsetes = yield call(editVoucher, token, price, currency, description)
    const response = yield call(getVouchers, token)
    const vouchers = addKey(response.data)
    yield put(Actions.setVauchers(response.data))
    yield put(Actions.setLoading(false))
  } catch (e) {
    message.error('Failed to edit voucher. Please, try again!')
    yield put(Actions.setLoading(false))
  }
}
function* buyVoucherSaga({ payload }) {
  const { voucherId } = payload
  yield put(Actions.setLoading(true))
  try {
    const response = yield call(buyVoucher, voucherId)
    const string = response.data
    const index = string.indexOf('invoices/')
    const queryString = string.slice(index)
    yield put(Actions.setLoading(false))
    yield put(push(queryString))
  } catch (e) {
    message.error('Failed to buy voucher. Please, try again!')
    yield put(Actions.setLoading(false))
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(types.GET_VOUCHERS, getVouchersSaga),
    takeEvery(types.CREATE_NEW_VOUCHER, createNewVoucherSaga),
    takeEvery(types.DELETE_VOUCHER, deleteVoucherSaga),
    takeEvery(types.EDIT_VOUCHER, editVoucherSaga),
    takeEvery(types.BUY_VOUCHER, buyVoucherSaga),
  ])
}
