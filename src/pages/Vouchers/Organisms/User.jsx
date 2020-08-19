import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import General16 from 'components/kit/widgets/General/16'
import image from '../../../UI/Img/GIFTVOUCHER20.jpg'

const VouchersCarts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 15px;
`

export const UserVouchers = ({ vouchers }) => {
  const dispatch = useDispatch()
  const onBuy = voucherId => {
    dispatch({ type: 'Vouchers/BUY_VOUCHER', payload: { voucherId } })
  }

  const vouchersItems = vouchers.map(voucher => {
    return (
      <div key={Math.random()}>
        <General16
          isNew={false}
          isFavorite={false}
          image={image}
          name={voucher.description}
          vouchedId={voucher.voucherId}
          price={voucher.price}
          currency={voucher.currency}
          onBuy={onBuy}
        />
      </div>
    )
  })

  return vouchersItems.length === 0 ? (
    <div style={{ margin: '0 auto', width: 'max-content', fontSize: '20px' }}>
      Voucher`s list is empty
    </div>
  ) : (
    <VouchersCarts>{vouchersItems}</VouchersCarts>
  )
}
