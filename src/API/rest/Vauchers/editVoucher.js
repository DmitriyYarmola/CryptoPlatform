import { createInstance } from 'API/api'

export const editVoucher = (token, price, currency, description) => {
  return createInstance(token).post('/vouchers', { price, currency, description })
}
