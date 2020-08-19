import { createInstance } from '../../api'

export const getAllOwnBalances = async token => {
  return createInstance(token).post('balances')
}
