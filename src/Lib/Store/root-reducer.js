import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { NotificationReducer } from '../../pages/Notification'
import { BalanceReducer } from '../../pages/Balance'
import { TransactionReducer } from '../../pages/Transaction'
import { AppReducer } from '../../pages/AppModel'
import { InvoicesReducer } from '../../pages/Invoices'
import { VouchersReducer } from '../../pages/Vouchers'
import { PaymentReducer } from '../../pages/Payment'
import { CartReducer } from '../../pages/Invoices/Cart'
import { AuthReducer } from '../../Features/Auth'
import { StepsReducer } from '../../Features/Steps'
import { MenuReducer } from './menu'
import { UserReducer } from './user'
import { SettingsReducer } from './settings'

export const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    AuthReducer,
    BalanceReducer,
    TransactionReducer,
    NotificationReducer,
    AppReducer,
    MenuReducer,
    UserReducer,
    SettingsReducer,
    PaymentReducer,
    CartReducer,
    StepsReducer,
    InvoicesReducer,
    VouchersReducer,
  })
