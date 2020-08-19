/* eslint-disable no-shadow */
import React from 'react'
import { Table, Progress, Button, Tag } from 'antd'
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import _ from 'lodash'

export const TxnTable = ({
  transactions,
  locationAmount,
  showsuccessResult,
  convertionRate,
  rateUSD,
}) => {
  const txnArray = []
  const txns = [...transactions]
  console.log('convertionRate', convertionRate)
  let percentageValue

  const renderTotalAmount = txnArray => {
    let amount
    let total = 0
    txnArray.forEach(txn => {
      if (txn.state === 'CONFIRMED') {
        amount = (Number(txn.amount) / Number(txn.decimal)).toFixed(2)
        total = amount + total
        percentageValue = (Number(txn.amount) / +locationAmount) * 100
      }
    })

    return total * convertionRate
  }

  const getTotal = txnArray => {
    return (
      txnArray
        .filter(x => x.state === 'CONFIRMED')
        .reduce((total, txn) => {
          return total + Number(txn.amount) / Number(txn.decimal)
        }, 0) / convertionRate
    )
  }

  if (txns) {
    const unique = [...new Set(txns.map(a => a.transactionHash))]

    unique.forEach(ut => {
      txns.forEach(txn => {
        if (ut === txn.transactionHash) {
          if (txn.state === 'CONFIRMED') {
            txnArray.splice(
              txnArray.findIndex(item => item.state === 'PENDING_CONFIRMATION'),
              1,
            )
            txnArray.push(txn)
          } else {
            txnArray.push(txn)
          }
        }
      })
    })
  }
  const completedValue = Math.round(
    (renderTotalAmount(txnArray) * percentageValue) / locationAmount,
  )
  const columns = [
    {
      title: 'Txn Hash',
      dataIndex: 'transactionHash',
      key: 'transactionHash',
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '20%',
      render: (text, row) => <span>{Math.ceil((+row.amount / +row.decimal) * 10000) / 10000}</span>,
    },
    {
      title: 'USD',
      dataIndex: '',
      key: 'usd',
      width: '20%',
      render: (text, row) => (
        <span>
          {Math.ceil(((+row.amount / +row.decimal) * rateUSD * 10000) / 10000).toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'state',
      key: 'state',
      render: text => {
        if (text === 'CONFIRMED') {
          return (
            <div>
              <CheckCircleOutlined style={{ paddingRight: '10px' }} />
              <Tag color="blue">{_.startCase(_.camelCase(text))}</Tag>
            </div>
          )
        }
        return (
          <div>
            <LoadingOutlined style={{ paddingRight: '10px', color: 'orange' }} />
            <Tag color="orange">{_.startCase(_.camelCase(text))}</Tag>
          </div>
        )
      },
    },
  ]
  return (
    <div>
      <Table
        className="utils__scrollTable"
        scroll={{ x: '100%' }}
        bordered
        columns={columns}
        dataSource={txnArray}
        pagination={false}
        rowKey={record => record.transa}
      />
      {renderTotalAmount(txnArray) > 0 ? (
        <div className="text-right clearfix mt-4">
          <div className="pull-right">
            <div style={{ marginRight: '54.2%' }}>
              <strong>
                Grand Total: <span>$ {Math.ceil(getTotal(txnArray) * 100) / 100}</span>
              </strong>
            </div>
            <div>
              <strong>
                Status: {Math.ceil((getTotal(txnArray) / locationAmount) * 100 * 100) / 100} %
              </strong>
              {completedValue >= 100 ? (
                <div style={{ width: 150, display: 'inline-block', paddingLeft: '10px' }}>
                  <Progress
                    percent={Math.ceil((getTotal(txnArray) / locationAmount) * 100 * 100) / 100}
                    size="small"
                  />
                </div>
              ) : (
                <div style={{ width: 150, display: 'inline-block', paddingLeft: '10px' }}>
                  <Progress
                    percent={Math.ceil((getTotal(txnArray) / locationAmount) * 100 * 100) / 100}
                    size="small"
                    status="exception"
                  />
                </div>
              )}
            </div>
            <div style={{ marginTop: '30px' }}>
              <Button
                disabled={Math.ceil((getTotal(txnArray) / locationAmount) * 100 * 100) / 100 < 100}
                className="mr-2"
                type="primary"
                onClick={showsuccessResult}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
