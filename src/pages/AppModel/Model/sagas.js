import { call, takeEvery, put, all } from 'redux-saga/effects'
import { getAllRates } from 'API/rest/Rate'
import { Actions } from './actions'
import * as types from './types'

function* getAllRatesSaga() {
  const response = yield call(getAllRates)
  yield put(Actions.setRates(response.data))
}

export function* rootSaga() {
  yield all([takeEvery(types.GET_ALL_RATES, getAllRatesSaga)])
}
