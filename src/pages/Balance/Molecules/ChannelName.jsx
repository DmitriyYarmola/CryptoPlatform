import React from 'react'
import { ChannelNameForm } from 'UI/Organisms/Forms'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const ChannelName = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { state } = useLocation()

  if (!state) return <Redirect to="/balances" />

  const { valuteType, token } = state

  const onCreateNewDeposit = formData => {
    const { name, description } = formData
    dispatch({
      type: 'GET_QR_CODE',
      payload: { valuteType, token, name, description },
    })
  }

  const onCancel = () => {
    history.goBack()
  }

  return (
    <ChannelNameForm onSubmit={onCreateNewDeposit} onCancel={onCancel} valuteType={valuteType} />
  )
}

export default ChannelName
