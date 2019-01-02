import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base'
import { Images, Metrics } from '../../Themes'
import { ScreenActions } from '../../Redux/ScreenRedux'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import Footer from '../../Components/Footer'
import Spacer from './../../Components/Spacer'
import Styles from './style'
import Triangle from 'react-native-triangle'
import UserActions from './../../Redux/UserRedux'
import validator from 'validator'

class ForgotPasswordScreen extends React.Component {
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
      username: 'userOne',
      password: 'test',
      email: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth - 40 },
      loginButtonDisabled: true
    }
    this.alertDefault = {
      title: 'jaylord',
      icon: 'home',
      style: {},
      show: true
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      this.props.navigation.goBack()
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Login')
      return true
    })
    this._setButtonStatus()
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
      visibleHeight: newSize,
      topLogo: { width: 100, height: 70 },
      isKeyboardVisible: true
    })
  }

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth - 40 },
      isKeyboardVisible: false
    })
  }

  _setButtonStatus = () => {
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      this.setState({loginButtonDisabled: false})
    } else {
      this.setState({loginButtonDisabled: true})
    }
    // if(this.state.loginButtonDisable)
  }

  _handlePressRequest = (username, password) => {
    const { forgotPasswordRequest, navigation } = this.props
    Keyboard.dismiss()
    forgotPasswordRequest(this.state.email, () => navigation.navigate('Login')) // change to dashboard
  }

  render () {
    const { isKeyboardVisible, email } = this.state
    const { design, Lang } = this.props
    const submitStatus = validator.isEmail(email)

    return (
      <Container>
        <Content style={{height: this.state.visibleHeight}} >
          <View style={Styles.container}>
            <View style={Styles.upperboxContainer}>
              {!isKeyboardVisible && <View style={[Styles.upperbox]}>
                <View style={Styles.logoHolder}>
                  { design.secureUrl === '' && <Image source={Images.logo} style={Styles.logo} /> }
                  { design.secureUrl !== '' && <FastImage source={{uri: design.secureUrl}} style={Styles.logo} /> }
                </View>
              </View>}
              <View style={[Styles.triangleContainer, {justifyContent: 'space-around'}]}>
                <Triangle width={90} height={30} direction={'down'} color={'white'} />
              </View>
            </View>
            <View style={Styles.forms}>
              <Spacer />
              <View ><Text style={Styles.inLoginTxt}>{Lang.forgotPassword}</Text></View>
              <View style={[Styles.textInputContainer]}>
                <TextInput
                  onChangeText={(e) => this.setState({email: e})}
                  underlineColorAndroid='transparent'
                  multiline={false}
                  placeholder={Lang.email} />
              </View>
            </View>
            <Spacer />
            <View style={Styles.buttonContainer}>
              <TouchableOpacity disabled={!submitStatus} underlayColor='rgba(0,0,0,0.0)' onPress={() => this._handlePressRequest()}>
                <LinearGradient colors={[submitStatus ? design.button2 : '#a6b2c1', submitStatus ? design.button : '#7f8893']} style={Styles.linearGradient}>
                  <Text style={Styles.buttonText}>{Lang.sendRequest.toUpperCase()}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

        </Content>
        <Footer show />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    user: state.user,
    design: state.user.design,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgotPasswordRequest: (email, callback) => dispatch(UserActions.forgotPasswordRequest(email, callback)),
    change: (navigation, route) => dispatch(ScreenActions.change(navigation, route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
