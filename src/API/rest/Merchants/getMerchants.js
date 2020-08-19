import { createInstance } from 'API/api'

export const getMerchants = token => {
  return createInstance(token).get('/merchants')
}
