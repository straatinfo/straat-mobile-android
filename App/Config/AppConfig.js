import '../I18n/I18n'

import { Languages, Url, Keys } from './../Services/Constant'

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  // change here if you want to force not in debug mode
  DEBUG: __DEV__,
  DEBUG: false,
  // my custom language setting ENGLISH/ DUTCH
  // language: __DEV__ ? Languages.ENGLISH : Languages.DUTCH,

  language: Languages.ENGLISH,

  // STAGING, LOCAL ,STAGING_heroku_ni_boboy: backen@
  ApiUrl: Url.STAGING_heroku_ni_boboy,

  url: Url,

  keys: Keys,

  apiTimeout: 60000
}
