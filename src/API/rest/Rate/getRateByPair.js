import { createInstance } from 'API/api'

export const getRateByPair = () => {
  return createInstance().get('/rate/USD/ETH')
}

export const getRateByPairUSD = () => {
  return createInstance().get('/rate/ETH/USD')
}
