/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AuthSelectors } from 'Features/Auth'
import styled from 'styled-components'
import { Preloader } from 'UI/Atoms'
import { Select } from 'antd'
import { BalanceItemInformation } from '../Atoms'
import { BalanceActions } from '../Model'

const { Option } = Select
const Balance = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`

const SelectUser = styled.div``

export const UserBalance = ({ balance, merchants, administator, isAdmin, activeUserBalance }) => {
  const isLoading = useSelector(AuthSelectors.isLoading)
  const dispatch = useDispatch()

  const selectUser = useCallback(
    e => {
      dispatch(BalanceActions.setBalance(merchants[e - 1].balances))
      dispatch(BalanceActions.setActiveUser(merchants[e - 1].username))
    },
    [dispatch, merchants],
  )

  const Items = balance.map(item => {
    return (
      <BalanceItemInformation
        key={item.currency}
        valute={item.currency}
        count={item.amount}
        usdRate={item.usdRate}
        usdRateT={item.usdRate}
        defaultValute={false}
        activeUser={activeUserBalance}
        administrator={administator}
      />
    )
  })

  const userList = merchants.filter(merchant => merchant.username !== activeUserBalance)
  return (
    <>
      {isAdmin && (
        <SelectUser>
          <Select
            defaultValue={administator}
            style={{ width: 120 }}
            onChange={selectUser}
            value={activeUserBalance}
          >
            {userList.map(merchant => {
              return (
                <Option value={merchant.key} key={merchant.username}>
                  {merchant.username}
                </Option>
              )
            })}
          </Select>
        </SelectUser>
      )}
      <Balance>{Items}</Balance>
      {isLoading && <Preloader />}
    </>
  )
}
