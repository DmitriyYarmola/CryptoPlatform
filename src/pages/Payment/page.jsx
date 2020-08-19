/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { Button, Result } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Preloader } from 'UI/Atoms'
import { PaymentDetails } from 'UI/Organisms'
import { CartSelectors, CartActions } from 'pages/Invoices/Cart'
import { PaymentSelectors } from './Model'

const Payment = () => {
  const transactions = useSelector(PaymentSelectors.transactions)
  const isLoading = useSelector(PaymentSelectors.isLoading)
  const showResult = useSelector(PaymentSelectors.showResult)
  const rate = useSelector(CartSelectors.rate)
  const rateUSD = useSelector(CartSelectors.rateUSD)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    dispatch({ type: 'SET_CART_OPEN', payload: true })
    return () => {
      dispatch({ type: 'SET_CART_OPEN', payload: false })
    }
  }, [dispatch])

  useEffect(() => {
    const ownInvoice = localStorage.getItem('invoice')
    let interval
    if (ownInvoice && location.state) {
      dispatch({ type: 'GET_PAYMENT_STATUS', payload: { invoiceId: location.state.invoiceId } })
      interval = setInterval(() => {
        dispatch({ type: 'GET_PAYMENT_STATUS', payload: { invoiceId: location.state.invoiceId } })
      }, 15000)
    }
    return () => clearInterval(interval)
  }, [dispatch, location, location.state])

  useEffect(() => {
    const ownInvoice = localStorage.getItem('invoice')
    const localRate = localStorage.getItem('rate')
    const localRateUSD = localStorage.getItem('rateUSD')
    dispatch(CartActions.setRate(JSON.parse(localRate)))
    dispatch(CartActions.setRateUSD(JSON.parse(localRateUSD)))
    if (ownInvoice && !location.state) {
      console.log('dada')
      const ownInvoiceParse = JSON.parse(ownInvoice)
      history.push({ pathname: `/invoices/cart/${ownInvoiceParse.invoiceId}` })
    }
  }, [dispatch, history, location.state])

  console.log('rate', rate)
  useEffect(() => {
    return () => dispatch({ type: 'SET_CART_OPEN', payload: false })
  }, [dispatch])

  const showsuccessResult = () => {
    dispatch({ type: 'SHOW_RESULT', payload: true })
  }

  const goCartPage = () => {
    history.push({ pathname: '/vouchers' })
  }

  if (!location.state) return <Preloader />
  return isLoading ? (
    <Preloader />
  ) : showResult ? (
    <Result
      status="success"
      title="Successfully Purchased!"
      subTitle="Order has been successfully placed."
      extra={[
        <Button type="primary" key="console" onClick={goCartPage}>
          Go To Cart
        </Button>,
      ]}
    />
  ) : (
    <PaymentDetails
      address={location?.state.orderId}
      amount={location.state.amount}
      convertionRate={rate?.rate}
      rateUSD={rateUSD?.rate}
      showsuccessResult={showsuccessResult}
      transactions={transactions}
    />
  )
}

export default Payment
