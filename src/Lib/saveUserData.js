import { authService } from 'API'

export const saveUserData = (dispatch, expiresIn, accessToken, userName, isAdmin) => {
  setTimeout(() => {
    dispatch({ type: 'LOGOUT' })
  }, expiresIn * 3600)
  const now = new Date()
  const expirationDate = new Date(now.getTime() + expiresIn * 1000).toLocaleString()
  authService.saveAuthData(accessToken, userName, expirationDate, isAdmin)
}
