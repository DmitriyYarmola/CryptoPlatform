import { createInstance } from '../../../../api'

export const addDeposit = (cryptotype, token, name, description) => {
  return createInstance(token).post(`balances/newDeposit`, {
    currency: cryptotype,
    name,
    description,
  })
}
