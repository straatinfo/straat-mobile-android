import { StyleSheet } from 'react-native'
import { FontSizes, WidthSizes } from '../../Lib/Common/Constants';

export default StyleSheet.create({
  ...FontSizes,
  ...WidthSizes,
  container: {
    flex: 1
  },
  statusValue: {
    flexDirection: 'row',
    alignContent: 'center'
  },
  changeStatusCon: {
    backgroundColor: '#09bcad',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    borderRadius: 5
  },
  changeStatusbtnTxt: {
    color: '#fff',
    fontSize: 14
  }
})
