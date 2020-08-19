import { createInstance } from 'API/api'

export const deleteItem = (token, itemId) => {
  return createInstance(token).delete(`/items/${itemId}`)
}
