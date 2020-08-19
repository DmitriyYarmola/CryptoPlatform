/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Result, Table, Button } from 'antd'
import { StepsSelectors } from './Model'
import invoiceData from './data.json'

export const ConfirmationStep = ({ grandTotal, paymentMethodValue, invoiceById }) => {
  const email = useSelector(StepsSelectors.email)
  const name = useSelector(StepsSelectors.name)
  const city = useSelector(StepsSelectors.city)
  const address = useSelector(StepsSelectors.address)
  const [showNotFound, setShowNotFound] = useState(false)
  const history = useHistory()

  const goToPaymentGateway = () => {
    if (paymentMethodValue === 1) {
      const orderId = invoiceById.ethAddress
      history.push({
        pathname: '/payment-gateway',
        state: { amount: grandTotal, orderId, invoiceId: invoiceById.invoiceId },
      })
    } else {
      setShowNotFound(true)
    }
  }

  if (showNotFound) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist. Please use only Crypto Currency payment option"
      />
    )
  }
  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Unit Cost',
      dataIndex: 'price',
      render: price => <span>{price}$</span>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (text, record) => <span>{record.amount * record.price}$</span>,
    },
  ]

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h4 className="text-black mb-3">
            <strong>{invoiceData.invoiceData.senderName}</strong>
            <br />
            <br />
            <img
              className="mr-2"
              src={invoiceData.invoiceData.senderLogo}
              height="100"
              alt="Amazon"
            />
          </h4>
          <address>
            {invoiceData.invoiceData.senderAdress}
            <br />
            <abbr className="mr-2" title="Mail">
              E-mail:
            </abbr>
            {invoiceData.invoiceData.senderEmail}
            <br />
            <abbr className="mr-2" title="Phone">
              Phone:
            </abbr>
            {invoiceData.invoiceData.senderPhone}
            <br />
            <abbr className="mr-2" title="Fax">
              Fax:
            </abbr>
            {invoiceData.invoiceData.senderFax}
            <br />
            <br />
          </address>
        </div>
        <div className="col-md-6 text-right">
          <h4 className="text-black mb-3">
            <strong>Invoice Info</strong>
          </h4>
          <p>
            <a className="font-size-20">{invoiceData.invoiceData.invoiceNumber}</a>
            <br />
            <span className="font-size-20">{name}</span>
          </p>
          <address>
            {address}
            {city}
            <br />
          </address>
          <span>{`Invoice Date: ${today}`} </span>
          <br />
          <br />
        </div>
      </div>
      <Table
        className="utils__scrollTable"
        scroll={{ x: '100%' }}
        columns={columns}
        dataSource={invoiceById.items}
        pagination={false}
      />
      <div className="text-right clearfix mt-5">
        <div className="pull-right">
          <p>
            <strong>
              Grand Total: $<span>{grandTotal.toFixed(2)}</span>
            </strong>
          </p>
          <br />
        </div>
      </div>
      <div className="text-right">
        <Button className="mr-2" type="primary" onClick={goToPaymentGateway}>
          Proceed to payment
        </Button>
      </div>
    </div>
  )
}
