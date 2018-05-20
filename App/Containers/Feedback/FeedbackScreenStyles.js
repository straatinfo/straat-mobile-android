import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.background
  },
  form: {
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  item: {
    backgroundColor: Colors.snow,
    marginBottom: 10,
    borderRadius: 5
  },
  button: {
    backgroundColor: 'green',
    marginTop: 24
  },
  buttonText: {
    fontSize: 16,
    color: Colors.silver,
    textAlign: 'center',
    backgroundColor: 'transparent',
    margin: 10

  },
  buttonContainer: {
    flex: 1,
      //  height: 50
    borderRadius: 15,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10
  },
  linearGradient: {
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15
  }
})
