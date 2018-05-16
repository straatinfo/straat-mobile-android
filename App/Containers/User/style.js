import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  linearGradient: {
      //  height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    flex: 1,
      //  height: 50,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10
  },
  button: {
    height: 50
  },
//   logo: {
//     height: 150,
//     width: 150,
//     margin: 5,
//     resizeMode: 'contain'
//   },
  logoHolder: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center'
      //  resizeMode: 'contain'
  },
  inLoginTxt: {
    fontSize: 20,
    color: '#6e85a1',
    marginTop: 10
  },
  spacing: {
    height: 20,
    backgroundColor: 'transparent'
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#bdcadc',
    shadowOffset: {
        width: 0,
        height: 1
      },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  container: {
    flexDirection: 'column',
    flex: 1
  },
  forms: {
      //  height:150,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center'
  },
  upperboxContainer: {
    flex: 1
        // height:200,
  },
  upperbox: {
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  triangleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  triangle: {
    width: 0,
    height: 50,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    backgroundColor: 'transparent',
    transform: [
            {rotate: '180deg'}
      ]
  }
})

export default styles
