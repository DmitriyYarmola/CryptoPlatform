import { createInstance } from 'API/api'

export const buyVoucher = voucherId => {
  console.log(voucherId)
  return createInstance().post('/vouchers/buy', { voucherId })
}
