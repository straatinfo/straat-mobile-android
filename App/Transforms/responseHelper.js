/**
 *
 * @param {*} ResquestResponse
 * @description return error mesage if has
 */
export const hasError = (ResquestResponse) => {
  console.log('ResquestResponse, ResquestResponse')
  if (ResquestResponse && ResquestResponse.error && ResquestResponse.message) {
    return ResquestResponse.message
  } else {
    return false
  }
}

/**
 *
 * @param {*} ResquestResponse
 * @description return error mesage if has
 */
export const hasErrorV1 = ({status, message, data}) => {
  if (status === 1) {
    return false
  }
  if (data && data.error) {
    return data.error
  }
  return message || false
}


export const getError = (response) => {
  
  // seccess trans but failed in server
  if (response.ok && response.status === 0) {
    
  }


}