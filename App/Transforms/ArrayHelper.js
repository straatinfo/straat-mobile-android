/**
 *
 * @param _id, arrays({_id})
 *
 */
export const modelFindById = (_id = '', arrays = [{_id: ''}]) => {
  return arrays.find((obj) => obj._id === _id)
}

/**
 *
 * @param value, array = []
 *
 */
export const isInArray = (value, array = []) => {
  if (array.indexOf(value) >= 0) {
    return true
  } else {
    return false
  }
}
