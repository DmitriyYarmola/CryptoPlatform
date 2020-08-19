import React from 'react'
import QRCode from 'qrcode.react'
import { TxnTable } from './TxnTable'

export const PaymentDetails = ({
  address,
  amount,
  convertionRate,
  transactions,
  showsuccessResult,
  rateUSD,
}) => {
  console.log(rateUSD, convertionRate)
  return (
    <div className="card" style={{ height: '100vh' }}>
      <div className="card-header">
        <div>
          <div style={{ fontSize: 30, marginBottom: '30px', textAlign: 'center' }}>
            Payment Details
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ float: 'left' }}>
              <div>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    paddingRight: '10px',
                  }}
                >
                  Address :
                </span>
                <span>{address}</span>
              </div>
              <div style={{ display: 'flex', marginTop: '20px' }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginTop: '60px',
                    paddingRight: '10px',
                  }}
                >
                  QR Code :
                </div>
                <QRCode value={address} style={{ marginTop: '10px' }} />
              </div>
              <div style={{ marginTop: '20px' }}>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    paddingRight: '10px',
                  }}
                >
                  Amount :
                </span>
                <span style={{ fontSize: 18 }}>
                  ${amount.toFixed(2)} / {Math.ceil(amount * convertionRate * 10000) / 10000} ETH
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '60px' }}>
          <div
            style={{ fontSize: 16, fontWeight: 'bold', marginBottom: '10px', paddingRight: '10px' }}
          >
            Transactions
          </div>
          <TxnTable
            transactions={transactions}
            locationAmount={amount}
            showsuccessResult={showsuccessResult}
            convertionRate={convertionRate}
            rateUSD={rateUSD}
          />
        </div>
      </div>
    </div>
  )
}
