import React from 'react'
import { FormattedMessage } from 'react-intl'
import { UserOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { UserSelectors } from 'Lib/Store/user'
import { useHistory } from 'react-router-dom'
import styles from './style.module.scss'

export const UserMenu = () => {
  const user = useSelector(UserSelectors.user)
  const history = useHistory()
  const isAdmin = useSelector(UserSelectors.isAdmin)
  const dispatch = useDispatch()
  const logout = e => {
    e.preventDefault()
    dispatch({
      type: 'LOGOUT',
    })
    history.push('/auth/login')
  }

  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <strong>
          <FormattedMessage id="topBar.profileMenu.user" />: {user.name || 'Anonymous'}
        </strong>
        {isAdmin && (
          <div>
            <strong className="mr-1">
              <FormattedMessage id="topBar.profileMenu.billingPlan" />:{' '}
            </strong>
            Super admin
          </div>
        )}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <div>
          <strong>
            <FormattedMessage id="topBar.profileMenu.email" />:{' '}
          </strong>
          {user.email || '— '}
          <br />
          <strong>
            <FormattedMessage id="topBar.profileMenu.phone" />:{' '}
          </strong>
          {user.phone || '— '}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <span>
          <i className="fe fe-user mr-2" />
          <FormattedMessage id="topBar.profileMenu.editProfile" />
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="#" onClick={logout}>
          <i className="fe fe-log-out mr-2" />
          <FormattedMessage id="topBar.profileMenu.logout" />
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className={styles.dropdown}>
        <Avatar className={styles.avatar} shape="square" size="large" icon={<UserOutlined />} />
      </div>
    </Dropdown>
  )
}
