import React from 'react'
import { AppData } from '../Redux/commonRedux'
import { connect } from 'react-redux'
import { Design } from '../Services/Constant'
import { Images } from '../Themes'
import { Text as NBText } from 'native-base'
import { View, Image } from 'react-native'
import AlertBox from '../Components/AlertBox'
import Footer from '../Components/Footer'
import FastImage from 'react-native-fast-image'
import ReportsActions from './../Redux/ReportsRedux'
import RootStyles from './Styles/RootContainerStyles'
import ScreenActions from './../Redux/ScreenRedux'
import SplashActions from './../Redux/SplashRedux'
import SettingActions from './../Redux/SettingRedux'
import Styles from './Styles/SplashStyle'

class SplashScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = { progressMessage: '', design: Design }
    global.appSetting = Design
  }

  geo () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log('locaiton', position)
          resolve(position.coords)
        },
        (err) => {
          // console.log('locaiton err', err)
          reject(err)
        })
    })
  }

  async getLocation () {
    const { Lang, reportMergeState, settingMergeState, setlogininitReport, reportState: { reportCoordinate } } = this.props
    try {
      const location = await this.geo()
      console.log('location', location)
      // reportMergeState({reportCoordinate: {...reportCoordinate, ...location}}) // will be shift to report redux

      setlogininitReport({lat: location.latitude, long: location.longitude})
      settingMergeState({hasGPS: true})

      this._processedNext()
    } catch (e) {
      __DEV__ && console.log(e)
      this.props.changeLoadingMessage('')
      AlertBox.alert('', Lang.txt_A02, [{text: Lang.txt_A01, onPress: () => this._processedNext()}], { cancelable: false })
    }
  }

  promtGPS () {
    const { Lang } = this.props
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.changeLoadingMessage('')
        this._processedNext()
      }, (err) => {
      console.log(err)
      this.props.changeLoadingMessage('')
      AlertBox.alert('', Lang.txt_A02, [{text: Lang.txt_A01, onPress: () => this._processedNext()}], { cancelable: false })
    }
     // { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    )
  }
  componentDidMount () {
    const { Lang } = this.props
    this.props.changeLoadingMessage(Lang.txt_A03)

    let interval = setInterval(() => {
      this.getLocation()
      this.props.changeLoadingMessage('')
      clearInterval(interval)
    }, 2000)
  }

  async _processedNext () {
    const navigation = this.props.navigation
    const login = await AppData.getLogin()
    const user = JSON.parse(login)
    if (user && user.username && user.password) {
      return navigation.navigate('Login', {login: true, username: user.username, password: user.password, popup: false})
    }

    this.props.change(navigation, 'AccessCodeScreen')
  }

  render () {
    const { loadingMessage } = this.props
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
    reportState: state.reports,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeLoadingMessage: (loadingMessage) => dispatch(SplashActions.changeLoadingMessage(loadingMessage)),
    change: (navigation, route) => dispatch(ScreenActions.change(navigation, route)),
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    setlogininitReport: (params) => dispatch(ReportsActions.setlogininitReport(params)),
    settingMergeState: (newState) => dispatch(SettingActions.settingMergeState(newState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
