import React from 'react'
import { InvoiceItemsTable } from 'UI/Organisms'
import { Input, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { StepsSelectors, StepsActions } from 'Features/Steps'
import { InvoicesSelectors, InvoicesActions } from 'pages/Invoices'
import { Preloader } from 'UI/Atoms'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { AuthSelectors } from 'Features/Auth'
import { useIntl, FormattedMessage } from 'react-intl'

const PageActions = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 15px;
`

export const InvoicesActivity = ({
  setDescriptionInvoice,
  descriptionInvoice,
  onAddItem,
  conditionForActions,
}) => {
  const token = useSelector(AuthSelectors.token)
  const editingKey = useSelector(StepsSelectors.editingKey)
  const activeInvoice = useSelector(InvoicesSelectors.activeInvoice)
  const isLoading = useSelector(InvoicesSelectors.isLoading)
  const dispatch = useDispatch()
  const history = useHistory()
  const save = (form, record) => {
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      const updateItem = { itemId: record.itemId, ...row }
      dispatch({ type: 'Invoices/UPDATE_ITEM', payload: { token, item: updateItem } })
      dispatch(StepsActions.setEditKey(''))
    })
  }

  const cancel = () => {
    dispatch(StepsActions.setEditKey(''))
  }

  const handleDelete = id => {
    /* eslint-disable-next-line */
    dispatch({
      type: 'Invoices/DELETE_ITEM',
      payload: { token, itemId: id, invoiceId: activeInvoice.invoiceId },
    })
  }

  const isEditing = record => record.id === editingKey

  const edit = id => {
    dispatch(StepsActions.setEditKey(id))
  }

  const onGoToInvoice = () => {
    dispatch(InvoicesActions.setActiveInvoice({}))
    history.push('/invoices')
  }

  const saveInvoice = () => {
    // TODO push changed invoice to backend
    history.push('/invoices')
    dispatch(InvoicesActions.setActiveInvoice({}))
  }

  const intl = useIntl()
  const placeholderDescription = intl.formatMessage({ id: 'invoice.input.description' })

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <Input
        placeholder={placeholderDescription}
        value={descriptionInvoice}
        onChange={e => setDescriptionInvoice(e.currentTarget.value)}
        style={{ marginBottom: '10px' }}
      />
      <PageActions>
        <Button onClick={onGoToInvoice} style={{ gridColumn: 'unset', width: 'max-content' }}>
          <FormattedMessage id="invoice.goTo" />
        </Button>
        <Button
          onClick={onAddItem}
          type="primary"
          style={{ gridColumn: 'end', width: 'max-content' }}
        >
          <FormattedMessage id="invoice.addItem" />
        </Button>
      </PageActions>
      <InvoiceItemsTable
        isEditing={isEditing}
        editingKey={editingKey}
        edit={edit}
        activeInvoice={activeInvoice}
        cancel={cancel}
        save={save}
        deleteItem={handleDelete}
      />
      <Button
        disabled={conditionForActions}
        onClick={saveInvoice}
        style={{ margin: '5px auto', display: 'block' }}
      >
        <FormattedMessage id="invoice.save" />
      </Button>
    </>
  )
}
