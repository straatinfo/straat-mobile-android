import { Languages } from './../../Services/Constant'
import Configuration from './../../Config/AppConfig'
import English from './languages/en'
import Dutch from './languages/dutch'

let language = English

switch (Configuration.language) {
  case Languages.ENGLISH:
    language = English
    break

  case Languages.DUTCH:
    language = Dutch
    break

  default:
    language = English
}

export default language
