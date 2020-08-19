import React from 'react'
import { Notification } from 'UI/Atoms'
import styled from 'styled-components'

const Notifications = styled.div`
  margin-top: 15px;
`
export const NotificationsSmall = ({ notifications }) => {
  return (
    <Notifications>
      {notifications.map((notification, index) => {
        if (index <= 4)
          return (
            <Notification
              key={notification.id}
              status={notification.state}
              address={notification.address}
              date={notification.timestamp}
            />
          )
        return null
      })}
    </Notifications>
  )
}
