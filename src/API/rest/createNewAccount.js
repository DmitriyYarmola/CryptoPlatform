import { createInstance } from 'API/api'

export const createNewAccount = id => {
  return createInstance().get('/newAccount', { params: { id } })
}
