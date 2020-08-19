/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import style from './style.module.scss'

export const AuthTemplate = ({ children }) => {
  const history = useHistory()
  return (
    <Layout>
      <Layout.Content>
        <div>
          <div className={classNames(`${style.topbar}`)}>
            <div className={style.logoContainer}>
              <div className={style.logo}>
                <div className={style.name}>Crypto Platform</div>
              </div>
            </div>
            <div
              style={{ color: 'black', fontWeight: '600', gridColumn: 'end', cursor: 'pointer' }}
              onClick={() => history.push('/vouchers')}
            >
              To vouchers
            </div>
          </div>
          <div className={style.containerInner} style={{ margin: '0 auto' }}>
            {children}
          </div>
        </div>
      </Layout.Content>
    </Layout>
  )
}
