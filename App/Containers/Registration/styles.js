import {
    StyleSheet,
    Platform
} from 'react-native'

const styles = StyleSheet.create({
  backgroundColorWhite: {
    backgroundColor: 'white'
  },
  registerStepText: {
    textAlign: 'center'
  },
  registerText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10
  },
  headerButtonRight: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderColor: '#bdcadc',
    borderRadius: 15,
    borderWidth: 1
  },
  headerButtonLeft: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderColor: '#bdcadc',
    borderRadius: 20,
    borderWidth: 1
  },
  registerStepContainer: {
    backgroundColor: 'white'
  },
  registerStep: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,

    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius:20,
    borderBottomLeftRadius:20,
    borderBottomRightRadius: 20,
    borderColor: '#bdcadc',
    borderRadius: 20,
    borderWidth: 1
  },
  // logo: {
  //   height: 120,
  //   width: 120,
  //   resizeMode: 'contain'
  // },  
  logoHolder: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  logo: {
    width: 98,
    height: 98,
    alignSelf: 'center'
  //  resizeMode: 'contain'
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  verticalSpacingWithColor: {
    width: 20,
    backgroundColor: '#bdcadc'
  },
  verticalSpacing: {
    width: (Platform.OS === 'ios') ? 20 : 10,
    backgroundColor: 'transparent'
  },
  horizontalSpacing: {
    height: 20,
    backgroundColor: 'transparent'
  },
  upperBoxContainer: {
    flex: 1,
    height: 250
  },
  upperbox: {
    flex: 1,
    height: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  triangleContainer: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  triangle: {
    flex: 1,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [
            {rotate: '180deg'}
    ]
  }
})

export default styles
