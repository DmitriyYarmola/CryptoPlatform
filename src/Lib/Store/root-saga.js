import { all } from 'redux-saga/effects'
import { PaymentRootSaga } from 'pages/Payment'
import { CartRootSaga } from 'pages/Invoices/Cart'
import { StepsRootSaga } from 'Features/Steps'
import { VouchersRootSaga } from 'pages/Vouchers'
import { AppRootSaga } from 'pages/AppModel'
import { TransactionRootSaga } from '../../pages/Transaction'
import { InvoicesRootSaga } from '../../pages/Invoices'
import { NotificationRootSaga } from '../../pages/Notification'
import { BalanceRootSaga } from '../../pages/Balance'
import { AuthRootSaga } from '../../Features/Auth'
import { UserRootSaga } from './user'
import { MenuRootSaga } from './menu'
import { SettingsRootSaga } from './settings'

export function* rootSaga() {
  yield all([
    AppRootSaga(),
    AuthRootSaga(),
    BalanceRootSaga(),
    TransactionRootSaga(),
    NotificationRootSaga(),
    UserRootSaga(),
    SettingsRootSaga(),
    MenuRootSaga(),
    PaymentRootSaga(),
    CartRootSaga(),
    StepsRootSaga(),
    InvoicesRootSaga(),
    VouchersRootSaga(),
  ])
}
