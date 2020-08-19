import React, { Fragment } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { AuthSelectors, AuthActions } from 'Features/Auth'
import { dispatchesUserData } from 'Lib/dispatchesUserData'
import { PublicTemplate } from './Public'
import { AuthTemplate } from './Auth'
import { MainTemplate } from './Main'

const Layouts = {
  public: PublicTemplate,
  auth: AuthTemplate,
  main: MainTemplate,
  cart: MainTemplate,
  vouchers: MainTemplate,
  payment: MainTemplate,
}
export const Layout = ({ children }) => {
  const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const getLayout = () => {
    if (/^\/invoices\/cart(?=\/|$)/i.test(pathname)) return 'cart'
    if (/^\/vouchers(?=\/|$)/i.test(pathname)) return 'vouchers'
    if (/^\/payment-gateway(?=\/|$)/i.test(pathname)) return 'payment'
    if (/^\/auth(?=\/|$)/i.test(pathname)) return 'auth'
    if (pathname === '/') return 'public'
    return 'main'
  }

  const Container = Layouts[getLayout()]
  const isAuthLayout = getLayout() === 'auth'
  const isCartLayout = getLayout() === 'cart'
  const isVouchersLayout = getLayout() === 'vouchers'
  const isPaymentLayout = getLayout() === 'payment'
  const isPublicLayout = getLayout() === 'public'
  const BootstrappedLayout = () => {
    const jwt = localStorage.getItem('token')
    const userName = localStorage.getItem('userName')
    const merchants = localStorage.getItem('merchants')
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAuthLayout && !isAuthenticated) {
      if (!jwt) {
        if (isCartLayout || isVouchersLayout || isPaymentLayout || isPublicLayout)
          return <Container>{children}</Container>
        return <Redirect to="/auth/login" />
      }
      dispatchesUserData(dispatch, jwt, userName, isAdmin)
      dispatch(AuthActions.setMerchants(JSON.parse(merchants)))
    } else if (isAuthLayout && !isAuthenticated) {
      if (jwt) {
        return <Redirect to="/balances" />
      }
      return <Container>{children}</Container>
    }
    return <Container>{children}</Container>
  }

  return (
    <Fragment>
      <Helmet titleTemplate="Crypto Platform" title="Platform" />
      {BootstrappedLayout()}
    </Fragment>
  )
}
