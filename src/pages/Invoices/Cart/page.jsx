/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react'
import { Steps, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCartOutlined, TagsOutlined, CreditCardOutlined } from '@ant-design/icons'
import { ShipmentPaymentStep, ConfirmationStep, CartStep, StepsSelectors } from 'Features/Steps'
import { Preloader } from 'UI/Atoms'
import { useParams, useHistory } from 'react-router-dom'
import styles from './style.module.sass'
import { CartActions, CartSelectors } from './Model'

const { Step } = Steps

let grandTotal = 0
const Cart = () => {
  const invoiceById = useSelector(CartSelectors.invoiceById)
  const isLoading = useSelector(CartSelectors.isLoading)
  const name = useSelector(StepsSelectors.name)
  const email = useSelector(StepsSelectors.email)
  const city = useSelector(StepsSelectors.city)
  let current = useSelector(CartSelectors.current)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  console.log('para', params)
  useEffect(() => {
    if (params.invoiceId) {
      dispatch({ type: 'GET_OWN_INVOICE_BY_ID', payload: { invoiceId: params.invoiceId } })
    }
  }, [dispatch, history, params.invoiceId])

  useEffect(() => {
    dispatch({ type: 'SET_CART_OPEN', payload: true })
    return () => {
      dispatch(CartActions.setOwnInvoiceById({}))
      dispatch({ type: 'SET_CART_OPEN', payload: false })
      dispatch(CartActions.setCurrent(0))
    }
  }, [dispatch])

  const renderTotalAmount = () => {
    let total = 0
    if (invoiceById.items) {
      invoiceById.items.forEach(row => {
        total += Number(row.price) * Number(row.amount)
      })
      grandTotal = total
    }
    return total
  }

  const next = () => {
    current += 1
    dispatch(CartActions.setCurrent(current))
  }

  const prev = () => {
    current -= 1
    dispatch(CartActions.setCurrent(current))
  }

  const renderDisable = () => {
    let boolValue = true
    if (current === 1) {
      if (value && city && email && name) {
        boolValue = false
      }
    } else {
      boolValue = false
    }
    return boolValue
  }

  console.log('invoice', invoiceById)

  const steps = [
    {
      title: 'Cart',
      icon: <ShoppingCartOutlined style={{ fontSize: 40 }} />,
      content: (
        <CartStep
          invoiceById={invoiceById}
          idInvoiceById={invoiceById.invoiceId}
          renderTotalAmount={renderTotalAmount}
        />
      ),
    },
    {
      title: 'Shipment and Payment',
      icon: <TagsOutlined style={{ fontSize: 40 }} />,
      content: <ShipmentPaymentStep value={value} setValue={setValue} />,
    },
    {
      title: 'Confirmation',
      icon: <CreditCardOutlined tyle={{ fontSize: 40 }} />,
      content: (
        <ConfirmationStep
          grandTotal={grandTotal}
          paymentMethodValue={value}
          invoiceById={invoiceById}
        />
      ),
    },
  ]
  return isLoading ? (
    <Preloader />
  ) : (
    <div>
      <Helmet title="Cart" />
      <div className="card">
        <div className="card-body">
          <div className="cart">
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} icon={item.icon} />
              ))}
            </Steps>
            <div className={styles.stepsContent}>{steps[current].content}</div>
            <div className={`${styles.stepsAction} text-center`}>
              {current > 0 && (
                <Button style={{ marginRight: 8 }} onClick={prev}>
                  Previous
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button disabled={renderDisable()} type="primary" onClick={next}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
