/* eslint-disable no-shadow */
import React from 'react'
import { Radio } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { CheckoutForm } from '../../UI/Organisms/Forms'
import { StepsSelectors, StepsActions } from './Model'

export const ShipmentPaymentStep = ({ value, setValue }) => {
  const dispatch = useDispatch()
  const name = useSelector(StepsSelectors.name)
  const email = useSelector(StepsSelectors.email)
  const city = useSelector(StepsSelectors.city)
  const address = useSelector(StepsSelectors.address)

  const saveAddress = address => {
    dispatch(StepsActions.setAddress(address.address))
  }

  const saveName = name => {
    dispatch(StepsActions.setName(name.name))
  }

  const saveEmail = email => {
    dispatch(StepsActions.setEmail(email.email))
  }

  const saveCity = city => {
    dispatch(StepsActions.setCity(city.city))
  }

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }

  const onChangePaymentOption = e => {
    setValue(e.target.value)
  }

  const initialValues = {
    name,
    email,
    city,
    address,
  }
  console.log('initial', initialValues)
  return (
    <div className="row">
      <div className="col-md-8">
        <CheckoutForm
          onGetAddress={saveAddress}
          onGetName={saveName}
          onGetEmail={saveEmail}
          onGetCity={saveCity}
          initialValues={initialValues}
        />
      </div>
      <div className="col-md-8">
        <h4 className="text-black mb-3">
          <strong>Payment Options</strong>
        </h4>
        <div>
          <Radio.Group onChange={onChangePaymentOption} value={value}>
            <Radio style={radioStyle} value={1}>
              Crypto Currency
            </Radio>
            <Radio style={radioStyle} value={2}>
              Debit or Credit Card
            </Radio>
            <Radio style={radioStyle} value={3}>
              Net Banking
            </Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  )
}
