import { createInstance } from '../../../../api'

export const withdraw = (cryptotype, amount, address, token) => {
  return createInstance(token).post(`/balances/withdraw`, {
    currency: cryptotype,
    amount,
    address,
  })
}
