/**
 *
 * @param user Model, username, first_name, last_name
 * @returns string full name
 */
export const GetFullName = (user) => {
  return '' + (user.fname || ' ') + ' ' + (user.lname || ' ')
}

/**
 *
 * @param user Model, username, first_name, last_name
 * @returns chatname
 */
export const GetChatName = (user) => {
  return user.username
}
