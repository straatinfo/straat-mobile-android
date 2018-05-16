import { StyleSheet, Dimensions } from 'react-native'
const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    marginLeft: 20,
    marginRight: 20
  },
  cancelBtn: {
    height: 20,
    width: 20,
    margin: 5,
    resizeMode: 'contain'

  },
  cancelBtnContainer: {
    height: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#96acc7',
    backgroundColor: 'transparent'
  },
  viewBorder: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c6e1f2',
    marginBottom: 10
  }, 
  verticalSpacing: {
    height: 20,
    backgroundColor: 'transparent'
  },
  taphereContainer: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  tapHere: {
    margin: 5,
    height: 250,
    resizeMode: 'contain'
  },
  radioBtn: {
    height: 50,
    width: 50
  }
})

export default styles
