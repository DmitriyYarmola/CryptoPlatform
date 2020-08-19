import { createInstance } from 'API/api'

export const updateItem = (token, item) => {
  console.log(item)
  // let bodyFormData = new FormData()
  return createInstance(token).put(`/items/${item.itemId}`, item)
}
