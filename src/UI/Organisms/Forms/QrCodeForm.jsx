import React from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import '../../global-animation.sass'
import { FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const FormWrapped = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: rgb(0 0 0);
`
const FormContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: max-content;
  display: grid;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  padding: 20px;
`
const FormHeader = styled.h2`
  color: rgb(0 0 0);
  margin-bottom: 20px;
`
const FormAddress = styled.span``
const Bold = styled.b``
const QrCodeWrapped = styled.div``
const FormInformation = styled.div`
  display: grid;
  text-align: left;
  margin-top: 20px;
`
const FormActions = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, max-content);
  column-gap: 10px;
  justify-content: center;
`

const FormDescriptions = styled.div``
export const QrCodeForm = ({ address, valuteType, onCopyAddress, description }) => {
  const history = useHistory()
  const downloadQR = () => {
    const canvas = document.querySelector('#qrCode')
    const pngUrl = canvas?.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    const downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = 'qrCode.png'
    document.body.append(downloadLink)
    downloadLink.click()
    downloadLink.remove()
  }

  return (
    <FormWrapped>
      <FormContent>
        <FormHeader>{valuteType}</FormHeader>
        <QrCodeWrapped>
          <QRCode id="qrCode" level="H" style={{ width: 300, height: 300 }} value={address} />
        </QrCodeWrapped>
        <FormInformation>
          <FormAddress>
            <Bold>
              <FormattedMessage id="formQrCode.address" />:{' '}
            </Bold>
            {address}
          </FormAddress>
          <FormDescriptions>
            <Bold>Description:</Bold>
            {description}
          </FormDescriptions>
        </FormInformation>
        <FormActions>
          <Button type="dashed" icon={<DownloadOutlined />} size="large" onClick={downloadQR}>
            <FormattedMessage id="button.download" />
          </Button>
          <CopyToClipboard onCopy={onCopyAddress} text={address}>
            <Button type="dashed" size="large">
              Copy address
            </Button>
          </CopyToClipboard>
          <Button type="dashed" size="large" danger onClick={() => history.push('/balances')}>
            <FormattedMessage id="button.done" />
          </Button>
        </FormActions>
      </FormContent>
    </FormWrapped>
  )
}
