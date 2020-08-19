import React, { useEffect } from 'react'
import { Dropdown } from 'antd'
import { NotificationsSmall } from 'UI/Molecules/NotificationsSmall'
import { useDispatch, useSelector } from 'react-redux'
import { AuthSelectors } from 'Features/Auth'
import { NotificationSelectors } from 'pages/Notification'
import styles from './style.module.scss'

export const Actions = () => {
  const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
  const dispatch = useDispatch()
  const token = useSelector(AuthSelectors.token)
  const notifications = useSelector(NotificationSelectors.notifications)

  useEffect(() => {
    dispatch({ type: 'GET_NOTIFICATIONS', payload: { token } })
    const interval = setInterval(() => {
      dispatch({ type: 'GET_NOTIFICATIONS', payload: { token } })
    }, 15000)
    return () => clearInterval(interval)
  }, [dispatch, isAuthenticated, token])

  const menu = (
    <React.Fragment>
      <div className="card cui__utils__shadow width-350 border-0">
        <div className="card-body p-0">
          <NotificationsSmall notifications={notifications} />
        </div>
      </div>
    </React.Fragment>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <div className={styles.dropdown}>
        <i className={`${styles.icon} fe fe-bell`} />
      </div>
    </Dropdown>
  )
}
