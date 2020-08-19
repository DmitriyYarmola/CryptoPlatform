import React from 'react'
import { Input, InputNumber, Form } from 'antd'
import { EditableContext } from './Context'

export const EditableCell = ({
  inputType,
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const getInput = () => {
    if (inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }
  const renderCell = form => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {form.getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  return <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>
}
