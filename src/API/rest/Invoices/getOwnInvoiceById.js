import { createInstance } from 'API/api'

export const getOwnInvoiceById = invoiceId => {
  return createInstance().get(`/invoices/${invoiceId}`)
}
