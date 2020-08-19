/* eslint-disable react/self-closing-comp */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Preloader } from 'UI/Atoms'
import { AuthSelectors } from 'Features/Auth'
import { Notifications } from 'Features/Notifications'
import { NotificationSelectors } from './Model'

const NotificationPage = () => {
  const token = useSelector(AuthSelectors.token)
  const notifications = useSelector(NotificationSelectors.notifications)
  //   const isLoading = useSelector(NotificationSelectors.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'GET_NOTIFICATIONS', payload: { token } })
    const interval = setInterval(() => {
      dispatch({ type: 'GET_NOTIFICATIONS', payload: { token } })
    }, 15000)

    return () => clearInterval(interval)
  }, [dispatch, token])

  return !notifications ? <Preloader /> : <Notifications notifications={notifications} />
}

export default NotificationPage
