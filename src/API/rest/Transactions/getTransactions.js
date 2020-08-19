import { createInstance } from '../../api'

export const getTransactions = async (token, username) => {
  console.log(token, username)
  return createInstance(token).post('/transactions', { username })
}
