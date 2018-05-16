/*
 * @description: due to logger shown in console, it help to disable it when running prod
 * @required: config file in config folder
 * @author: ArC
 * @return: none
 */

const log = true

module.exports = function (...string) {
  if (log) {
    console.log(...string)
  }
}
