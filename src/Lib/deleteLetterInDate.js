export const deleteLetterInDate = items => {
  const rgExp = /[T,Z]/g
  const parserDate = items.map(item => {
    item.date = item.date.replace(rgExp, ' ')
    console.log(item)
    return item
  })
  return parserDate
}
