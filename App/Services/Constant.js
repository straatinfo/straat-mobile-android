
export const Languages = {
    /**
     *
     * @description For English language user
     *
    */
  ENGLISH: 'en',

    /**
     *
     * @description For Dutch language  user
     *
    */
  DUTCH: 'nl'
}

/**
 *
 * @description constants variable used by many
 * @author ArC
 *
*/

export const Url = {
  /**
   *
   * @description Url for local backed access
   *
   */
  LOCAL: 'http://192.168.0.33:5000/',

  /**
   *
   * @description Url for staging backed access
   *
  */
  STAGING: 'https://straatinfo-backend.herokuapp.com/',

  /**
   *
   * @description Url for staging backed access
   *
  */
  STAGING_heroku_ni_boboy: 'https://straatinfo-backend-v2.herokuapp.com/',

  /**
   *
   * @description Url for goolglemap  access
   *
  */
  GOOGLEAPIS: 'https://maps.googleapis.com/',

  /**
   *
   * @description access https://www.postcodeapi.nu/docs/
   *
  */
  POSTCODEAPIS: 'https://api.postcodeapi.nu/'

}

export const Keys = {
  /**
   *
   * @description For map keys used by generating maps end parsing coordinate to location address
   *
  */
  GOOGLE_MAP_KEY: 'AIzaSyCYDM_gyqp1UGVClhh05ek_4G0zr4n55xA',

  /**
   *
   * @description For map keys used by generating maps end parsing coordinate to location address
   *
  */
  POSTCODE_KEY: ''

}

export const Environment = {
  LOCAL: 'LOCAL',
  STAGING: 'STAGING'
}

/**
 *
 * @description because report types is fixed so it does not need tobe fetched
 *              even if it need to fetch, then fetch it and replace this value
 *
*/
export const ReportTypes = {

  /** @description  code: 'A', name: 'Public Space' */
  PUBLIC_SPACE: {
    _id: '5a7888bb04866e4742f74955',
    code: 'A',
    name: 'Public Space'
  },

  /** @description code: 'B', name: 'Safety' */
  SAFETY: {
    _id: '5a7888bb04866e4742f74956',
    code: 'B',
    name: 'Safety'
  },

  /** @description code: 'C', name: 'Communication' */
  COMMUNICATION: {
    _id: '5a7888bb04866e4742f74957',
    code: 'C',
    name: 'Communication'
  }
}

/**
 *
 * @description report Status
 *               new:        0,
 *               inProgress: 1,
 *               done:       2,
 *               expired:    3
 *
*/
export const ReportStatus = {
  new: 'NEW',
  inProgress: 'INPROGRESS',
  done: 'DONE',
  expired: 'EXPIRED'
}

/**
 *
 * @description Design used by some components
 *
*/
export const Design = {
  background: '#f7fcfb',
  button: '#639938',
  button2: '#96c54a',                                      // minus button color ,use in grandients
  header: '#3F51B5',
  isSpecific: false,
  secureUrl: ''
}

/**
 *
 * @description Socket events
 *
*/
export const SocketTypes = {
  RECEIVE_GLOBAL: 'receive-global-msg',
  SEND_GLOBAL: 'send-global-msg',
  REGISTER: 'register',
  DISCONNECT: 'disconnect',
  REPORT: 'REPORT',
  ENTER_CONVO: 'enter-convo',
  SEND_MESSAGE: 'send-message-v2',
  UPDATE_MESSAGE: 'update-message',
  EXIT_CONVO: 'exit-convo',
  RECEIVE_MESSAGE: 'new-message',
  BLOCK_USER: 'BLOCK_USER'

}
/**
 *
 * @description ConvoTypes
 *
*/
export const ConvoTypes = {
  USER: 'PRIVATE',
  TEAM: 'TEAM',
  REPORT: 'REPORT'
}

/**
 *
 * @description convoOptions
 *
*/
export const convoOption = {
  BYID: 'byId',
  BYTYPE: 'byType'
}

/**
 *
 * @description noitifcation types
 *
*/
export const notificationTypes = {
  chat: 'chat',
  reportA: 'reportA',
  reportB: 'reportB',
  reportC: 'reportC'
}

/**
 *
 * @description noitifcation types
 * model + fieldname
*/
export const backEndConstEnum = {
  teamCreationMethod: 'MOBILE'
}

/**
 *
 * @description username separator
 *
 */
export const usernameSeparator = '_ID:'

/**
 *
 * @description statusSource
 *
*/
export const StatusSource = {
  myList: 'myList',
  reportA: 'reportA',
  reportB: 'reportB',
  reportC: 'reportC'
}
