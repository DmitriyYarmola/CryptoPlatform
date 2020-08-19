import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, message } from 'antd'
import { AuthSelectors } from 'Features/Auth'
import { useHistory } from 'react-router-dom'
import { InformationTable } from 'UI/Organisms'
import { FormattedMessage } from 'react-intl'
import { InvoicesSelectors, InvoicesActions } from './Model'

const Invoices = () => {
  const invoices = useSelector(InvoicesSelectors.invoices)
  const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
  const token = useSelector(AuthSelectors.token)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch({ type: 'SET_CART_OPEN', payload: false })
  }, [dispatch])

  useEffect(() => {
    dispatch({ type: 'Invoices/GET_INVOICES', payload: { token } })
  }, [dispatch, token])

  const createInvoice = () => {
    dispatch(InvoicesActions.setActiveInvoice({}))
    history.push('/invoices/create')
  }

  const deleteInvoice = invoiceId => {
    dispatch({ type: 'Invoices/DELETE_INVOICE', payload: { token, invoiceId } })
  }

  const editInvoice = invoice => {
    dispatch(InvoicesActions.setActiveInvoice(invoice))
    history.push('/invoices/edit')
  }

  const onShareLink = () => {
    message.success('The link was copied successful!')
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <Button
            onClick={createInvoice}
            type="primary"
            style={{ display: 'block', marginBottom: '16px' }}
          >
            <FormattedMessage id="invoice.add" />
          </Button>
        </div>
        <div className="card-body">
          <InformationTable
            isAuthenticated={isAuthenticated}
            data={invoices}
            onEdit={editInvoice}
            onDelete={deleteInvoice}
            onShareLink={onShareLink}
            pageParam="invoices"
          />
        </div>
      </div>
    </>
  )
}
export default Invoices
