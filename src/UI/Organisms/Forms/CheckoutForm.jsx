import React from 'react'
import { Input, Form } from 'antd'

export const CheckoutForm = ({ onGetAddress, onGetName, onGetEmail, onGetCity, initialValues }) => {
  const getAddress = e => {
    const address = e.target.value
    onGetAddress({ address })
  }

  const getName = e => {
    const name = e.target.value
    onGetName({ name })
  }

  const getEmail = e => {
    const email = e.target.value
    onGetEmail({ email })
  }

  const getCity = e => {
    const city = e.target.value
    onGetCity({ city })
  }

  return (
    <Form initialValues={initialValues}>
      <h4 className="text-black mb-3">
        <strong>Shipment Details</strong>
      </h4>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your Name!' }]}
            >
              <Input id="checkout-name" placeholder="Name" onChange={getName} />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input id="checkout-email" placeholder="Email" onChange={getEmail} />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="form-group">
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: 'Please input your City!' }]}
        >
          <Input id="checkout-city" placeholder="City" onChange={getCity} />
        </Form.Item>
      </div>
      <div className="form-group">
        <Form.Item label="Adress" rules={[{ message: 'Please input your Adress!' }]} name="address">
          <Input id="checkout-adress" placeholder="Adress" className="mb-3" onChange={getAddress} />
        </Form.Item>
      </div>
    </Form>
  )
}
