import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppSelectors } from 'pages/AppModel'
import { AuthSelectors } from 'Features/Auth'
import { VouchersActions } from 'pages/Vouchers'
import { CreateVoucher, EditVoucherForm } from 'UI/Organisms/Forms'
import { Button } from 'antd'
import { InformationTable } from 'UI/Organisms'

export const AdminVouchers = ({ activeVoucher, vouchers }) => {
  const token = useSelector(AuthSelectors.token)
  const [isOpenCreateVoucher, setIsOpenCreateVoucher] = useState(false)
  const [isOpenEditVoucherDialog, setIsOpenEditVoucherDialog] = useState(false)
  const valuteTypes = useSelector(AppSelectors.valuteTypes)

  const { description, price, currency } = activeVoucher
  const dispatch = useDispatch()
  const addVoucher = () => {
    setIsOpenCreateVoucher(true)
  }

  const createVoucher = formData => {
    dispatch({
      type: 'Vouchers/CREATE_NEW_VOUCHER',
      payload: { token, formData: { ...formData, price: Number(formData.price) } },
    })
    setIsOpenCreateVoucher(false)
  }

  const deleteVoucher = voucherId => {
    console.log('vouch', voucherId)
    dispatch({ type: 'Vouchers/DELETE_VOUCHER', payload: { token, voucherId } })
  }

  const editVoucher = vaucher => {
    dispatch(VouchersActions.setActiveVoucher(vaucher))
    setIsOpenEditVoucherDialog(!isOpenEditVoucherDialog)
  }

  const onCancel = () => {
    setIsOpenCreateVoucher(false)
  }

  const onEditVoucher = formData => {
    dispatch({ type: 'Vouchers/EDIT_VOUCHER', payload: { formData, token } })
    setIsOpenCreateVoucher(false)
  }
  const onCancelEditVoucher = () => {
    dispatch(VouchersActions.setActiveVoucher({}))
    setIsOpenEditVoucherDialog(!isOpenEditVoucherDialog)
  }

  return (
    <>
      <CreateVoucher onCreate={createVoucher} isOpen={isOpenCreateVoucher} onCancel={onCancel} />
      <div className="card">
        <div className="card-header">
          <Button
            onClick={addVoucher}
            type="primary"
            style={{ display: 'block', marginBottom: '16px' }}
          >
            Add Voucher
          </Button>
        </div>
        <div className="card-body">
          <InformationTable
            data={vouchers}
            onEdit={editVoucher}
            onDelete={deleteVoucher}
            pageParam="vouchers"
          />
        </div>
      </div>
      <EditVoucherForm
        isOpenEditVoucherDialog={isOpenEditVoucherDialog}
        valuteTypes={valuteTypes}
        onFinish={onEditVoucher}
        onCancel={onCancelEditVoucher}
        initialValues={{ description, currency, price }}
      />
    </>
  )
}
