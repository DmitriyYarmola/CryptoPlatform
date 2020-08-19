/* eslint-disable react/self-closing-comp */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthSelectors } from 'Features/Auth'
import styled from 'styled-components'
import { Preloader } from 'UI/Atoms'
import { UserBalance } from 'pages/Balance/Organisms/UserBalance'
import { UserSelectors } from 'Lib/Store/user'
import { BalanceSelectors } from './Model'

const Wrapped = styled.div``

const BalancePage = () => {
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const merchants = useSelector(AuthSelectors.merchants)
  const balance = useSelector(BalanceSelectors.balanceData)
  const isLoading = useSelector(BalanceSelectors.isLoading)
  const administrator = useSelector(UserSelectors.name)
  const isAdmin = useSelector(UserSelectors.isAdmin)
  const activeUser = useSelector(BalanceSelectors.activeUser)
  useEffect(() => {
    dispatch({ type: 'GET_BALANCE', payload: { token } })
  }, [dispatch, token])

  return isLoading ? (
    <Preloader />
  ) : (
    balance && (
      <Wrapped>
        <UserBalance
          balance={balance}
          merchants={merchants}
          administator={administrator}
          isAdmin={isAdmin}
          activeUserBalance={activeUser}
        />
      </Wrapped>
    )
  )
}
export default BalancePage
