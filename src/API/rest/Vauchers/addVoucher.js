import { createInstance } from 'API/api'

export const addVoucher = (token, formData) => {
  return createInstance(token).post('/vouchers', formData)
}
