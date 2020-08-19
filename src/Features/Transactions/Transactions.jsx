import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button } from 'antd'
import { AuthSelectors } from 'Features/Auth'
import { UserSelectors } from 'Lib/Store/user'
import { TransactionActions } from 'pages/Transaction'
import { Table } from '../../UI/Organisms'
import { AppSelectors } from '../../pages/AppModel'
import { Filters } from './Atoms'
import './style.sass'

const TableActions = styled.div`
  text-align: right;
`

export const Transactions = React.memo(
  ({ transactions, onPrevTransaction, userForTransaction, activeUser }) => {
    const [cryptoType, setCryptoType] = useState(null)
    const [transactionType, setTransactionType] = useState(null)
    const token = useSelector(AuthSelectors.token)
    const transactionTypes = useSelector(AppSelectors.transactionTypes)
    const valuteTypes = useSelector(AppSelectors.valuteTypes)
    const valuteRates = useSelector(AppSelectors.valuteRates)
    const merchants = useSelector(AuthSelectors.merchants)
    const isAdmin = useSelector(UserSelectors.isAdmin)
    const dispatch = useDispatch()
    const onSelectUser = e => {
      dispatch({ type: '/TRANSACTION/GET_USER_TRANSACTIONS', payload: { token, userName: e.key } })
      dispatch(TransactionActions.setActiveUser(e.key))
    }
    const onSelectCryptoType = e => {
      setCryptoType(e.target.value.toUpperCase())
    }
    const onSelectTransactionType = e => {
      console.log(e)
      setTransactionType(e.target.value.toUpperCase())
    }
    console.log('ac', activeUser)
    const usersList = merchants.filter(merchant => merchant.username !== activeUser)
    console.log('usersList', usersList)
    return (
      <>
        <Filters
          onSelectUser={onSelectUser}
          userForTransaction={userForTransaction}
          transactionTypes={transactionTypes}
          valuteTypes={valuteTypes}
          merchants={usersList}
          isAdmin={isAdmin}
          onSelectCryptoType={onSelectCryptoType}
          cryptoType={cryptoType}
          onSelectTransactionType={onSelectTransactionType}
          transactionType={transactionType}
        />
        <Table
          data={transactions}
          actions={
            <TableActions>
              <Button
                type="dashed"
                onClick={onPrevTransaction}
                style={{ marginTop: '15px' }}
                disabled
              >
                Previous Transactions
              </Button>
            </TableActions>
          }
          valuteRates={valuteRates}
          selectTransactionType={transactionType}
          selectCryptoType={cryptoType}
          isTransactions
        />
      </>
    )
  },
)
