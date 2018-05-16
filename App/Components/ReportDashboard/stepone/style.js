import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    marginLeft: 20,
    marginRight: 20
  },
  cancelBtn: {
    margin: 5,
    resizeMode: 'contain'

  },
  iconStyle: {
    fontSize: 22,
    color: '#646568',
    margin: 5
  },
  cancelBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  }
})

export default styles
