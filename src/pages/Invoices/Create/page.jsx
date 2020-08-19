import React, { useState } from 'react'
import { AuthSelectors } from 'Features/Auth'
import { useSelector, useDispatch } from 'react-redux'
import { Preloader } from 'UI/Atoms'
import { InvoicesActivity } from 'Features/InvoicesActivity'
import { InvoicesSelectors } from '../Model'

const Create = () => {
  const token = useSelector(AuthSelectors.token)
  const activeInvoice = useSelector(InvoicesSelectors.activeInvoice)
  const isLoading = useSelector(InvoicesSelectors.isLoading)
  const [descriptionInvoice, setDescriptionInvoice] = useState('')
  const dispatch = useDispatch()

  const conditionForActions = Object.keys(activeInvoice).length === 0
  console.log(conditionForActions)
  const onCreateInvoiceAndAddItem = () => {
    if (conditionForActions) {
      dispatch({
        type: 'Invoices/CREATE_NEW_INVOICE',
        payload: {
          description: descriptionInvoice,
          token,
          total: 0,
          amount: 0,
          invoiceInfo: { description: 'Click edit for editing this item', amount: 0, price: 0 },
        },
      })
    } else {
      dispatch({
        type: 'Invoices/CREATE_ITEM',
        payload: {
          token,
          activeInvoiceId: activeInvoice.invoiceId,
          invoiceInfo: { description: 'Click edit for editing this item', amount: 0, price: 0 },
        },
      })
    }
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <InvoicesActivity
        setDescriptionInvoice={setDescriptionInvoice}
        descriptionInvoice={descriptionInvoice}
        onAddItem={onCreateInvoiceAndAddItem}
        conditionForActions={conditionForActions}
      />
    </>
  )
}

export default Create
