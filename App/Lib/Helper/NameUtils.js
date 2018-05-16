/**
 *
 * @param user Model, username, first_name, last_name
 * @returns string full name
 */
export const GetFullName = (user) => {
  return '' + user.first_name + ' ' + user.last_name
}
