import { createInstance } from 'API/api'

export const addItem = async (token, invoiceId, itemInfo) => {
  return createInstance(token).post(`/invoices/${invoiceId}`, itemInfo)
}
