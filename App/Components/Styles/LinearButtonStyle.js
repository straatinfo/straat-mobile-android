import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    borderColor: '#fff'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 5,
    backgroundColor: Colors.ember
  }
})
