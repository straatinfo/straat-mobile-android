import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  reportItem: {
    flex: 1,
    height: 150,
    alignItems: 'center',
    backgroundColor: 'green',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  reportItemInner: {
    flex: 1,
    backgroundColor: 'white',
    height: 150
  },
  reportImg: {
    width: 100,
    height: 100
  },
  s_r_title: {
    color: '#475a77',
    fontSize: 20,
    textAlign: 'left'
  },
  s_r_date: {
    color: '#475a77',
    fontSize: 15
  },
  s_r_location: {
    color: '#475a77',
    fontSize: 15
  },
  s_r_b_view: {
    paddingTop: 10,
    color: '#c6423b',
    fontSize: 20
  }
})

export default styles
