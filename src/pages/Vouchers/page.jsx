/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AuthSelectors } from 'Features/Auth'
import { Preloader } from 'UI/Atoms'

import { AdminVouchers, UserVouchers } from 'pages/Vouchers/Organisms'
import { VouchersSelectors } from './Model'

const Vouchers = () => {
  const token = useSelector(AuthSelectors.token)
  const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
  const vouchers = useSelector(VouchersSelectors.vouchers)
  const isLoading = useSelector(VouchersSelectors.isLoading)
  const activeVoucher = useSelector(VouchersSelectors.activeVoucher)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'Vouchers/GET_VOUCHERS', payload: { isAuthenticated, token } })
  }, [dispatch, isAuthenticated, token])

  return isLoading ? (
    <Preloader />
  ) : (
    vouchers &&
      (isAuthenticated ? (
        <AdminVouchers activeVoucher={activeVoucher} vouchers={vouchers} />
      ) : (
        <UserVouchers vouchers={vouchers} />
      ))
  )
}

export default Vouchers
