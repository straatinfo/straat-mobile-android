
// this is shifed to timeUtils
export const formatDate = (pdate) => {
  const myDate = new Date(pdate)
  return myDate.getDate() + '-' + (1 + myDate.getMonth()) + '-' + myDate.getFullYear()
}
