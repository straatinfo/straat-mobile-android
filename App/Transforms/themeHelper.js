import { Design, Languages } from '../Services/Constant'

export const designDefault = Design

/**
 *
 * @param _activeDesign: {
 *           colorOne: '#7e3434',                                    // button color
 *           colorThree: '#812020',                                  // upper beam background color
 *           colorTwo: '#491111'                                     // menu background color,
 *         },
 */

export const convertActiveDesignToDesign = (_activeDesign = {}) => {
  const { isSpecific } = _activeDesign

  if (isSpecific !== true) {
    return designDefault
  }
  const button = _activeDesign.colorOne ? _activeDesign.colorOne : designDefault.button
  // const button2 = _activeDesign.colorOne ? colorMinus(_activeDesign.colorOne, 50) : colorMinus(designDefault.button, 50)
  const button2 = _activeDesign.colorOne ? lighten(0.45, _activeDesign.colorOne) : lighten(0.45, designDefault.button)                                    // minus button color ,use in grandients
  const header = _activeDesign.colorTwo ? _activeDesign.colorTwo : designDefault.header
  const background = _activeDesign.colorThree ? _activeDesign.colorThree : designDefault.background
  const secureUrl = _activeDesign._profilePic ? _activeDesign._profilePic.secure_url || '' : ''
  return {button, button2, header, background, secureUrl, isSpecific}
}

/**
 *
 * @description convert hex corlor to lighten
 * @param hex color '#fffff'
 *
*/
export const colorMinus = (Hexcolor = '#7e3434', value = 20) => {
  return '#' + hexFixer(10, 16, (hexFixer(16, 10, Hexcolor.replace('#', '0x')) - value))
}

export const hexFixer = (fromBase, toBase, value) => {
  if (value === '') {
    value = 0
  }
  value = parseInt(value, fromBase)
  return Number(value).toString(toBase).toUpperCase()
}

export const lighten = (p, c0, c1) => {
  const n = p < 0 ? p * -1 : p
  const u = Math.round
  const w = parseInt
  if (c0.length > 7) {
    const f = c0.split(',')
    const t = (c1 || p < 0 ? 'rgb(0,0,0)' : 'rgb(255,255,255)').split(',')
    const R = w(f[0].slice(4))
    const G = w(f[1])
    const B = w(f[2])
    return 'rgb(' + (u((w(t[0].slice(4)) - R) * n) + R) + ',' + (u((w(t[1]) - G) * n) + G) + ',' + (u((w(t[2]) - B) * n) + B) + ')'
  } else {
    const f = w(c0.slice(1), 16)
    const t = w((c1 || p < 0 ? '#000000' : '#FFFFFF').slice(1), 16)
    const R1 = f >> 16
    const G1 = f >> 8 & 0x00FF
    const B1 = f & 0x0000FF
    return '#' + (0x1000000 + (u(((t >> 16) - R1) * n) + R1) * 0x10000 + (u(((t >> 8 & 0x00FF) - G1) * n) + G1) * 0x100 + (u(((t & 0x0000FF) - B1) * n) + B1)).toString(16).slice(1)
  }
}

export const getHostLangauge = (host) => {
  if (!host) {
    return Languages.DUTCH
  }
  
  const languageSetting = host.language
  if (languageSetting) {
    if (
      languageSetting === Languages.ENGLISH ||
      languageSetting === Languages.DUTCH
    ) {
      return languageSetting
    }
  }
  return Languages.DUTCH
}
