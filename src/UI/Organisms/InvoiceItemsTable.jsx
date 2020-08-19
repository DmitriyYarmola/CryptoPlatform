import React from 'react'
import { Table, Popconfirm } from 'antd'
import { EditableContext, EditableFormRow, EditableCell } from 'UI/Molecules/EditTable'
import { FormattedMessage, useIntl } from 'react-intl'

export const InvoiceItemsTable = ({
  isEditing,
  editingKey,
  edit,
  activeInvoice,
  cancel,
  save,
  deleteItem,
}) => {
  const intl = useIntl()
  const popkonTitle = intl.formatMessage({ id: 'popkon.title' })
  const columns = [
    {
      title: <FormattedMessage id="invoice.item.description" />,
      dataIndex: 'description',
      editable: true,
      align: 'center',
      render: text => <a className="utils__link--underlined">{text}</a>,
    },
    {
      title: <FormattedMessage id="invoice.item.amount" />,
      dataIndex: 'amount',
      editable: true,
      align: 'center',
    },
    {
      title: <FormattedMessage id="invoice.item.unitCost" />,
      dataIndex: 'price',
      editable: true,
      align: 'center',
      render: text => <span>${text} </span>,
    },
    {
      title: <FormattedMessage id="invoice.item.total" />,
      dataIndex: '',
      align: 'center',
      render: (text, record) => <span>${record.price * record.amount} </span>,
    },
    {
      title: <FormattedMessage id="invoice.item.actions" />,
      dataIndex: 'actions',
      align: 'center',
      render: (text, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                /* eslint-disable-next-line */
                <a onClick={() => save(form, record)} style={{ marginRight: 8, color: '#007bff' }}>
                  <FormattedMessage id="invoice.save" />
                </a>
              )}
            </EditableContext.Consumer>
            {/* eslint-disable-next-line */}
            <Popconfirm title={popkonTitle} onConfirm={() => cancel(record.id)}>
              <a style={{ color: '#007bff' }}>
                <FormattedMessage id="button.cancel" />
              </a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            {/* eslint-disable-next-line */}
            <a
              disabled={editingKey !== ''}
              onClick={() => edit(record.id)}
              style={{ color: '#007bff' }}
            >
              <FormattedMessage id="button.edit" />
            </a>
            {activeInvoice.items.length >= 1 ? (
              <Popconfirm title={popkonTitle} onConfirm={() => deleteItem(record.itemId)}>
                <a style={{ color: '#007bff', marginLeft: '10px' }}><FormattedMessage id="button.delete" /></a>
              </Popconfirm>
            ) : null}
          </div>
        )
      },
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
        editing: isEditing(record),
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
      dataSource={activeInvoice.items}
      columns={columnsMaping}
      rowClassName={() => 'editable-row'}
      pagination={false}
    />
  )
}
