import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { Input, Button, Form, Select } from 'antd'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'

const { Option } = Select
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
  width: 500px;
  background: rgba(255, 255, 255, 1);
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
`

const FormActions = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  column-gap: 10px;
  justify-content: center;
`

const Title = styled.h2`
  font-size: 25px;
  font-weight: 600;
  margin: 25px 0;
`

export const EditVoucherForm = ({
  isOpenEditVoucherDialog,
  onFinish,
  valuteTypes,
  onCancel,
  initialValues,
}) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={isOpenEditVoucherDialog}
      timeout={200}
      classNames="my-node"
    >
      <PositionWrapped>
        <Wrapped>
          <Title>Edit voucher</Title>
          <Form onFinish={onFinish} initialValues={initialValues}>
            <Form.Item name="description">
              <Input size="large" placeholder="Input description of voucher" />
            </Form.Item>
            <Form.Item name="price">
              <Input size="large" type="number" min={1} placeholder="Input price of voucher" />
            </Form.Item>
            <Form.Item name="currency">
              <Select defaultValue="USD" style={{ width: '100%' }}>
                {valuteTypes.map(valute => {
                  return (
                    <Option value={valute} key={valute}>
                      {valute}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
            <FormActions>
              <Button type="dashed" danger onClick={onCancel}>
                <FormattedMessage id="button.cancel" />
              </Button>
              <Button type="dashed" size="large" htmlType="submit">
                <FormattedMessage id="button.submit" />
              </Button>
            </FormActions>
          </Form>
        </Wrapped>
      </PositionWrapped>
    </CSSTransition>
  )
}
