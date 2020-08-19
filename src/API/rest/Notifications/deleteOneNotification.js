import { createInstance } from '../../api'

export const deleteOneNotification = (notifyId, token) => {
  return createInstance(token).post('deleteNotification', { notificationId: notifyId })
}
