/* eslint-disable no-shadow */
import React from 'react'
import { useSelector } from 'react-redux'
import { BalanceItem } from 'UI/Molecules'
import { useHistory } from 'react-router-dom'
import { AuthSelectors } from '../../../Features/Auth'

export const BalanceItemInformation = React.memo(
  ({ valute, count, usdRate, defaultValute, activeUser, administrator, usdRateT }) => {
    const token = useSelector(AuthSelectors.token)
    const history = useHistory()

    const onSetChannelName = () => {
      history.push({
        pathname: '/balances/channelName',
        state: { valuteType: valute.toUpperCase(), token },
      })
    }
    return (
      <>
        <BalanceItem
          onNewDeposit={onSetChannelName}
          valute={valute}
          count={count}
          usdRate={usdRate}
          usdRateT={usdRateT}
          defaultValute={defaultValute}
          activeUser={activeUser}
          administrator={administrator}
        />
      </>
    )
  },
)
