import React from 'react'
import './style.sass'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import styled from 'styled-components'

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
`

const Wrapped = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translale(-50%, -50%);
  z-index: 10000;
`
export const Preloader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />

  return (
    <Loader>
      <Wrapped>
        <Spin indicator={antIcon} size="large" />
      </Wrapped>
    </Loader>
  )
}
