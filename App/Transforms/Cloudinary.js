import { isUrl } from './validationHelper'

export const crop = (size, url) => {
  if (!url) {
    return ''
  }
  const s = 'https://res.cloudinary.com/hvina6sjo/image/upload/'
  const newSize = 'c_lfill,h_' + size + ',w_' + size + '/'
  const n = url.split(s)
  const returnurl = s + newSize + n[1]
  return returnurl
}

export const cropWH = (sizeW, sizeH, url) => {
  if (!url) {
    return ''
  }
  const s = 'https://res.cloudinary.com/hvina6sjo/image/upload/'
  const newSize = 'c_lfill,h_' + sizeH + ',w_' + sizeW + '/'
  const n = url.split(s)
  const returnurl = s + newSize + n[1]
  return returnurl
}

export const hasImage = (url) => {
  try {
    return isUrl(url)
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getImageUrl = (_profilePic) => {
  try {
    if (_profilePic.secureUrl) {
      return _profilePic.secureUrl
    }
  } catch (e) {
    return ''
  }
}
