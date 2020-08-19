import React from 'react'
import styled from 'styled-components'
import { Input, Button, Form } from 'antd'
import { useIntl, FormattedMessage } from 'react-intl'

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
  width: 400px;
  background: rgba(255, 255, 255, 1);
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
`
const ActionsWrapped = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  column-gap: 15px;
  justify-content: center;
`
const H2 = styled.h2``
export const ChannelNameForm = ({ onSubmit, onCancel, valuteType }) => {
  const intl = useIntl()
  const placeholderName = intl.formatMessage({ id: 'input.channel.name' })
  const placeholderDescription = intl.formatMessage({ id: 'input.channel.description' })

  return (
    <PositionWrapped>
      <Wrapped>
        <H2>{valuteType}</H2>
        <Form onFinish={onSubmit}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input channel name!' }]}
          >
            <Input placeholder={placeholderName} />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please input channel description!' }]}
          >
            <Input placeholder={placeholderDescription} />
          </Form.Item>
          <ActionsWrapped>
            <Button type="dashed" htmlType="submit">
              <FormattedMessage id="button.submit" />
            </Button>
            <Button type="dashed" danger onClick={onCancel}>
              <FormattedMessage id="button.cancel" />
            </Button>
          </ActionsWrapped>
        </Form>
      </Wrapped>
    </PositionWrapped>
  )
}
