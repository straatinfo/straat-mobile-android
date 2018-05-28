



export const hasCategoryName = (category) => {
  if (category && category.hasOwnProperty('name') === true) {
    return true
  }

  return false
}

export const getCategoryName = (category) => {
  if (hasCategoryName(category)) {
    return category.name.toUpperCase().substring(0, 30)
  }
  return ''
}
