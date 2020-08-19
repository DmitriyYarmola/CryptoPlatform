import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AuthSelectors } from 'Features/Auth'
import { Preloader } from 'UI/Atoms'
import { UserSelectors } from 'Lib/Store/user'
import { Transactions } from './Organisms'
import { TransactionSelectors, TransactionActions } from './Model'

const TransactionPage = () => {
  const token = useSelector(AuthSelectors.token)
  const transactions = useSelector(TransactionSelectors.transaction)
  const isLoading = useSelector(TransactionSelectors.isLoading)
  const administrator = useSelector(UserSelectors.name)
  const userForTransaction = useSelector(TransactionSelectors.userForTransaction)
  const activeUser = useSelector(TransactionSelectors.activeUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'GET_TRANSACTION',
      payload: { token, transactions: null, username: administrator },
    })

    return () => {
      dispatch(TransactionActions.setActiveUser(administrator))
    }
  }, [dispatch, token, administrator])

  const onPrevTransactions = useCallback(() => {
    dispatch({
      type: 'GET_TRANSACTION',
      payload: {
        token,
        transactions,
        transactionCount: transactions[transactions?.length - 1],
      },
    })
  }, [token, dispatch, transactions])

  return transactions && !isLoading ? (
    <Transactions
      transactions={transactions}
      onPrevTransaction={onPrevTransactions}
      userForTransaction={userForTransaction}
      administrator={administrator}
      activeUser={activeUser}
    />
  ) : (
    <Preloader />
  )
}
export default TransactionPage
