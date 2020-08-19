import { AuthActions } from 'Features/Auth'
import { BalanceActions } from 'pages/Balance'
import { TransactionActions } from 'pages/Transaction'
import { AppActions } from 'pages/AppModel'
import { UserActions } from './Store'

export const dispatchesUserData = (dispatch, jwt, userName, isAdmin) => {
  dispatch(AuthActions.setToken(jwt))
  dispatch(
    UserActions.setState({
      id: '',
      name: userName,
      role: isAdmin ? 'admin' : '',
      email: '',
      avatar: '',
      authorized: true,
      isAdmin,
    }),
  )
  dispatch(BalanceActions.setActiveUser(userName))
  dispatch(TransactionActions.setActiveUser(userName))
  dispatch(AppActions.addUser(userName))
  dispatch(AuthActions.setAuthenticated(true))
}
