import React from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { QrCodeForm } from 'UI/Organisms/Forms'
import { message } from 'antd'

const NewDeposit = () => {
  const location = useLocation()

  if (!location.state) return <Redirect to="/balances" />
  const {
    state: {
      qrCodeInformation: { address },
      valuteType,
      description,
    },
  } = location

  const onCopyAddress = () => {
    message.success('Address copied successful')
  }

  return (
    <QrCodeForm
      address={address}
      description={description}
      valuteType={valuteType}
      onCopyAddress={onCopyAddress}
    />
  )
}

export default NewDeposit
