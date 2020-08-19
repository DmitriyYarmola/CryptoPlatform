import React, { useState } from 'react'
import styled from 'styled-components'
import SubMenu from 'antd/lib/menu/SubMenu'
import { Menu, DatePicker, Radio } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'

const { RangePicker } = DatePicker

const Filters = styled.div`
  margin-bottom: 15px;
  display: grid;
  justify-content: center;
  grid-template-columns: 80px 1fr;
`
const FilterButton = styled.div`
  height: max-content;
  background: rgb(255 255 255);
  font-size: 18px;
  text-align: center;
  padding: 10px;
  border: 1px solid rgb(0 0 0 / 20%);
  border-radius: 5px;
  cursor: pointer;
`
const Wrapped = styled.div`
  overflow: hidden;
`

export const FiltersComponent = ({
  onSelectUser,
  transactionTypes,
  valuteTypes,
  merchants,
  isAdmin,
  onSelectCryptoType,
  cryptoType,
  onSelectTransactionType,
  transactionType,
}) => {
  const [isOpenFilters, setIsOpenFilters] = useState(false)

  const users = merchants.map(merchant => {
    return (
      <Menu.Item key={merchant.username} onClick={onSelectUser}>
        {merchant.username}
      </Menu.Item>
    )
  })

  const transactions = transactionTypes.map(transaction => {
    return <Radio value={transaction}>{transaction}</Radio>
  })

  const valutes = valuteTypes.map(valute => {
    return <Radio value={valute}>{valute}</Radio>
  })

  const intl = useIntl()
  const filterCryptoType = intl.formatMessage({ id: 'form.inputId' })
  const filterTransactionType = intl.formatMessage({ id: 'form.inputId' })
  const filterSelectUser = intl.formatMessage({ id: 'form.inputId' })
  const filterSelectDate = intl.formatMessage({ id: 'form.inputId' })
  const datePickerFrom = intl.formatMessage({ id: 'form.inputId' })
  const datePickerTo = intl.formatMessage({ id: 'form.inputId' })

  return (
    <Filters>
      <FilterButton onClick={() => setIsOpenFilters(!isOpenFilters)}>
        <FormattedMessage id="transaction.filters" />
      </FilterButton>
      <Wrapped className="wrapped">
        <Menu
          style={{ width: 256 }}
          mode="inline"
          className={`menu-filter ${isOpenFilters ? 'openFilters' : ''}`}
        >
          <SubMenu key="sub1" title={filterCryptoType} className="subMenu-crypto">
            <Radio.Group onChange={onSelectCryptoType} valute={cryptoType}>
              {valutes}
              <Radio value="all">All</Radio>
            </Radio.Group>
          </SubMenu>
          <SubMenu key="sub3" title={filterTransactionType} className="subMenu-transactions">
            <Radio.Group onChange={onSelectTransactionType} valute={transactionType}>
              {transactions}
              <Radio value="all">All</Radio>
            </Radio.Group>
          </SubMenu>
          {isAdmin && (
            <SubMenu key="sub4" title={filterSelectUser}>
              {users}
            </SubMenu>
          )}
          <SubMenu key="sub5" title={filterSelectDate}>
            <span>
              <RangePicker placeholder={[`${datePickerFrom}`, `${datePickerTo}`]} />
            </span>
          </SubMenu>
        </Menu>
      </Wrapped>
    </Filters>
  )
}
