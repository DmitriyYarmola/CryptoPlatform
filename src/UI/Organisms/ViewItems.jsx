import React from 'react'
import { Table } from 'antd'
import { EditableFormRow, EditableCell } from 'UI/Molecules/EditTable'

export const ViewItems = ({ data }) => {
  console.log('data', data)
  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      editable: true,
      render: text => <a className="utils__link--underlined">{text}</a>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      editable: true,
    },
    {
      title: 'Unit Cost',
      dataIndex: 'price',
      editable: true,
      render: text => <span>${text}</span>,
    },
    {
      title: 'Total',
      dataIndex: '',
      render: (text, record) => <span>${record.price * record.amount}</span>,
    },
  ]

  const columnsMaping = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'quantity' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    }
  })

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  }

  return (
    <Table
      components={components}
      bordered
      scroll={{ x: '100%' }}
      dataSource={data.items}
      columns={columnsMaping}
      rowClassName={() => 'editable-row'}
      pagination={false}
    />
  )
}
