import { createInstance } from 'API/api'

export const getUserTransactions = (token, username) => {
  console.log('username', username)
  return createInstance(token).post(`/transactions`, { username })
}
