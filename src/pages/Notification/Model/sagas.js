import { all, takeEvery, call, put } from 'redux-saga/effects'
import { message } from 'antd'
import { dateParser } from 'Lib/dateParser'
import { searchCodeError } from 'Lib/searchCodeError'
import { getNotifications } from '../../../API/rest/Notifications'
import { Actions } from './actions'
import * as types from './types'

function* getNotificationSaga({ payload }) {
  const { token } = payload
  const response = yield call(getNotifications, token)
  const notificationsData = response.data
  try {
    if (notificationsData) {
      notificationsData.forEach((element, index) => {
        element.key = index + 1
        if (element.timestamp) element.timestamp = dateParser(element.timestamp)
      })
      yield put(Actions.setNotifications(notificationsData))
    } else {
      yield put(Actions.setLoading(false))
      yield put(Actions.setNotFound(true))
      message.warning('Notification not found')
    }
  } catch (e) {
    if (searchCodeError(e.message) === '401') {
      yield put({ type: 'LOGOUT' })
    } else {
      message.error('Failed to load notifications')
    }
  }
}

export function* rootSaga() {
  yield all([takeEvery(types.GET_NOTIFICATIONS, getNotificationSaga)])
}
