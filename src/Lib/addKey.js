export const addKey = items => {
  const array = items.map((item, index) => {
    item.key = item.id || index + 1
    if (item?.items?.length > 0) {
      item.items.forEach((element, i) => {
        element.key = element?.id || i + 1
      })
    }
    if (item?.invoices) {
      item.invoices.forEach((element, i) => {
        element.key = element?.id || i + 1
      })
    }
    return item
  })
  return array
}
