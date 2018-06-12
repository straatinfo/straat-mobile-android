import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
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
    marginBottom: 5,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  content: {flex: 1, marginLeft: 20, marginRight: 20, marginTop: 0, marginBottom: 10, flexDirection: 'column', justifyContent: 'space-between'},
  title: {fontSize: 18, textAlign: 'left', margin: 5, color: '#96acc7', backgroundColor: 'transparent'},
  address: {fontSize: 16, textAlign: 'left', margin: 5, color: '#96acc7', backgroundColor: 'transparent'},
  subTitle: {fontSize: 14, textAlign: 'center', margin: 5, marginBottom: 20, color: '#96acc7', backgroundColor: 'transparent'}
})
