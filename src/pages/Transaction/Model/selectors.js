/* eslint-disable no-shadow */
import { createSelector } from 'reselect'

export const isLoading = state => state.TransactionReducer.isLoading

export const transaction = state => state.TransactionReducer.transaction

export const userTransactions = state => state.TransactionReducer.userTransactions

export const messageStatus = state => state.TransactionReducer.messageStatus

export const activeUser = state => state.TransactionReducer.activeUser

export const users = state => state.AppReducer.users

export const userForTransaction = createSelector([users, activeUser], (users, activeUser) =>
  users.filter(user => user !== activeUser),
)
