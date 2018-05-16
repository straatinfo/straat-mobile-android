import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation } from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label } from 'native-base'

import LoginActions from '../Redux/LoginRedux'
import ScreenActions from './../Redux/ScreenRedux'
import SplashActions from './../Redux/SplashRedux'
import ReportsActions from './../Redux/ReportsRedux'

import RootStyles from './Styles/RootContainerStyles'
import { Images } from '../Themes'
import Styles from './Styles/SplashStyle'

import AlertBox from '../Components/AlertBox'
import Lang from './../Lib/CutomLanguage'
import { AppData } from '../Redux/commonRedux'
import { designDefault } from '../Transforms/themeHelper'
import { Design } from '../Services/Constant'
import Footer from '../Components/Footer'
import FastImage from 'react-native-fast-image'

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = { progressMessage: Lang.txt_A03, design: Design }

    // set defulat theme
    global.appSetting = Design

    this.props.appStart()
    console.log('this.start()', this.start())
  }
  geo () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords)
        },
        (err) => {
          reject(err)
        })
    })
  }

  async getLocation () {
    const { reportMergeState, reportState: { reportCoordinate } } = this.props
    try {
      const location = await this.geo()
      console.log(location)
      reportMergeState({reportCoordinate: {...reportCoordinate, ...location}})
      this._processedNext()
    } catch (e) {
      this.props.changeLoadingMessage('')
      AlertBox.alert('', Lang.txt_A02, [{text: Lang.txt_A01, onPress: () => this._processedNext()}], { cancelable: false })
    }
  }

  promtGPS () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // gps running
        this.props.changeLoadingMessage('')
        this._processedNext()
      },
      (err) => {
        this.props.changeLoadingMessage('')
        console.log(err)
        AlertBox.alert('', Lang.txt_A02, [{text: Lang.txt_A01, onPress: () => this._processedNext()}], { cancelable: false })
      }
     // { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    )
  }
  async start () {
    // this code is for this component only
    // pre set is set by his.props.appStart()

    const theme = await AppData.getTheme()
    const design = JSON.parse(theme)
    if (design !== null && design.button !== undefined) {
      this.setState({design: design})
      console.log('design', design)
    }
    // clean
    //  const clean = await AppData.clear()

    // check if not logout
  }

  componentDidMount () {
    this.props.changeLoadingMessage(Lang.txt_A03)

    let interval = setInterval(() => {
      // this.promtGPS()
      this.getLocation()
      this.props.changeLoadingMessage('')
      console.log('global.appSetting', global.appSetting)
      clearInterval(interval)
    }, 2000)
  }

  async _processedNext () {
    const navigation = this.props.navigation
    // change current navigation

    const login = await AppData.getLogin()
    const user = JSON.parse(login)
    if (user && user.username && user.password) {
      return navigation.navigate('Login', {login: true, username: user.username, password: user.password, popup: false})
    }

    this.props.change(navigation, 'AccessCodeScreen')
  }

  render () {
    const { loadingMessage, designR } = this.props
    const { design } = this.state
    return (
      <View style={[RootStyles.container]}>
        <View style={[Styles.content]}>
          <View style={Styles.logoHolder}>
            { design.secureUrl === '' && <Image style={[Styles.centerLogo]} source={Images.logo} /> }
            { design.secureUrl !== '' && <FastImage source={{uri: design.secureUrl}} style={[Styles.center]} /> }
          </View>
          <NBText style={[Styles.loadingMessage, {color: design.button}]}>{loadingMessage}</NBText>
        </View>
        <Footer show />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    loadingMessage: state.splash.loadingMessage,
    designR: state.user.design,
    reportState: state.reports
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appStart: (params) => dispatch(LoginActions.appStart(params)),
    changeLoadingMessage: (loadingMessage) => dispatch(SplashActions.changeLoadingMessage(loadingMessage)),
    change: (navigation, route) => dispatch(ScreenActions.change(navigation, route)),
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
