import React from 'react'
import { ViewItems } from 'UI/Organisms'

export const CartStep = ({ invoiceById, renderTotalAmount }) => {
  return (
    <div>
      <ViewItems data={invoiceById} />
      <div className="text-right clearfix mt-4">
        <div className="pull-right">
          <p>
            <strong>
              Grand Total: <span>${renderTotalAmount().toFixed(2)}</span>
            </strong>
          </p>
          <br />
        </div>
      </div>
    </div>
  )
}
