import React from 'react'
import { Helmet } from 'react-helmet'
import Lockscreen from 'Features/Auth/LockScreen'

const SystemLockscreen = () => {
  return (
    <div>
      <Helmet title="Lockscreen" />
      <Lockscreen />
    </div>
  )
}

export default SystemLockscreen
