import React from 'react'
import styled from 'styled-components'
import { Input, Select, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
// import Form from 'antd/lib/form/Form'

const { Option } = Select
const PositionWrapped = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`
const Wrapped = styled.div`
  text-align: center;
  width: 500px;
  background: rgba(255, 255, 255, 1);
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
`
const H2 = styled.h2``
const ButtonsWrapped = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  column-gap: 30px;
  justify-content: center;
`

const Exhange = styled.div``
const BuyValute = styled.div``
const SellValute = styled.div``
const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  margin: 50px 0;
`
const ActionsField = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 15px;
`
const ActionsType = styled.div`
  margin-bottom: 20px;
  font-size: 25px;
`
export const ConversionForm = ({
  valuteType,
  listActiveValutes,
  listPasiveValutes,
  onChangeActiveValute,
  activeValue,
  pasiveValue,
  onSelectActiveValute,
  onSelectPassiveValute,
  onChangePasiveValute,
  onSubmit,
}) => {
  const history = useHistory()
  return (
    <PositionWrapped>
      <Wrapped>
        <H2>
          <FormattedMessage id="title.exchangeCurrency" />
        </H2>
        <Exhange>
          <Actions>
            <SellValute>
              <ActionsType>
                <FormattedMessage id="balance.sell" />
              </ActionsType>
              <ActionsField>
                <Input value={activeValue} onChange={onChangeActiveValute} />
                {valuteType === 'USD' ? (
                  <Select
                    defaultValue="USD"
                    style={{ width: '100%' }}
                    onChange={onSelectPassiveValute}
                  >
                    <Option value="USD">USD</Option>
                  </Select>
                ) : (
                  <Select
                    defaultValue={valuteType}
                    style={{ width: '100%' }}
                    onChange={onSelectActiveValute}
                  >
                    {listActiveValutes.map(valute => {
                      return (
                        <Option value={valute} key={valute}>
                          {valute}
                        </Option>
                      )
                    })}
                  </Select>
                )}
              </ActionsField>
            </SellValute>
            <BuyValute>
              <ActionsType>
                <FormattedMessage id="balance.buy" />
              </ActionsType>
              <ActionsField>
                <Input value={pasiveValue} onChange={onChangePasiveValute} />
                {valuteType === 'USD' ? (
                  <Select
                    defaultValue="BTC"
                    style={{ width: '100%' }}
                    onChange={onSelectPassiveValute}
                  >
                    {listPasiveValutes.map(valute => {
                      return (
                        <Option value={valute} key={valute}>
                          {valute}
                        </Option>
                      )
                    })}
                  </Select>
                ) : (
                  <Select
                    defaultValue="USD"
                    style={{ width: '100%' }}
                    onChange={onSelectPassiveValute}
                  >
                    <Option value="USD">USD</Option>
                  </Select>
                )}
              </ActionsField>
            </BuyValute>
          </Actions>
          <ButtonsWrapped>
            <Button type="dashed" danger onClick={() => history.goBack()}>
              <FormattedMessage id="button.cancel" />
            </Button>
            <Button type="dashed" onClick={onSubmit}>
              <FormattedMessage id="balance.userBalance.exchange" />
            </Button>
          </ButtonsWrapped>
        </Exhange>
      </Wrapped>
    </PositionWrapped>
  )
}
