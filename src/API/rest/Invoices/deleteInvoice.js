import { createInstance } from 'API/api'

export const deleteInvoice = (token, invoiceId) => {
  return createInstance(token).delete(`/invoices/${invoiceId}`)
}
