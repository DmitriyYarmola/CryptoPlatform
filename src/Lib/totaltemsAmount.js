export const totalItemsAmount = data => {
  let total = 0
  if (data.items) {
    data.items.forEach(row => {
      total += Number(row.price) * Number(row.amount)
    })
  }
  return total
}
