import React from 'react'
import styled from 'styled-components'
import { Input, Button, Form } from 'antd'
import '../../global-animation.sass'
import { FormattedMessage, useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'

const PositionWrapped = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`
const Wrapped = styled.div`
  text-align: center;
  width: 350px;
  background: rgba(255, 255, 255, 1);
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const H2 = styled.h2``
const ButtonsWrapped = styled.div``

const WithdrawForm = ({ onSubmit, currency }) => {
  const history = useHistory()
  const intl = useIntl()
  const placeholderAmount = intl.formatMessage({ id: 'form.inputAmount' })
  const placeholderAddress = intl.formatMessage({ id: 'form.inputAddress' })

  return (
    <PositionWrapped>
      <Wrapped>
        <H2>{currency}</H2>
        <Form name="withDraw" onFinish={onSubmit}>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: 'Please enter a valid amount!' }]}
          >
            <Input type="number" min="0" placeholder={placeholderAmount} />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please enter a valid address!' }]}
          >
            <Input placeholder={placeholderAddress} />
          </Form.Item>
          <Form.Item>
            <ButtonsWrapped>
              <Button
                type="dashed"
                danger
                style={{ marginRight: '10px' }}
                onClick={() => history.goBack()}
              >
                <FormattedMessage id="button.cancel" />
              </Button>
              <Button type="dashed" htmlType="submit">
                <FormattedMessage id="button.submit" />
              </Button>
            </ButtonsWrapped>
          </Form.Item>
        </Form>
      </Wrapped>
    </PositionWrapped>
  )
}

export default WithdrawForm
