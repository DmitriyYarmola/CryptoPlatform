import { lazy } from 'react'

export const routes = [
  // Mine pages
  {
    path: '/auth/login',
    Component: lazy(() => import('pages/Login/page')),
    exact: true,
  },
  {
    path: '/balances',
    Component: lazy(() => import('pages/Balance/page')),
    exact: false,
  },
  {
    path: '/notification',
    Component: lazy(() => import('pages/Notification/page')),
    exact: true,
  },
  {
    path: '/transaction',
    Component: lazy(() => import('pages/Transaction/page')),
    exact: true,
  },
  {
    path: '/payment-gateway',
    Component: lazy(() => import('pages/Payment/page')),
    exact: true,
  },
  {
    path: '/invoices/cart/:invoiceId',
    Component: lazy(() => import('pages/Invoices/Cart/page')),
    exact: true,
  },
  {
    path: '/invoices',
    Component: lazy(() => import('pages/Invoices/page')),
    exact: true,
  },
  {
    path: '/invoices/create',
    Component: lazy(() => import('pages/Invoices/Create/page')),
    exact: true,
  },
  {
    path: '/invoices/edit', 
    Component: lazy(() => import('pages/Invoices/Edit/page')),
    exact: true,
  },
  {
    path: '/vouchers',
    Component: lazy(() => import('pages/Vouchers/page')),
    exact: false,
  },
  // Errors
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/components/auth/404')),
    exact: true,
  }
]

export const modalRoutes = [
  {
    path: '/balances/withdraw',
    Component: lazy(() => import('pages/Balance/Molecules/Withdraw')),
    exact: false,
  },
  {
    path: '/balances/newDeposit',
    Component: lazy(() => import('pages/Balance/Molecules/NewDeposit')),
    exact: false,
  },
  {
    path: '/balances/channelName',
    Component: lazy(() => import('pages/Balance/Molecules/ChannelName')),
    exact: false,
  },
  {
    path: '/balances/exchange',
    Component: lazy(() => import('pages/Balance/Molecules/Exchange')),
    exact: false,
  },
  {
    path: '/vouchers/create',
    Component: lazy(() => import('pages/Vouchers/Molecules/Create')),
    exact: false,
  },
]
