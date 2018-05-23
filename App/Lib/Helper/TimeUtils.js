/**
 *
 * @param time
 * @returns string Time
 */
export const GetDate = (time) => {
  const date = new Date(time)
  return '' + (date.getMonth() + 1).toString() + '-' + date.getDate() + '-' + date.getFullYear()
}
/**
 *
 * @param time
 * @returns string date, EU time style
 */
export const GetDateEutype = (time) => {
  const date = new Date(time)
  return '' + date.getDate() + '/' + (1 + date.getMonth()).toString() + '/' + date.getFullYear()
}

export const GetTime = (time) => {
  const date = new Date(time)
  return '' + (date.getHours() + 1).toString() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

/**
 * @description return if expired or not
 * @param time
 * @returns string Time
 */
export const isExpired = (time, days = 10) => {
  // 8.64e+8 is tendays
  const present = new Date()
  let afterDays = new Date(time)
  afterDays.setDate(afterDays.getDate() + days)
  return afterDays <= present
}

/**
 * @description return if expired or not
 * @param time
 * @returns string Time
 */
export const isAfterADayDone = (updated, days = 1) => {
  // 8.64e+8 is tendays
  const present = new Date()
  let afterDays = new Date(updated)
  afterDays.setDate(afterDays.getDate() + days)
  return afterDays <= present
}
