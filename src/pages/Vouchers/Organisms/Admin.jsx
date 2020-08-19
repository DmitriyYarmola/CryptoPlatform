import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppSelectors } from 'pages/AppModel'
import { AuthSelectors } from 'Features/Auth'
import { VouchersActions } from 'pages/Vouchers'
import { EditVoucherForm } from 'UI/Organisms/Forms'
import { Button } from 'antd'
import { InformationTable } from 'UI/Organisms'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

export const AdminVouchers = ({ activeVoucher, vouchers }) => {
  const token = useSelector(AuthSelectors.token)
  const history = useHistory()
  const [isOpenEditVoucherDialog, setIsOpenEditVoucherDialog] = useState(false)
  const valuteTypes = useSelector(AppSelectors.valuteTypes)

  const { description, price, currency } = activeVoucher
  const dispatch = useDispatch()
  const addVoucher = () => {
    history.push({ pathname: '/vouchers/create', state: { token } })
  }

  const deleteVoucher = voucherId => {
    dispatch({ type: 'Vouchers/DELETE_VOUCHER', payload: { token, voucherId } })
  }

  const editVoucher = vaucher => {
    dispatch(VouchersActions.setActiveVoucher(vaucher))
    setIsOpenEditVoucherDialog(!isOpenEditVoucherDialog)
  }

  const onEditVoucher = formData => {
    dispatch({ type: 'Vouchers/EDIT_VOUCHER', payload: { formData, token } })
  }
  const onCancelEditVoucher = () => {
    dispatch(VouchersActions.setActiveVoucher({}))
    setIsOpenEditVoucherDialog(!isOpenEditVoucherDialog)
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <Button
            onClick={addVoucher}
            type="primary"
            style={{ display: 'block', marginBottom: '16px' }}
          >
            <FormattedMessage id="voucher.add" />
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
