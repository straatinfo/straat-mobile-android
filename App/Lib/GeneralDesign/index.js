import { Languages } from './../../Services/Constant'
import Configuration from './../../Config/AppConfig'
import Settings from './default'

let GeneralDesign = Settings

switch (Configuration.language) {
  // true as of now while i dont have time for general dsign
  case Languages.ENGLISH:
  GeneralDesign = Settings
    break

  case Languages.DUTCH:
  GeneralDesign = Settings
    break

  default:
  GeneralDesign = Settings
}

export default GeneralDesign
