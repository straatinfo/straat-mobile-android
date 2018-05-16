import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation, BackAndroid } from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, Icon} from 'native-base'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import { ScreenActions } from '../Redux/ScreenRedux'
//import { UserActions } from './../Redux/UserRedux'
import  AccessCodeActions from  './../Redux/AccessCodeRedux'
import  UserActions from  './../Redux/UserRedux'
import LoginActions from '../Redux/LoginRedux'
import AlertMessage from './../Components/AlertMessage'
import BusyIndicator from 'react-native-busy-indicator'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import Lang from './../Lib/CutomLanguage'
import HeaderBigCenterLogo from './../Components/HeaderBigCenterLogo'
import HeaderTextField from './../Components/HeaderTextField'
import UnderMigration from './../Components/UnderMigration'
import HasAccessCodeOrNone from './../Components/AccessCode/HasAccessCodeOrNone'
import HasAccessCode from './../Components/AccessCode/HasAccessCode'
import NoAccessCode from './../Components/AccessCode/NoAccessCode'
import RegisterAccessCode from './../Components/AccessCode/RegisterAccessCode'
import Styles from './Styles/LoginScreenStyles'
import Footer from '../Components/Footer';

 

class AccessCodeScreen extends React.Component {
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
      screen: 'HasAccessCodeOrNone', 
      //screen: 'RegisterAccessCode',
      visibleHeight: Metrics.screenHeight,
      show: true,
      accessCode: null
    }
    this.isAttempting = false
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize
    })
  }

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeigh
    })
  }

  switchTo = (childKey) => {
    this.state.setState({screen: childKey})
  }
  _confirmAccessCode = () => {
    console.log('Keyboard', Keyboard)
    Keyboard.dismiss()
    // after success in access code user will redirect to Login
    this.props.confirmAccessCode(this.state.accessCode, this.props.navigation, 'Login')
  }

  _registerAccessCode = (registrationData) => {
    this.props.codeRequest(registrationData, this.props.navigation, 'Splash')
  }

  render () {
    /**
     *  the flow here is
     *     screen splash 
     *     app will ask user if it has a access code
     *        if none then goto: access code registration
     *           back-end wiil process the data and email the user for an accessCode
     *        if yes then goto: acceses code form validation:
     *           if correct then goto: login Screen
     *        if no then app will close saying thank u
     */
    const screen = this.state.screen
    return (
      <Container style={{padding: Metrics.doubleBaseMargin}} key='AccessCodeScreen'>
        { screen === 'HasAccessCodeOrNone' && <HasAccessCodeOrNone parentSetState={this.setState.bind(this)} /> }
        { screen === 'HasAccessCode' && <HasAccessCode parentSetState={this.setState.bind(this)} onProcess={this._confirmAccessCode} /> }
        { screen === 'NoAccessCode' && <NoAccessCode parentSetState={this.setState.bind(this)} /> }
        { screen === 'RegisterAccessCode' && <RegisterAccessCode parentSetState={this.setState.bind(this)} onProcess={this._registerAccessCode} /> }

        <Footer show />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.accessCode.fetching,
    error: state.accessCode.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    change: (navigation, route) => dispatch(ScreenActions.change(navigation, route)),
    confirmAccessCode: (accessCode, navigation, route) => dispatch(UserActions.setAccessCode({accessCode, navigation, route})),
    codeRequest: (registrationData, navigation, route) => dispatch(AccessCodeActions.codeRequest({registrationData, navigation, route}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessCodeScreen)

/**
{() => this.password._root.focus()} />
 */
