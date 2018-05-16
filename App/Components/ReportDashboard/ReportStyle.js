import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
  formContent: {flex: 1, marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 15, flexDirection: 'column'},
  submitText: { fontSize: 18, fontFamily: 'Gill Sans', textAlign: 'center', margin: 10, color: '#ffffff', backgroundColor: 'transparent' },
  roundButton: { borderRadius: 8 },
  buttonHolder: { width: '75%', marginRight: 15},
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },

  cancelBtn: {
    margin: 5,
    resizeMode: 'contain'
  },
  iconStyle: {
    fontSize: 30,
    color: '#6e85a1',
    margin: 5,
    fontWeight: 'bold'
  },
  cancelBtnContainer: {
    // height: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  viewBorder: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c6e1f2',
    marginBottom: 10
  }, 
  viewBorderInner: {
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  reportTitle: {
    marginVertical: 5, color: 'gray', fontWeight:'bold'
  },
  title: {color: '#6e85a1', fontSize: 25, paddingVertical: 10}
})
