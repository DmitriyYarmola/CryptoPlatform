import axios from 'axios'

export const createInstance = token => {
  const headers = {
    'Content-Type': 'application/json',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  return axios.create({
    baseURL: 'https://payments.bitlauda.com/api/',
    headers: { ...headers },
  })
}
