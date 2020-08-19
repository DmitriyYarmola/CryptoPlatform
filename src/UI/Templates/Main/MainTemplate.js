import React from 'react'
import { Layout } from 'antd'

import { Menu } from 'Features/Menu'
import { CartSelectors } from 'pages/Invoices/Cart'
import { useSelector } from 'react-redux'
import { AuthSelectors } from 'Features/Auth'
import { TopBar } from '../../../Features/TopBar'

export const MainTemplate = ({ children }) => {
  const isCartOpen = useSelector(CartSelectors.isCartOpen)
  const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
  return (
    <div>
      <Layout>
        {!isCartOpen && isAuthenticated && <Menu />}
        <Layout>
          <Layout.Header>
            <TopBar />
          </Layout.Header>
          <Layout.Content style={{ height: '100%', position: 'relative' }}>
            <div className="cui__utils__content">{children}</div>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  )
}
