export const dateParser = timestamp => {
  return new Date(timestamp).toLocaleString().replace(/\,/g, ' ')
}
