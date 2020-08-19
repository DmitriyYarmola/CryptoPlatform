/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import './style.sass'
import { FormattedMessage } from 'react-intl'

const TransactionInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  font-size: 15px;
  margin-left: 35px;
`
const Item = styled.div`
  width: max-content;
  display: grid;
  color: rgb(0 0 0);
`
const ItemCryptoType = styled.b`
  color: black;
`
const ItemAmount = styled.span``
const Addres = styled.span``
const B = styled.b`
  color: black;
`
const State = styled.span``
const CryptoInfo = styled.div``
const ValuteInfo = styled.div``

export const TableComponent = ({ data, actions, isTransactions }) => {
  console.log('data', data)
  const columnsNotifications = [
    {
      title: <FormattedMessage id="transaction.transactionType" />,
      dataIndex: 'transactionType',
      key: 'Transaction type',
      align: 'center',
      render: type => {
        return (
          <>
            {type === 'DEBIT' ? (
              <span className="account_creation text-success font-weight-bold">
                <FormattedMessage id="transactionType.debit" />
              </span>
            ) : type === 'CREDIT' ? (
              <span className="account_creation text-danger font-weight-bold">
                <FormattedMessage id="transactionType.credit" />
              </span>
            ) : type === 'ACCOUNT_CREATION' ? (
              <span className="account_creation text-primary font-weight-bold">
                <FormattedMessage id="transactionType.accountCreation" />
              </span>
            ) : (
              type === 'EXCHANGE' && (
                <span className="account_creation font-weight-bold" style={{ color: '#722ed1' }}>
                  <FormattedMessage id="transactionType.exchange" />
                </span>
              )
            )}
          </>
        )
      },
    },
    {
      title: <FormattedMessage id="formQrCode.id" />,
      dataIndex: 'id',
      key: 'ID',
      align: 'center',
      render: id => {
        const index = id.indexOf('@')
        let newString
        if (index > 0) {
          newString = id.slice(0, index)
        } else newString = id
        return <span>{newString}</span>
      },
    },
    {
      title: <FormattedMessage id="topBar.status" />,
      dataIndex: 'id',
      key: 'status',
      align: 'center',
      render: (id, item) => {
        const { state } = item
        return (
          <>
            {state === 'CONFIRMED' ? (
              <FormattedMessage id="status.confimated" />
            ) : state === 'PENDING_CONFIRMATION' ? (
              <FormattedMessage id="status.pendingConfimation" />
            ) : (
              state === 'PENDING' && <FormattedMessage id="status.pending" />
            )}
          </>
        )
      },
    },
    {
      title: <FormattedMessage id="transaction.timestamp" />,
      key: 'TimeStamp',
      dataIndex: 'timestamp',
      align: 'center',
      render: timestamp => <span>{timestamp}</span>,
    },
  ]

  const columnsTransactions = [
    {
      title: <FormattedMessage id="transaction.transactionId" />,
      dataIndex: 'transactionId',
      key: 'ID',
      align: 'center',
      render: transactionId => {
        return <span>{transactionId}</span>
      },
    },
    {
      title: <FormattedMessage id="transaction.transactionType" />,
      dataIndex: 'transactionType',
      key: 'Transaction type',
      align: 'center',
      render: type => {
        console.log('type', type)
        return (
          <>
            {type === 'DEBIT' ? (
              <span className="account_creation text-success font-weight-bold">
                <FormattedMessage id="transactionType.debit" />
              </span>
            ) : type === 'CREDIT' ? (
              <span className="account_creation text-danger font-weight-bold">
                <FormattedMessage id="transactionType.credit" />
              </span>
            ) : type === 'ACCOUNT_CREATION' ? (
              <span className="account_creation text-primary font-weight-bold">
                <FormattedMessage id="transactionType.accountCreation" />
              </span>
            ) : (
              type === 'EXCHANGE' && (
                <span className="account_creation font-weight-bold" style={{ color: '#722ed1' }}>
                  <FormattedMessage id="transactionType.exchange" />
                </span>
              )
            )}
          </>
        )
      },
    },
    {
      title: <FormattedMessage id="transaction.timestamp" />,
      key: 'TimeStamp',
      dataIndex: 'timestamp',
      align: 'center',
      render: timestamp => <span>{timestamp}</span>,
    },
  ]

  return (
    <>
      <Table
        columns={isTransactions ? columnsTransactions : columnsNotifications}
        dataSource={[...data]}
        expandable={{
          expandedRowRender: item => (
            <TransactionInfo>
              <Item>
                {isTransactions
                  ? item.toAddress && (
                      <Addres>
                        <B>
                          <FormattedMessage id="formQrCode.address" />:{' '}
                        </B>
                        {item.toAddress}
                      </Addres>
                    )
                  : item.address && (
                      <Addres>
                        <B>
                          <FormattedMessage id="formQrCode.address" />:{' '}
                        </B>
                        {item.address}
                      </Addres>
                    )}
                {item.state && (
                  <State>
                    <B>
                      <FormattedMessage id="topBar.status" />:{' '}
                    </B>
                    <>
                      {item.state === 'CONFIRMED' ? (
                        <FormattedMessage id="status.confimated" />
                      ) : item.state === 'PENDING_CONFIRMATION' ? (
                        <FormattedMessage id="status.pendingConfimation" />
                      ) : (
                        item.state === 'PENDING' && <FormattedMessage id="status.pending" />
                      )}
                    </>
                  </State>
                )}
                <CryptoInfo>
                  <ItemCryptoType>{item.cryptoType}: </ItemCryptoType>
                  {item.transactionType === 'ACCOUNT_CREATION' ? (
                    <ItemAmount>{(+item.amount / +item.decimal) * 1000000000000}</ItemAmount>
                  ) : (
                    <ItemAmount>{(+item.amount / +item.decimal).toFixed(4)}</ItemAmount>
                  )}
                </CryptoInfo>
                <ValuteInfo>
                  {isTransactions && (
                    <>
                      <ItemCryptoType>USD: </ItemCryptoType>
                      {item.transactionType === 'ACCOUNT_CREATION' ? (
                        <ItemAmount>
                          {(+item.amount / +item.decimal) * +item.rate * 1000000000000}
                        </ItemAmount>
                      ) : (
                        <ItemAmount>
                          {((+item.amount / +item.decimal) * +item.rate).toFixed(2)}
                        </ItemAmount>
                      )}
                    </>
                  )}
                </ValuteInfo>
              </Item>
            </TransactionInfo>
          ),
        }}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
      {actions}
    </>
  )
}
