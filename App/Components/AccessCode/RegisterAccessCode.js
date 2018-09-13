import React from 'react'
import { TextInput } from 'react-native'
import { Text, Input, List, Body, ListItem, Left, Content, Icon, View } from 'native-base'
import { AlertBox, CircleButton, RowView, Spacer, validator, ValidationComponent } from './../../Components'
import { connect } from 'react-redux'
import { Fonts } from './../../Themes'

class RegisterAccessCode extends ValidationComponent {
  constructor (props) {
    super(props)
    this.state = {
      fname: '',
      lname: '',
      phoneNumber: '',
      email: '',
      confirmEmail: '',
      message: ''
    }
  }

  _onPressSubmit = () => {
    const { Lang } = this.props
    const errorAlert = (errorMessage) => {
      AlertBox.alert(
        Lang.error,
        errorMessage, [{text: 'OK', onPress: () => console.log(' ')}],
        { cancelable: false }
      )
    }

     // validate field
     /**
    this.validate({
      fname: {required: true},
      lname: {required: true},
      phoneNumber: {numbers: true, required: true},
      email: {email: true, required: true},
      confirmEmail: {email: true, required: true},
      message: {required: true}
    })
     // handler error messages
    if (this.getErrorMessages()) {
      errorAlert(this.getErrorMessages())
      return false
    }

     */
    // validate first Name
    if (validator.isEmpty(this.state.fname)) {
      // 'First Name must not be empty!'
      errorAlert(Lang.txt_B09)
      return false
    }

    if (validator.isEmpty(this.state.lname)) {
      // 'Last Name must not be empty!'
      errorAlert(Lang.txt_B10)
      return false
    }

    if (validator.isEmpty(this.state.phoneNumber)) {
      // 'phoneNumber must not be empty!'
      errorAlert(Lang.txt_B11)
      return false
    }

    // validate Email
    if (validator.isEmpty(this.state.email)) {
      // 'Email must not be empty!'
      errorAlert(Lang.txt_B12)
      return false
    }

    if (!validator.isEmail(this.state.email)) {
      // 'Email must be email type!'
      errorAlert(Lang.txt_B13)
      return false
    }

    // validate confirmEmail
    if (validator.isEmpty(this.state.confirmEmail)) {
      // 'confirmEmail must not be empty!'
      errorAlert(Lang.txt_B14)
      return false
    }

    if (!validator.isEmail(this.state.confirmEmail)) {
      // 'confirmEmail  must be email type!'
      errorAlert(Lang.txt_B15)
      return false
    }

    // hander password
    if (this.state.email !== this.state.confirmEmail) {
      errorAlert(Lang.txt_B16)
      return false
    }

    // if code come here that meanss it validated
    this.props.parentSetState({registrationData: this.state})
    this.props.onProcess(this.state)
  }

  _onTextBoxChange = (value, key) => {
    eval('this.setState({' + key + ': value })')
  }

  render () {
    const { Lang } = this.props
    const TextStyles = {
      fontSize: Fonts.size.h5
    }

    const props = { placeholderTextColor: '#9da1a5', style: TextStyles }

    const styleHead = {
      title: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 30,
        padding: 5
      }
    }

    const fieldText = (placeHolder, iconName, key, inputType = 'Input') => {
      if (inputType === 'Input') {
        return (
          <ListItem icon>
            <Left><Icon name={iconName} /></Left>
            <Body><Input placeholder={placeHolder} {...props} onChangeText={(value) => this._onTextBoxChange(value, key)} /></Body>
          </ListItem>
        )
      } else if (inputType === 'TextInput') {
        return (<TextInput multiline numberOfLines={4} {...props} placeholder={placeHolder} onChangeText={(value) => this._onTextBoxChange(value, key)} />
        )
      }
    }

    return (
      <Content>
        <Spacer /><Spacer />
        <View ><Text style={styleHead.title}>{Lang.txt_B07.toUpperCase()}</Text></View><Spacer />
        <List>
          {fieldText(Lang.txt_D09, 'person', 'fname')}
          {fieldText(Lang.txt_D10, 'person', 'lname')}
          {fieldText(Lang.txt_D17, 'call', 'phoneNumber')}
          {fieldText(Lang.txt_D16, 'mail', 'email')}
          {fieldText(Lang.txt_B05, 'mail', 'confirmEmail')}
          {fieldText(Lang.txt_B06, 'none', 'message', 'TextInput')}
          <Spacer /><Spacer />
          <RowView>
            <CircleButton styles={{ width: 100 }} text={Lang.txt_Z04} gradient={{start: '#f95b4f', end: '#f74638'}} onPress={() => this.props.parentSetState({screen: 'NoAccessCode'})} />
            <Spacer />
            <CircleButton styles={{ width: 100 }} text={Lang.txt_A01} gradient={{start: '#339fd6', end: '#2088bc'}} onPress={() => this._onPressSubmit()} />
          </RowView>
          <Spacer />
          <Spacer />
        </List>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAccessCode)
