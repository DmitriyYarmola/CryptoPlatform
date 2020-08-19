import { createInstance } from '../../../api'

export const deleteUserAllNotification = (user, token) => {
  return createInstance(token).post('/public/deleteAllNotifications', { user })
}
