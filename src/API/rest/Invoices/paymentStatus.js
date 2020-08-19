import { createInstance } from 'API/api'

export const paymentStatus = invoiceId => {
  return createInstance().get(`/invoices/paymentStatus/${invoiceId}`)
}
