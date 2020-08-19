export const authService = {
  saveAuthData: (token, userName, expirationDate, isAdmin) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userName', userName)
    localStorage.setItem('isAdmin', isAdmin)
    localStorage.setItem('expiration', expirationDate)
  },

  saveAuthenticated: uthenticated => {
    localStorage.setItem('authenticated', JSON.stringify(uthenticated))
  },

  saveInvoice: (invoice, rate, rateUSD) => {
    localStorage.setItem('invoice', JSON.stringify(invoice))
    localStorage.setItem('rate', JSON.stringify(rate))
    localStorage.setItem('rateUSD', JSON.stringify(rateUSD))
  },
  saveMmerchants: merchants => {
    localStorage.setItem('merchants', JSON.stringify(merchants))
  },
  clearAuthData: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('expiration')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('merchants')
    localStorage.removeItem('authenticated')
  },
}
