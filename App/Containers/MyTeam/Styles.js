import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  // View Containers
  contentContainer: {
    marginTop: 10
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#FFFFFF'
  },
  topHeader: {
    backgroundColor: '#FFFFFF'
  },
  upperboxContainer: {
    // height:200,
  },
  teamContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF'
  },
  leadOptionsView: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#FFFFFF'
  },
  triangleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  teamLogoContainer: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  previewLogoContainer: {
    flex: 1,
    marginTop: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  teamlistContainer: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'transparent'
  },
  teamListView: {
    borderColor: 'black',
    height: 100,
    width: 200,
    borderRadius: 10,
    justifyContent: 'center'
  },
  // FORM VIEWS
  forms: {
    //  height:150,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center'
  },
  itemInput: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#eee',
    borderBottomWidth: 0,
    borderBottomColor: 'gray',
    marginLeft: 0,
    elevation: 1
  },
  // SPACING
  spacing: {
    height: 20,
    backgroundColor: 'transparent'
  },
  spacingWhite: {
    height: 20,
    backgroundColor: '#FFFFFF'
  },
  // BUTTON STYLES
  buttonContainer: {
    flex: 1,
    //  height: 50
    borderRadius: 15,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  buttonLeft: {
    marginRight: 0,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'transparent',
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonRight: {
    marginLeft: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'transparent',
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // IMAGES
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginLeft: 25,
    marginTop: 15
  },
  requestList: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 10
  },
  renderList: {
    flex: 1,
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 10
  },
  linearGradient: {
    //  height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15
  },
  teamlistText: {
    fontSize: 26,
    color: 'black'
  },

  // TEXT
  textColor: {
    color: '#3e3f42'
  },
  textTeamName: {
    fontSize: 35,
    marginTop: 15,
    color: '#3e3f42'
  },
  textTeamEmail: {
    fontSize: 18,
    marginTop: 15,
    color: '#3e3f42'
  },
  textHostName: {
    fontSize: 18,
    color: '#3e3f42'
  }

})

export default Styles
