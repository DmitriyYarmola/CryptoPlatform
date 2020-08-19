import { createInstance } from 'API/api'

export const getAllRates = () => {
  return createInstance().get('/rate')
}
