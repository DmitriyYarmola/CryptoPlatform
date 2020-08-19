import { createInstance } from 'API/api'

export const addInvoice = (token, description, total, amount) => {
  return createInstance(token).post('/invoices', { description, total, amount })
}
