import { createInstance } from 'API/api'

export const getInvoices = async token => {
  return createInstance(token).get('/invoices')
}
