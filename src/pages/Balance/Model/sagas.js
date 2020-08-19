/* eslint-disable no-unused-vars */
import { call, takeEvery, all, put } from 'redux-saga/effects'
import { message } from 'antd'
import { searchCodeError } from 'Lib/searchCodeError'
import { withdraw, addDeposit } from 'API/rest/Balances/Actions'
import { push } from 'connected-react-router'
import { getMerchants } from 'API/rest/Merchants'
import { AuthActions } from 'Features/Auth'
import { addKey } from 'Lib/addKey'
import { getAllOwnBalances, changeBalance } from '../../../API/rest/Balances'
import { getUserBalances } from '../../../API/rest/Balances/User'
import { Actions } from './actions'

import * as types from './types'

function* getBalanceSaga({ payload }) {
  const { token } = payload

  yield put(Actions.setLoading(true))
  try {
    const [response, responseMerchants] = yield all([
      call(getAllOwnBalances, token),
      call(getMerchants, token),
    ])
    const merchants = addKey(responseMerchants.data)
    yield put(Actions.setBalance(response.data))
    yield put(AuthActions.setMerchants(merchants))
    yield put(Actions.setLoading(false))
  } catch (e) {
    if (searchCodeError(e.message) === '401') {
      yield put({ type: 'LOGOUT' })
      yield put(Actions.setLoading(false))
    } else {
      yield put(Actions.setLoading(false))
      message.error('Failed to load balances. Please, refresh the page')
    }
  }
}

function* getBalanceOfUserSaga({ payload }) {
  const { user, token } = payload
  yield put(Actions.setLoading(true))
  try {
    const data = yield call(getUserBalances, user, token)
    yield put(Actions.setBalance(data))
    yield put(Actions.setActiveUser(user))
    yield put(Actions.setLoading(false))
  } catch (e) {
    if (searchCodeError(e.message) === '401') {
      yield put({ type: 'LOGOUT' })
      yield put(Actions.setLoading(false))
    } else {
      yield put(Actions.setLoading(false))
      message.error('Failed to load user balances. Please, refresh the page')
    }
  }
}

function* onGetQrCodeSaga({ payload }) {
  const { valuteType, token, name, description } = payload
  yield put(Actions.setLoading(true))
  try {
    const response = yield call(addDeposit, valuteType, token, name, description)
    console.log(response)
    yield put(Actions.setLoading(false))
    yield put(
      push({
        pathname: '/balances/newDeposit',
        state: { qrCodeInformation: response.data, valuteType },
      }),
    )
  } catch (e) {
    yield put(Actions.setLoading(false))
    message.error('Failed to create deposit!')
  }
}

function* onWithDrawBalance({ payload }) {
  const { valuteType, amount, address, token } = payload
  yield put(Actions.setLoading(true))
  try {
    const test = yield call(withdraw, valuteType, amount, address, token)
    const balanceDetails = yield call(getAllOwnBalances, token)
    yield put(Actions.setBalance(balanceDetails.data))
    yield put(Actions.setLoading(false))
    message.success('Withdraw is sucessful')
  } catch (error) {
    yield put(Actions.setLoading(false))
    message.error('Withdraw is unsuccessful')
  }
}

function* onChangeBalance({ payload }) {
  const { fsym, tsym, amount, price, token } = payload
  yield put(Actions.setLoading(true))
  console.log('payload', payload)
  try {
    yield call(changeBalance, token, { fsym, tsym, amount, price })
    const response = yield call(getAllOwnBalances, token)
    yield put(Actions.setBalance(response.data))
    yield put(Actions.setLoading(false))
    message.success('Exchange is sucessful')
  } catch (error) {
    yield put(Actions.setLoading(false))
    message.error('Exchange is unsuccessful')
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(types.GET_BALANCE, getBalanceSaga),
    takeEvery(types.GET_BALANCE_OF_USER, getBalanceOfUserSaga),
    takeEvery(types.GET_QR_CODE, onGetQrCodeSaga),
    takeEvery(types.WITH_DRAW_BALANCE, onWithDrawBalance),
    takeEvery(types.SEND_EXCHANGE, onChangeBalance),
  ])
}
