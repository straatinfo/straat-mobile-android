import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'column',
    left: 0,
    right: 0
  },
  radioButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  horizontalSpacing: {
    width: 10,
    backgroundColor: 'transparent'
  },
  verticalSpacing: {
    height: 20,
    backgroundColor: 'transparent'
  },
  verticalFieldsSpacing: {
    height: 10,
    backgroundColor: 'transparent'
  },
  textInputContainer: {
    flex: 1,
    // padding: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#bdcadc',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'center',
    flexDirection: 'row',
    
  },
  horizontalContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    height: 50,
    justifyContent: 'center'
  },
  textInput: {
    textAlign: 'right'
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  input: {fontSize: 12},
  alreadyuser: {
    fontSize: 20,
    color: '#96acc7',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center'
  }
})

export default styles
