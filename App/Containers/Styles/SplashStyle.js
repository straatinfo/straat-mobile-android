import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.background
  },

  logoHolder: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  content: {
    alignSelf: 'center'
  },
  centerLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  center: {
    width: 150,
    height: 150,
    alignSelf: 'center'
  },
  loadingMessage: {
    fontSize: 30,
    color: '#d1307b',
    textAlign: 'center'
  }
})
