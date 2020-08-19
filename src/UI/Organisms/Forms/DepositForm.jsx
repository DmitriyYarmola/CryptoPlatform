import React from 'react'
import { Input, Button, Form } from 'antd'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import '../../global-animation.sass'
import { useIntl, FormattedMessage } from 'react-intl'

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
  font-size: 16px;
  font-weight: 600;
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
const ButtonsWrapped = styled.div`
  text-align: right;
`
export const DepositForm = ({ valuteType, onSubmit, onCancel, isOpenDepositDialog }) => {
  const intl = useIntl()
  const placeholderId = intl.formatMessage({ id: 'form.inputId' })
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={isOpenDepositDialog}
      timeout={200}
      classNames="my-node"
    >
      <PositionWrapped>
        <Wrapped>
          <H2>{valuteType}</H2>
          <Form name="deposit" onFinish={onSubmit}>
            <Form.Item name="id" rules={[{ required: true, message: 'Please enter valid Id!' }]}>
              <Input placeholder={placeholderId} />
            </Form.Item>
            <Form.Item>
              <ButtonsWrapped>
                <Button type="dashed" onClick={onCancel} danger style={{ marginRight: '10px' }}>
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
    </CSSTransition>
  )
}
