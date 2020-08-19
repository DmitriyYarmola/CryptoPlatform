import React from 'react'
import { useSelector } from 'react-redux'
import { AppSelectors } from 'pages/AppModel'
import { Table } from '../../UI/Organisms'

export const Notifications = ({ notifications }) => {
  const valuteRates = useSelector(AppSelectors.valuteRates)
  return <Table data={notifications} valuteRates={valuteRates} />
}
