/* eslint-disable no-shadow */
import { createSelector } from 'reselect'

export const balanceData = state => state.BalanceReducer.balanceData

export const isLoading = state => state.BalanceReducer.isLoading

export const messageStatus = state => state.BalanceReducer.messageStatus

export const users = state => state.AppReducer.users

export const activeUser = state => state.BalanceReducer.activeUser

export const userForBalanceAccount = createSelector([users, activeUser], (users, activeUser) =>
  users.filter(user => user !== activeUser),
)
