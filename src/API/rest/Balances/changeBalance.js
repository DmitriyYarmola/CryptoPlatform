import { createInstance } from 'API/api'

export const changeBalance = (token, sendData) => {
  return createInstance(token).post('/balances/change', sendData)
}
