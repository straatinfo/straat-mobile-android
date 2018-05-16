/**
 *
 * @description constants variable used by many styles 
 * @author ArC
 * 
 * some style constant
 */

import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export const FontSizes = {
  f12: { fontSize: 12 },
  f13: { fontSize: 13 },
  f14: { fontSize: 14 },
  f15: { fontSize: 15 },
  f16: { fontSize: 16 },
  f17: { fontSize: 17 },
  f18: { fontSize: 18 },
  f19: { fontSize: 19 }
}

export const WidthSizes = {
  w40: { width: width * 0.40, flex: 1 },
  w50: { width: width / 2, flex: 1 },
  w60: { width: width * 0.60, flex: 1 },
  w90: { width: width * 0.90, flex: 1 }
}
