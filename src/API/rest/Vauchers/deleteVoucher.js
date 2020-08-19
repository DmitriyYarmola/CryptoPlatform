import { createInstance } from '../../api'

export const deleteVoucher = (token, voucherId) => {
  return createInstance(token).delete(`/vouchers/${voucherId}`)
}
