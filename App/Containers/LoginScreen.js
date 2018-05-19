import React from 'react'
import PropTypes from 'prop-types'
import { View, Keyboard, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { Metrics } from '../Themes'
import { ScreenActions } from '../Redux/ScreenRedux'
import OldLoginForm from './../Containers/Login/login'
import LoginActions from '../Redux/LoginRedux'

class LoginScreen extends React.Component {
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

  _handlePressLogin = (username, password, params) => {
    // if (!this.state.loginButtonDisabled) {
    //   this.props.attemptLogin(this.state.username, this.state.password, this.props.navigation, 'NavigationDrawer') // change to dashboard
    // }
    this.props.attemptLogin(username, password, this.props.navigation, 'NavigationDrawer', params) // change to dashboard
  }

  _handlePressNewUser = () => {
    this.props.navigation.navigate('RegistrationForm')
  }

  handlePressShortcut = () => {
    const navigation = this.props.navigation
    this.props.change(navigation)
  }

  _handleChangeUsername = text => {
    this.setState({ username: text })
    this._setButtonStatus()
  }

  _handleChangePassword = text => {
    this.setState({ password: text })
    this._setButtonStatus()
  }

  render () {
    const { isKeyboardVisible } = this.state
    return (
      <View style={{height: this.state.visibleHeight}} >
        <OldLoginForm {...this.props} isKeyboardVisible={isKeyboardVisible} onSubmit={this._handlePressLogin.bind(this)} onNewUser={this._handlePressNewUser.bind(this)} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    user: state.user,
    design: state.user.design
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attemptLogin: (username, password, navigation, route, params) => dispatch(LoginActions.loginRequest({username, password, navigation, route, params})),
    change: (navigation, route) => dispatch(ScreenActions.change(navigation, route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

/**
{() => this.password._root.focus()} />
 */
