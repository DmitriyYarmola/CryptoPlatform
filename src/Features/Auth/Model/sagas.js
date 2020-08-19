/* eslint-disable no-debugger */
import { call, takeEvery, all, put } from 'redux-saga/effects'
import { dispatchesUserData } from 'Lib/dispatchesUserData'
import { saveUserData } from 'Lib/saveUserData'
import { signIn } from 'API/rest/Auth'
import { NotificationActions } from 'pages/Notification'
import { getMerchants } from 'API/rest/Merchants'
import { addKey } from 'Lib/addKey'
import { push } from 'connected-react-router'
import { store as reduxStore, history } from 'Lib/Store'
import { authService } from '../../../API'
import { getNotifications } from '../../../API/rest/Notifications'

import { Actions } from './actions'
import * as types from './types'

function* loginSaga({ payload }) {
  const { username } = payload
  yield put(Actions.setLoading(true))
  try {
    const response = yield call(signIn, payload)
    const { accessToken, expiresIn, isAdmin } = response.data
    if (accessToken) {
      const responseMerchants = yield call(getMerchants, accessToken)
      const merchants = addKey(responseMerchants.data)
      yield put(Actions.setMerchants(merchants))
      saveUserData(reduxStore.dispatch, expiresIn, accessToken, username, isAdmin)
      authService.saveMmerchants(merchants)
      dispatchesUserData(reduxStore.dispatch, accessToken, username, isAdmin)
      const responseNotification = yield call(getNotifications, accessToken)
      yield put(NotificationActions.setNotifications(responseNotification.data))
      history.push('/balances')
    }
  } catch (error) {
    yield put(Actions.setInvalidCredentials(true))
    yield put(Actions.setLoading(false))
  }
}

function* logoutSaga() {
  authService.clearAuthData()
  yield put(push('/auth/login'))
  yield put(Actions.setLoading(true))
  yield put(Actions.setToken(null))
  yield put(Actions.setAuthenticated(false))
  yield put(Actions.setInvalidCredentials(false))
  yield put(Actions.setLoading(false))
}
function* onNotificationDetailsSaga({ payload }) {
  const responseDetails = yield call(getNotifications, payload)
  yield put({ type: types.SET_NOTIFICATION_DETAILS, payload: responseDetails.data })
}

export function* rootSaga() {
  yield all([
    takeEvery(types.ON_LOGIN, loginSaga),
    takeEvery(types.GET_NOTIFICATION_DETAILS, onNotificationDetailsSaga),
    takeEvery(types.LOGOUT, logoutSaga),
  ])
}
