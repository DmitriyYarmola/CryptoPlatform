import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { FormattedMessage } from 'react-intl'
import { NavLink } from 'react-router-dom'

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  column-gap: 15px;
  justify-content: end;
`
export const BalanceItem = ({
  valute,
  count,
  onNewDeposit,
  usdRate,
  activeUser,
  administrator,
}) => {
  console.log(activeUser, administrator)
  const rate = !Number(usdRate) ? 1 : Number(usdRate)
  return (
    <div className="card">
      <div>
        <div className="py-3 px-4">
          <div className="d-flex flex-wrap-reverse align-items-center pb-3">
            <div className="mr-auto">
              <div className="text-uppercase font-weight-bold font-size-24 text-dark">
                {valute}: {Number(count).toFixed(4)}
              </div>
              <div className="font-size-18">
                ${rate !== 'N/A' ? Number(count * rate).toFixed(2) : ''}
              </div>
            </div>
            {activeUser === administrator && (
              <Actions>
                <Button type="dashed" onClick={onNewDeposit} className="button button-deposit">
                  <FormattedMessage id="balance.userBalance.newDeposit" />
                </Button>
                <NavLink
                  to={{
                    pathname: '/balances/withdraw',
                    state: { valuteType: valute },
                  }}
                >
                  <Button type="dashed" danger>
                    <FormattedMessage id="balance.userBalance.withdraw" />
                  </Button>
                </NavLink>
                <NavLink to={{ pathname: '/balances/exchange', state: { valuteType: valute } }}>
                  <Button type="dashed"><FormattedMessage id="balance.userBalance.exchange" /></Button>
                </NavLink>
              </Actions>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
