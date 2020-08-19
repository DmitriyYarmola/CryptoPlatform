import { createInstance } from '../../api'

export const deletAllNotification = async token => {
  return createInstance(token).post('deleteAllNotifications')
}
