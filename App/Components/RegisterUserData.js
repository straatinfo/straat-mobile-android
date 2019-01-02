import React, { PropTypes, Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation, TouchableHighlight } from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, Icon, List, Switch, Body} from 'native-base'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import Styles from './../Containers/Styles/LoginScreenStyles'
import { ScreenActions } from '../Redux/ScreenRedux'
import LoginActions from '../Redux/LoginRedux'
import AlertMessage from './../Components/AlertMessage'
import Lang from './../Lib/CutomLanguage'
/**
 *  this is protype only for upgrade of old projext, but refuse to adapat so this will be unable to use
 *
 */
export default class RegisterUserData extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth - 40 },
      loginButtonDisabled: true,
      registerForm: {
        username: {success: false},
        password: {success: false},
        confirmedPassword: {success: false},
        fname: {success: false},
        lname: {success: false},
        gender: {success: false, value: false},
        streetName: {success: false},
        houseNumber: {success: false},
        zip: {success: false},
        city: {success: false},
        emailAddress: {success: false},
        phoneNumber: {success: false}
      }
    }
  }
  _handlePressRegister () {
    this.setState({error: Lang.txt_D01 + Lang.txt_Z01}) 
  }

  _handlePressExistingUser () {
    this.props.navigation.navigate('Login')
  }
  validateField (type, value) {
    // partial validation
    if (value) return true
    return false
  }
  submitButtonEnabler () {
    // check if all fields in form has error : if none then enable button
    const formList = this.state.registerForm
    //  if (formList)
    Object.keys(formList).forEach((k, i) => {
    })
  }
  _changeField (val, key) {
    // validate values then save to state
    // then change status of the field
    let result
    switch (key) {
      case 'username':
        // run validation userName
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, username: { value: val, error: !result, success: result } }})
        break
      case 'password':
        // run validation in password
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, password: { value: val, error: !result, success: result } }})
        break
      case 'confirmedPassword':
        // run validation in confirmedPassword
        result = this.validateField('text', val)
        if (this.state.registerForm.password === undefined || this.state.registerForm.password.value !== val) { result = false }
        this.setState({registerForm: { ...this.state.registerForm, confirmedPassword: { value: val, error: !result, success: result } }})
        break
      case 'fname':
        // run validation in fname
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, fname: { value: val, error: !result, success: result } }})
        break
      case 'lname':
        // run validation in lname
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, lname: { value: val, error: !result, success: result } }})
        break
      case 'gender':
        // run validation in gender
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, gender: { value: val, error: !result, success: result } }})
        break
      case 'streetName':
        // run validation in streetName
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, streetName: { value: val, error: !result, success: result } }})
        break
      case 'houseNumber':
        // run validation in houseNumber
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, houseNumber: { value: val, error: !result, success: result } }})
        break
      case 'postalCode':
        // run validation in postalCode
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, postalCode: { value: val, error: !result, success: result } }})
        break
      case 'zip':
        // run validation in zip
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, zip: { value: val, error: !result, success: result } }})
        break
      case 'city':
        // run validation in city
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, city: { value: val, error: !result, success: result } }})
        break
      case 'emailAddress':
        // run validation in emailAddress
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, emailAddress: { value: val, error: !result, success: result } }})
        break
      case 'phoneNumber':
        // run validation in phoneNumber
        result = this.validateField('text', val)
        this.setState({registerForm: { ...this.state.registerForm, phoneNumber: { value: val, error: !result, success: result } }})
        break
    }
    this.submitButtonEnabler()
  }

  // setState('ref':resultObj)
  render () {
    const { username, password } = this.state
    const { fetching, error } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    const formList = this.state.registerForm
    return (

      <ScrollView
        contentContainerStyle={{ justifyContent: 'center' }}
        style={[null, { height: this.state.visibleHeight }]}
        keyboardShouldPersistTaps='always'>
        <Form style={Styles.form} >
          <Item {...this.state.registerForm.username}>
            <Input placeholder={Lang.txt_D11} onChangeText={(val) => { this._changeField(val, 'username') }} />{/** username  */}
            <Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.password}>
            <Input placeholder={Lang.txt_D18} onChangeText={(val) => { this._changeField(val, 'password') }} secureTextEntry />{/** Password  */}
            <Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.confirmedPassword}>
            <Input placeholder={Lang.txt_D18b} onChangeText={(val) => { this._changeField(val, 'confirmedPassword') }} secureTextEntry />{/** Password  */}
            <Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.fname}>
            <Input placeholder={Lang.txt_D09} onChangeText={(val) => { this._changeField(val, 'fname') }} />{/** first name  */}
            <Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.lname}>
            <Input placeholder={Lang.txt_D10} onChangeText={(val) => { this._changeField(val, 'lname') }} />{/** last name  */}
            <Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.gender}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Label>{Lang.txt_D07}</Label>
              <Radio selected={this.state.registerForm.gender.value === 'male'} onPress={() => { this._changeField('male', 'gender') }} /></View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Label>{Lang.txt_D08}</Label>
              <Radio selected={this.state.registerForm.gender.value === 'female'} onPress={() => { this._changeField('female', 'gender') }} /></View>
            <Input disabled placeholder=' ' /><Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.streetName}>
            <Input placeholder={Lang.txt_D12} onChangeText={(val) => { this._changeField(val, 'streetName') }} />{/** street info */}
            <Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.houseNumber}>
            <Input placeholder={Lang.txt_D13} onChangeText={(val) => { this._changeField(val, 'houseNumber') }} />{/** house number */}
            <Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.zip}>
            <Input placeholder={Lang.txt_D14} onChangeText={(val) => { this._changeField(val, 'zip') }} />{/** postal code */}
            <Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.city}>
            <Input placeholder={Lang.txt_D15} onChangeText={(val) => { this._changeField(val, 'city') }} />{/** city */}
            <Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.emailAddress}>
            <Input placeholder={Lang.txt_D16} onChangeText={(val) => { this._changeField(val, 'emailAddress') }} />{/** email address */}
            <Icon name='checkmark-circle' />
          </Item>
          <Item {...this.state.registerForm.phoneNumber}>
            <Input placeholder={Lang.txt_D17} onChangeText={(val) => { this._changeField(val, 'phoneNumber') }} />{/** mobile number */}
            <Icon name='checkmark-circle' />
          </Item>
        </Form>
        <View style={[Styles.loginRow]}>
          <Button style={{ flex: 1, justifyContent: 'center' }} full block onPress={this._handlePressRegister.bind(this)}
            disabled={!(
              formList.username.success && formList.password.success && formList.confirmedPassword.success && formList.fname.success && formList.lname.success && formList.gender.success &&
              formList.streetName.success && formList.houseNumber.success && formList.zip.success && formList.city.success && formList.emailAddress.success && formList.phoneNumber.success)
            }>
            <NBText>{Lang.txt_D21}</NBText>
          </Button>
        </View>
        <AlertMessage {...this.alertDefault} title={this.state.error} />
        <TouchableOpacity style={[Styles.loginRow]} onPress={this._handlePressExistingUser.bind(this)}>{/** new User */}
          <Label style={{ }}>
            {Lang.txt_D19}
          </Label>
        </TouchableOpacity>
        <Input disabled placeholder=' ' />
      </ScrollView>

    )
  }
}
