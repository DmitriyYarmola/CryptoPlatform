import { createInstance } from '../../../api'

export const getUserBalances = async (user, token) => {
  return createInstance(token).post('/public/balance', { user })
}
