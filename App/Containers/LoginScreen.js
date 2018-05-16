import React, { PropTypes } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation } from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title } from 'native-base'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyles'
import { Images, Metrics } from '../Themes'
import { ScreenActions } from '../Redux/ScreenRedux'
import LoginActions from '../Redux/LoginRedux'
import AlertMessage from './../Components/AlertMessage'
import Lang from './../Lib/CutomLanguage'
import Spacer from './../Components/Spacer'
import OldLoginForm from './../Containers/Login/login'
import Footer from '../Components/Footer';

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
    const { username, password, isKeyboardVisible } = this.state
    const { fetching, error, user } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    const titleStyle = {
      fontSize: 20
    }
    return (
      <View style={{height: this.state.visibleHeight}} >
        <OldLoginForm {...this.props} isKeyboardVisible={isKeyboardVisible} onSubmit={this._handlePressLogin.bind(this)} onNewUser={this._handlePressNewUser.bind(this)} />
      </View>
    )

    /**
    return (<View>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center' }}
        style={[Styles.container, { height: this.state.visibleHeight }]}
        keyboardShouldPersistTaps='always'>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <View style={Styles.form}>
          <Spacer />
          <Spacer />
          <Form>
            <Item style={{borderBottomWidth: 0}}>
              <Label style={titleStyle}>{Lang.txt_C05}</Label>
              <TouchableOpacity onPress={this._handlePressNewUser}>
                <Label style={titleStyle}>
                  {Lang.txt_C01d }
                </Label>
              </TouchableOpacity>
            </Item>
            <Item stackedLabel>
              <Label style={titleStyle}>{Lang.txt_C01b}</Label>
              <Input
                ref={'username'}
                placeholderTextColor='#9da1a5'
                value={username}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={this._handleChangeUsername}
                underlineColorAndroid='transparent'
                placeholder={Lang.txt_C02}
                onSubmitEditing={() => this.refs.password._root.focus()} />
            </Item>
            <Item stackedLabel>
              <Label />
              <Input
                ref={'password'}
                placeholderTextColor='#9da1a5'
                value={password}
                editable={editable}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
                autoCorrect={false}
                placeholder={Lang.txt_C03}
                secureTextEntry
                onChangeText={this._handleChangePassword}
                underlineColorAndroid='transparent'
                onSubmitEditing={this._handlePressLogin} />
            </Item>
          </Form>
          <View style={[Styles.loginRow]}>
            <Button style={{ flex: 1, justifyContent: 'center' }} full block onPress={this._handlePressLogin} disabled={this.state.loginButtonDisabled}>
              <NBText>{Lang.txt_C01}</NBText>
            </Button>
          </View>
          <TouchableOpacity style={[Styles.loginRow]}>
            <Label style={{ }} >
              {Lang.txt_C04}
            </Label>
          </TouchableOpacity>
          <AlertMessage {...this.alertDefault} title={this.props.error} />

        </View>
      </ScrollView></View>
    )
    */
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
