import React, { useState } from 'react'
import { ConversionForm } from 'UI/Organisms/Forms'
import { AppSelectors } from 'pages/AppModel'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { AuthSelectors } from 'Features/Auth'

const Exchange = () => {
  const valuteRates = useSelector(AppSelectors.valuteRates)
  const valuteTypes = useSelector(AppSelectors.valuteTypes)
  const location = useLocation()
  const { valuteType } = location.state
  const [pasiveValute, setPasiveValute] = useState(valuteType !== 'USD' ? 'USD' : 'BTC')
  const [activeValute, setActiveValute] = useState(valuteType !== 'USD' ? valuteType : 'USD')
  const [activeValue, setActiveValue] = useState('0')
  const [pasiveValue, setPasiveValue] = useState('0')
  const token = useSelector(AuthSelectors.token)
  const dispatch = useDispatch()
  const history = useHistory()
  const listActiveValutes = valuteTypes.filter(valute => valute !== activeValute)
  const listPasiveValutes = valuteTypes.filter(valute => valute !== pasiveValute)

  const onChangeActiveValute = e => {
    const { value } = e.currentTarget
    setActiveValue(value)
    if (valuteType === 'USD') {
      console.log('pasiveValute', pasiveValute)
      setPasiveValue(Math.ceil((value / valuteRates[pasiveValute].current) * 10000) / 10000)
    } else setPasiveValue(Math.ceil(valuteRates[activeValute].current * value * 10000) / 10000)
  }
  const onChangePasiveValute = e => {
    const { value } = e.currentTarget
    setPasiveValue(value)
    if (valuteType === 'USD') {
      setActiveValue(Math.ceil(value * valuteRates[pasiveValute].current * 10000) / 10000)
    } else setActiveValue(Math.ceil((value / valuteRates[activeValute].current) * 10000) / 10000)
  }
  const onSelectActiveValute = selectValute => {
    setPasiveValue(valuteRates[selectValute].current * activeValue)
    setActiveValute(selectValute)
  }
  const onSelectPassiveValute = selectValute => {
    if (valuteType === 'USD') setPasiveValue(activeValue / valuteRates[selectValute].current)
    setPasiveValute(selectValute)
  }

  const onSendExchange = () => {
    dispatch({
      type: 'SEND_EXCHANGE',
      payload: {
        fsym: activeValute,
        tsym: pasiveValute,
        amount: activeValue,
        price: String(pasiveValue / activeValue),
        token,
      },
    })
    history.goBack()
    setActiveValue('')
    setPasiveValue('')
  }

  return (
    <ConversionForm
      valuteType={valuteType}
      listActiveValutes={listActiveValutes}
      listPasiveValutes={listPasiveValutes}
      valuteRates={valuteRates}
      onChangeActiveValute={onChangeActiveValute}
      onChangePasiveValute={onChangePasiveValute}
      onSelectActiveValute={onSelectActiveValute}
      onSelectPassiveValute={onSelectPassiveValute}
      pasiveValute={pasiveValute}
      activeValue={activeValue}
      pasiveValue={pasiveValue}
      onSubmit={onSendExchange}
    />
  )
}

export default Exchange
