import React from 'react'
import styled from 'styled-components'
import { Form, Input, Button, Select } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'

const { Option } = Select

const Wrapped = styled.div`
  text-align: center;
  width: 350px;
  background: rgba(255, 255, 255, 1);
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
`

const H2 = styled.h2`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 15px;
`

const PositionWrapped = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`

const ButtonsWrapped = styled.div``

export const CreateVoucher = ({ onCreate, onCancel }) => {
  const intl = useIntl()
  const placeholderDescription = intl.formatMessage({ id: 'voucher.input.description' })
  const placeholderPrice = intl.formatMessage({ id: 'voucher.input.price' })
  const placeholderCurrency = intl.formatMessage({ id: 'voucher.input.currency' })
  return (
    <PositionWrapped>
      <Wrapped>
        <H2>Create Voucher</H2>
        <Form name="basic" initialValues={{ remember: true }} onFinish={onCreate}>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input placeholder={placeholderDescription} />
          </Form.Item>
          <Form.Item name="price" rules={[{ required: true, message: 'Please input price!' }]}>
            <Input placeholder={placeholderPrice} />
          </Form.Item>
          <ButtonsWrapped>
            <Form.Item name="currency">
              <Select style={{ width: '100%' }} placeholder={placeholderCurrency}>
                <Option value="USD">USD</Option>
                <Option value="XTZ">XTZ</Option>
                <Option value="ETH">ETH</Option>
                <Option value="USDT">USDT</Option>
                <Option value="BCH">BCH</Option>
                <Option value="BTC">BTC</Option>
                <Option value="LTC">LTC</Option>
              </Select>
            </Form.Item>
            <Button type="dashed" onClick={onCancel} danger style={{ marginRight: '10px' }}>
              <FormattedMessage id="button.cancel" />
            </Button>
            <Button type="dashed" htmlType="submit">
              <FormattedMessage id="button.submit" />
            </Button>
          </ButtonsWrapped>
        </Form>
      </Wrapped>
    </PositionWrapped>
  )
}
