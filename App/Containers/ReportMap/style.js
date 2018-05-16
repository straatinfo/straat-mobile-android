import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  map: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0
    flex: 1,
    width: '100%',
    height: '100%'
    
  },
  slideUpMenuContianer: {
  },
  slideUpMenu: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    position: 'absolute',
    bottom: 0

  },
  txt_E10_container: {
    position: 'absolute',
    flex: 1,
    width: 230,
    bottom: 0
  },

  m_container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  m_report: {

  },
  m_t_container: {
    padding: 5

  },
  m_image: {
      
  },
  m_r_category: {
    color: '#475a77',
    fontSize: 20
  },
  m_r_date: {
    color: '#475a77',
    fontSize: 15
  },
  m_r_note: {
    color: '#475a77',
    fontSize: 15
  },
  m_r_addr: {
    color: '#c6423b',
    fontSize: 15

  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'red'
  },
  pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10
  }

})

export default styles
