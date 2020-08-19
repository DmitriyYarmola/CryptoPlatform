import { createInstance } from 'API/api'

export const myVouchers = token => {
  return createInstance(token).get('/vouchers/my')
}
