import React from 'react'
import { CreateVoucher } from 'UI/Organisms/Forms'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

const Create = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { state } = useLocation()
  const { token } = state
  const createVoucher = formData => {
    dispatch({
      type: 'Vouchers/CREATE_NEW_VOUCHER',
      payload: { token, formData: { ...formData, price: Number(formData.price) } },
    })
    history.push('/vouchers')
  }

  const onCancel = () => {
    history.push('/vouchers')
  }
  return <CreateVoucher onCreate={createVoucher} onCancel={onCancel} />
}

export default Create
