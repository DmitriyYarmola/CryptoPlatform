import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AuthSelectors } from 'Features/Auth'
import { Preloader } from 'UI/Atoms'
import { useHistory } from 'react-router-dom'
import { InvoicesActivity } from 'Features/InvoicesActivity'
import { InvoicesSelectors } from '../Model'

const Edit = () => {
  const token = useSelector(AuthSelectors.token)
  const activeInvoice = useSelector(InvoicesSelectors.activeInvoice)
  const isLoading = useSelector(InvoicesSelectors.isLoading)
  const [descriptionInvoice, setDescriptionInvoice] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const conditionForActions = Object.keys(activeInvoice).length === 0

  useEffect(() => {
    if (conditionForActions) history.push('/invoices')
  }, [conditionForActions, history])

  const onAddItem = () => {
    dispatch({
      type: 'Invoices/CREATE_ITEM',
      payload: {
        token,
        activeInvoiceId: activeInvoice.invoiceId,
        invoiceInfo: { description: 'Click edit for editing this item', amount: 0, price: 0 },
      },
    })
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <InvoicesActivity
        setDescriptionInvoice={setDescriptionInvoice}
        descriptionInvoice={descriptionInvoice}
        onAddItem={onAddItem}
        conditionForActions={conditionForActions}
      />
    </>
  )
}

export default Edit
