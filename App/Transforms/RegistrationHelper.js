import language from '../Lib/CutomLanguage'
import { usernameSeparator } from '../Services/Constant'
import { emptyUser } from '../Redux/ProfileRedux'

export const checkPassword = (text) => {
  return !!(text.match(/[a-z]/i) && text.match(/\d/i) && text.length > 7)
}

export const formAFieldValidate = (key, value = '') => {
   // katamad gumawa ng solid na validation , ganto nlang muna para hot fix
  if (key === 'firstName') {
    return value.length > 1
  }
  if (key === 'lastName') {
    return value.length > 1
  }
  if (key === 'gender') {
    return value === 'MALE' || value === 'FEMALE'
  }
  if (key === 'username') { // parsed
    return value.length > 1
  }

  if (key === 'password') {
    return checkPassword(value)
  }

  if (key === 'streetName') {
    return value.length > 1
  }
  if (key === 'houseNum') {
    return value > 0
  }
  if (key === 'postalCode') { // parsed
    return value.length > 1
  }
  if (key === 'city') {
    return value.length > 1
  }
  if (key === 'emailAddress') { // parsed
    return value.length > 1
  }
  if (key === 'mobileNumber') { // parsed
    return value.length > 1
  }
  return false
}

/**
 *
 * @description get message for success in registration
 * @param isVolunteer
 * @param isJoinTeam
 * @returns string
 *
 */

export const getSuccessMessage = (isVolunteer, isJoinTeam, lang) => {
  if (isVolunteer) {
    if (isJoinTeam) {
      return lang.txt_C06
    } else {
      // create team
      return lang.success
    }
  } else {
    // no volunteer
    if (isJoinTeam) {
      return lang.txt_C06
    } else {
      // create team
      return lang.txt_D43
    }
  }
}

/**
 *
 * @description identify if newly sign up user will be auto log in or not
 * @param isVolunteer
 * @param isJoinTeam
 * @param username
 * @param password
 * @returns string
 *
 */

export const getLoginParams = (isVolunteer, isJoinTeam, username, password) => {
  if (!isVolunteer && !isJoinTeam) {
    return { login: false }
  } else {
    return { login: true, username: username, password: password, popup: false }
  }
}
/**
 *
 * @description get location of current user
 * @returns promise {location || err} || coords
 *
 */

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        __DEV__ && console.log('position', position)
        resolve({position: position.coords})
      },
      (err) => {
        __DEV__ && console.log('position', err)
        resolve({err: err})
      })
  })
}

/**
 *
 * @description remove _ID:string in username
 * @returns {name, nameId}
 * @example -> teset_D:xBqi -> {name: teset, nameId:_D:xBqi }
 *
 */

export const userNameStripId = (username = '') => {
  const us = username.split(usernameSeparator)
  if (us.length > 1) {
    // valid userName, it has usernameSeparator
    return {name: us.slice(0, -1).join(usernameSeparator), nameId: us.slice(-1).join()}
  }
  // no spit happen
  return {name: username, nameId: ''}
}

export const toUserModel = (user) => {
  const usr = {}
  // it uses profile redux emptyUser
  for (let s in emptyUser) {
    usr[s] = user[s]
  }
  const obuserName = userNameStripId(user.username)
  usr['usernameID'] = obuserName.nameId
  usr['usernamePre'] = obuserName.name
  return usr
}

export const cleanPostalCode = (postalCode) => {
  return postalCode.replace(/\s+/g, '')
}
