import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation } from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, Icon} from 'native-base'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyles'
import { Images, Metrics } from '../Themes'
import { ScreenActions } from '../Redux/ScreenRedux'
import UserActions from '../Redux/UserRedux'
//import LoginActions from '../Redux/LoginRedux'

import AlertMessage from './../Components/AlertMessage'
import BusyIndicator from 'react-native-busy-indicator'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import HeaderBigCenterLogo from './../Components/HeaderBigCenterLogo'
import HeaderTextField from './../Components/HeaderTextField'
import RegisterUserData from './../Components/RegisterUserData'
import UnderMigration from './../Components/UnderMigration'
import RegistrationForm from './../Containers/Registration/RegistrationForm'
import AppConfig from '../Config/AppConfig';

class NewUserForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func,
    error: PropTypes.string
  };

  isAttempting = false;
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth - 40 },
      loginButtonDisabled: true}
    this.alertDefault = {
      title: 'jaylord',
      icon: 'home',
      style: {},
      show: true
    }
    this.isAttempting = false
    
  }

  componentWillMount () {
 //   this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
 //   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
 //   this.keyboardDidShowListener.remove()
 //   this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: { width: 100, height: 70 }
    })
  }

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth - 40 }
    })
  }

  render () {
    return (
      <Container>
        {/** for debugging  */}
        { AppConfig.DEBUG === true &&
          <View>
            <NBText>isValidatedUserName:   { this.props.isValidatedUserName ? 'true' : 'false'}</NBText>
            <NBText>isValidatedUserEmail:  { this.props.isValidatedUserEmail ? 'true' : 'false'}</NBText>
            <NBText>isValidatedPostalCode: { this.props.isValidatedPostalCode ? 'true' : 'false'}</NBText>
            <NBText>isValidatedPhoneNumber:{ this.props.isValidatedPhoneNumber ? 'true' : 'false'}</NBText>
            <NBText>isValidatedTeamName:   { this.props.isValidatedTeamName ? 'true' : 'false'}</NBText>
            <NBText>isValidatedTeamEmail:  { this.props.isValidatedTeamEmail ? 'true' : 'false'}</NBText>
            <NBText>isValidatedHouseNumber:{ this.props.isValidatedHouseNumber ? 'true' : 'false'}</NBText>
            
            <NBText>registrationUserName:  { this.props.registrationUserName }</NBText>
            <NBText>accessCode:            { this.props.accessCode ? this.props.accessCode : 'false'}</NBText>
            <NBText>teamList:              { this.props.teamList ? 'true' : 'false'}{ console.log('teamlist in form screen', this.props.teamList)}</NBText>
          </View>
        }
        <RegistrationForm {...this.props} />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.user.fetching,
    error: state.user.error,
    hostId: state.user.hostId,
    accessCode: state.user.accessCode,
    registrationUserName: state.user.registrationUserName,
    registrationUserEmail: state.user.registrationUserEmail,
    registrationPostalCode: state.user.registrationPostalCode,
    registrationGeoLocation: state.user.registrationGeoLocation,
    registrationStreetName: state.user.registrationStreetName,
    registrationCity: state.user.registrationCity,
    registratioPhoneNumber: state.user.registratioPhoneNumber,
//    validatedCreateTeam: state.user.validatedCreateTeam,
    registrationTeamName: state.user.registrationTeamName,
//    registrationTeamEmail: state.user.registrationTeamEmail,
    isValidatedUserEmail: state.user.isValidatedUserEmail,
    isValidatedPostalCode: state.user.isValidatedPostalCode,
    isValidatedHouseNumber: state.user.isValidatedHouseNumber,
    isValidatedCity: state.user.isValidatedCity,
    isValidatedPhoneNumber: state.user.isValidatedPhoneNumber,
    isValidatedUserName: state.user.isValidatedUserName,
    isValidatedTeamName: state.user.isValidatedTeamName,
    isValidatedTeamEmail: state.user.isValidatedTeamEmail,
    teamPhotoUploaded: state.user.teamPhotoUploaded,
    teamList: state.user.teamList,
    design: state.user.design,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  console.log(' CurrentUserActions', UserActions)
  return {
    registerSetUsername: (userName, primeUserName) => dispatch(UserActions.registerSetUsername(userName, primeUserName)),
    registerSetEmail: (userEmail) => dispatch(UserActions.registerSetEmail(userEmail)),
    registerSetPostalcode: (postalCode) => dispatch(UserActions.registerSetPostalcode(postalCode)),
    registerSetHouseNumber: (postalCode, houseNumber) => dispatch(UserActions.registerSetHouseNumber(postalCode, houseNumber)),
    registerSetCity: (city) => dispatch(UserActions.registerSetCity(city)),
    registerSetPhonenumber: (phoneNumber) => dispatch(UserActions.registerSetPhonenumber(phoneNumber)),
    registerSetTeamname: (teamName, isVolunteer) => dispatch(UserActions.registerSetTeamname(teamName, isVolunteer)),
    registerSetTeamemail: (teamEmail) => dispatch(UserActions.registerSetTeamemail(teamEmail)),
    getTeamlist: (_host, isVolunteer) => dispatch(UserActions.getTeamlist({_host, isVolunteer})),
    setTeamPhoto: (photo) => dispatch(UserActions.setTeamPhoto(photo)),
    registerRequest: (registrationData, navigation, route) => dispatch(UserActions.registerRequest({registrationData, navigation, route})),
    change: (navigation, route) => dispatch(ScreenActions.change(navigation, route)),
    userMergeState: (newState) => dispatch(UserActions.mergeState(newState)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm)

/**
{() => this.password._root.focus()} />
 */
