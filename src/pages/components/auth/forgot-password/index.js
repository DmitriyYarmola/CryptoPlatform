import React from 'react'
import { Helmet } from 'react-helmet'
import ForgotPassword from 'Features/Auth/ForgetPassword'

const SystemForgotPassword = () => {
  return (
    <div>
      <Helmet title="Forgot Password" />
      <ForgotPassword />
    </div>
  )
}

export default SystemForgotPassword
