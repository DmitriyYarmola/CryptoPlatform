/* eslint-disable no-unused-vars */
import { call, takeEvery, all, put } from 'redux-saga/effects'
import { message } from 'antd'
import { Actions } from './actions'

import * as types from './types'

export function* rootSaga() {
  yield all([
    // takeEvery(types.GET_BALANCE, getBalanceSaga),
    // takeEvery(types.GET_BALANCE_OF_USER, getBalanceOfUserSaga),
  ])
}
