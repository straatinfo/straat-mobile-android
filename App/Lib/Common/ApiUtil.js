
const ApiUtil = {
  parseResponse: function (response) {
    return new Promise(function (resolve, reject) {
      if (response.status === 0) {

      } else {

      }
    })
  },

  serverResponseResult: function (errorMsg) {
        // for edit only

    return errorMsg

    if (errorMsg === 'username-incorrect') {
      return 'Username is incorrect.'
    }
  },
  format_date (pdate) {
    const myDate = new Date(pdate)
    return myDate.getDate() + '-' + (1 + myDate.getMonth()) + '-' + myDate.getFullYear()
  }
}

export default ApiUtil
