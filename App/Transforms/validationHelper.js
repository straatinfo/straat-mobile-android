import validator from 'validator'

export const isUrl = (url) => {
  return validator.isURL(url)
}
