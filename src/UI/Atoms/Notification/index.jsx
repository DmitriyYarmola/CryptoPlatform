/* eslint-disable no-nested-ternary */
import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import style from './style.module.scss'

const NotificationItem = styled.div`
  padding: 10px;
`
export const Notification = ({ status, date, address }) => {
  console.log(status)
  return (
    <NotificationItem className="text-gray-6">
      <ul className="list-unstyled">
        <li className="mb-3">
          <div className={style.head}>
            <p className={style.title}>
              <FormattedMessage id="topBar.status" />: 
              {status === 'PENDING' ? (
                <span className="account_creation text-danger font-weight-bold">
                  <FormattedMessage id="status.pending" />
                </span>
              ) : status === 'PENDING_CONFIRMATION' ? (
                <span className="account_creation text-primary font-weight-bold">
                  <FormattedMessage id="status.pendingConfimation" />
                </span>
              ) : (
                status === 'CONFIRMED' && (
                  <span className="account_creation text-success font-weight-bold">
                    <FormattedMessage id="status.confimated" />
                  </span>
                )
              )}
            </p>
            <time className={style.time}>{date}</time>
          </div>
          <p>{address}</p>
        </li>
      </ul>
    </NotificationItem>
  )
}
