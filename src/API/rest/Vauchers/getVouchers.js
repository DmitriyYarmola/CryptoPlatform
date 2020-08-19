import { createInstance } from 'API/api'

export const getVouchers = () => {
  return createInstance().get('/vouchers')
}
