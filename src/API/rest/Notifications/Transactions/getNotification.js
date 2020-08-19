import { createInstance } from '../../../api'

export const getNotification = id => {
  return createInstance().get('/notification/', { params: { id } })
}
