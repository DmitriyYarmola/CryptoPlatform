import React from 'react'
import { useSelector } from 'react-redux'
import { Login } from '../../Features/Auth/Login'
import { AuthSelectors } from '../../Features/Auth/Model'
import { Preloader } from '../../UI/Atoms'

const LoginPage = () => {
  const isLoading = useSelector(AuthSelectors.isLoading)

  return isLoading ? <Preloader /> : <Login />
}

export default LoginPage
