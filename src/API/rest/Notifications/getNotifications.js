import { createInstance } from '../../api'

export const getNotifications = token => {
  return createInstance(token).get('/blockchain-api/notifications')
}
