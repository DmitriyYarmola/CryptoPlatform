/* eslint-disable no-nested-ternary */
import React from 'react'
import { Table, Popconfirm, Button } from 'antd'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { dateParser } from 'Lib/dateParser'
import { FormattedMessage, useIntl } from 'react-intl'

const ActionsButton = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  column-gap: 10px;
  justify-content: center;
`

export const InformationTable = ({ data, onEdit, onDelete, onShareLink, pageParam }) => {
  const { host } = window.location
  const intl = useIntl()
  const popkonTitle = intl.formatMessage({ id: 'popkon.title' })
  const columnsInvoices = [
    {
      title: <FormattedMessage id="invoice.add" />,
      dataIndex: 'invoiceId',
      key: 'invoiceId',
      align: 'center',
      render: invoiceId => <span>{invoiceId}</span>,
    },
    {
      title: <FormattedMessage id="invoice.description" />,
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: description => <span>{description}</span>,
    },
    {
      title: <FormattedMessage id="invoice.totalAmount" />,
      dataIndex: 'total',
      key: 'totalAmount',
      align: 'center',
      render: (totalAmount, invoice) => {
        let total = 0
        if (invoice.items) {
          invoice.items.forEach(item => {
            total += item.price * item.amount
          })
        }
        return <span>{total}</span>
      },
    },
    {
      title: <FormattedMessage id="invoice.count" />,
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      render: (amount, invoice) => {
        return <span>{invoice?.items?.length || 0}</span>
      },
    },
    {
      title: <FormattedMessage id="invoice.status" />,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: status => {
        return (
          <>
            {status === 'OPENED' ? (
              <FormattedMessage id="status.opened" />
            ) : status === 'COMPLETED' ? (
              <FormattedMessage id="status.completed" />
            ) : (
              status === 'PENDING' && <FormattedMessage id="status.pending" />
            )}
          </>
        )
      },
    },
    {
      title: <FormattedMessage id="invoice.date" />,
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      sortDirections: ['descend'],
      render: date => <span>{date}</span>,
    },
    {
      title: <FormattedMessage id="invoice.actions" />,
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (text, invoice) => {
        return (
          <ActionsButton>
            <Button type="dashed" onClick={() => onEdit(invoice)}>
              <FormattedMessage id="button.edit" />
            </Button>
            {data.length >= 1 && (
              <Popconfirm title={popkonTitle} onConfirm={() => onDelete(invoice.invoiceId)}>
                <Button type="dashed" danger>
                  <FormattedMessage id="button.delete" />
                </Button>
              </Popconfirm>
            )}
            <CopyToClipboard
              onCopy={() => onShareLink(invoice)}
              text={`https://${host}/#/${pageParam}/cart/${invoice.invoiceId}`}
            >
              <Button type="dashed">
                <FormattedMessage id="button.share" />
              </Button>
            </CopyToClipboard>
          </ActionsButton>
        )
      },
    },
  ]

  const columnsVouchers = [
    {
      title: <FormattedMessage id="voucher.id" />,
      dataIndex: 'voucherId',
      key: 'voucherId',
      align: 'center',
      render: voucherId => <span>{voucherId}</span>,
    },
    {
      title: <FormattedMessage id="voucher.description" />,
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: description => <span>{description}</span>,
    },
    {
      title: <FormattedMessage id="voucher.price" />,
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: price => {
        return <span>{price || 0}$</span>
      },
    },
    {
      title: <FormattedMessage id="voucher.currency" />,
      dataIndex: 'currency',
      key: 'currency',
      align: 'center',
      render: currency => {
        return <span>{currency}</span>
      },
    },
    {
      title: <FormattedMessage id="voucher.date" />,
      dataIndex: 'timestamp',
      key: 'timestamp',
      align: 'center',
      render: date => <span>{dateParser(date)}</span>,
    },
    {
      title: <FormattedMessage id="voucher.actions" />,
      dataIndex: '',
      key: 'x',
      align: 'center',
      render: (text, voucher) => {
        return (
          <ActionsButton>
            <Button type="dashed" onClick={() => onEdit(voucher)} disabled>
              <FormattedMessage id="button.edit" />
            </Button>
            {data.length >= 1 && (
              <Popconfirm
                title={popkonTitle}
                onConfirm={() => onDelete(voucher.voucherId)}
                disabled
              >
                <Button type="dashed" danger onClick={() => onDelete(voucher.voucherId)} disabled>
                  <FormattedMessage id="button.delete" />
                </Button>
              </Popconfirm>
            )}
          </ActionsButton>
        )
      },
    },
  ]
  const template = {
    invoices: columnsInvoices,
    vouchers: columnsVouchers,
  }

  const getColumns = template[pageParam]
  return (
    <Table
      align="center"
      columns={getColumns}
      dataSource={[...data]}
      pagination={{ total: data.length, defaultPageSize: 15, defaultCurrent: 1 }}
    />
  )
}
