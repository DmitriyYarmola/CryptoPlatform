import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LoginForm } from '../../../UI/Organisms/Forms'
import { AuthSelectors, AuthTypes } from '../Model'

export const Login = () => {
  const invalidCredentials = useSelector(AuthSelectors.invalidCredentials)
  const dispatch = useDispatch()

  const onLogin = formData => {
    dispatch({
      type: AuthTypes.ON_LOGIN,
      payload: formData,
    })
  }
  return <LoginForm invalidCredentials={invalidCredentials} onFinish={onLogin} />
}
