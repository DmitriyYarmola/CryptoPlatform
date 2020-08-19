import React from 'react'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthSelectors } from 'Features/Auth'
import WithdrawForm from 'UI/Organisms/Forms/WithdrawForm'

const Withdraw = () => {
  const token = useSelector(AuthSelectors.token)
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  if (!location.state) return <Redirect to="/balances" />
  const {
    state: { valuteType },
  } = location

  const onSubmit = values => {
    const { amount, address } = values
    const amountToNumber = Number(amount)
    dispatch({
      type: 'WITH_DRAW_BALANCE',
      payload: {
        valuteType: valuteType.toUpperCase(),
        amount: amountToNumber,
        address,
        token,
      },
    })
    history.goBack()
  }

  return <WithdrawForm onSubmit={onSubmit} />
}

export default Withdraw
