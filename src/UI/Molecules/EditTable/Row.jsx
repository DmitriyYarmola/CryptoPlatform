import React from 'react'
import { Form } from '@ant-design/compatible'
import { EditableContext } from './Context'

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

export const EditableFormRow = Form.create()(EditableRow)
