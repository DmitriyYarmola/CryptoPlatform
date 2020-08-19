/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { SettingsSelectors } from 'Lib/Store/settings'
import { Logo } from 'UI/Atoms'
import { CartSelectors } from 'pages/Invoices/Cart'
import { AuthSelectors } from 'Features/Auth'
import { useHistory } from 'react-router-dom'
import { LanguageSwitcher } from './Atoms/LanguageSwitcher'
import { Actions } from './Atoms/Actions'
import { UserMenu } from './Atoms/UserMenu'
import style from './style.module.scss'

const Header = styled.div`
  display: ${props => (props.isAuthenticated ? 'flex' : 'grid')};
  grid-template-columns: 1fr 1fr;
`
const ActionsBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  justify-content: end;
  align-items: center;
  width: 100%;
`
const LogoWrapped = styled.div``
export const TopBar = () => {
  const token = useSelector(AuthSelectors.token)
  const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
  const isCartOpen = useSelector(CartSelectors.isCartOpen)
  const logo = useSelector(SettingsSelectors.logo)
  const history = useHistory()

  console.log(isAuthenticated)
  return (
    <Header className={style.topbar} isCartOpen isAuthenticated={isAuthenticated}>
      {(isCartOpen || !isAuthenticated) && (
        <LogoWrapped onClick={() => history.push('/vouchers')} style={{ cursor: 'pointer' }}>
          <div className="mr-4 d-none d-sm-block">
            <Logo logo={logo} />
          </div>
        </LogoWrapped>
      )}
      {isAuthenticated && (
        <ActionsBlock>
          <div className="mr-4 d-none d-sm-block">
            <LanguageSwitcher />
          </div>
          <div className="mr-4 d-none d-sm-block">{token && <Actions />}</div>
          <div className="">
            <UserMenu />
          </div>
        </ActionsBlock>
      )}
      {!isAuthenticated && !isCartOpen && (
        <div
          style={{ color: 'black', fontWeight: '600', gridColumn: 'end', cursor: 'pointer' }}
          onClick={() => history.push('/auth/login')}
        >
          Sign In
        </div>
      )}
    </Header>
  )
}
