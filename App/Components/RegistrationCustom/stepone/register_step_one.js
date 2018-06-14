import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View, Input } from 'native-base'
import { connect } from 'react-redux'
import { AlertBox, Spacer, Button } from './../../../Components'
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { CheckBox } from 'react-native-elements'
import { errorAlert } from '../../../Lib/Helper/alertHelper'
import { checkPassword } from '../../../Transforms/RegistrationHelper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Footer from '../../Footer'
import GenderSelection from './../Components/GenderSelection'
import HorizontalSpace from './../../RegistrationCustom/Components/HorizontalSpace'
import styles from './../stepone/style'
import TabContentTitle from './../Components/TabContentTitle'
// import LanguageSelection from './../Components/LanguageSelection'

class RegistrationStepOne extends Component {
  constructor (props) {
    super(props)
    const { Lang } = this.props
    // maybe later  ENGLISH wil become en
    this.state = {
      terms: false,
      types1: [{label: Lang.txt_D07, value: 0}, {label: Lang.txt_D08, value: 1}],
      value1: 0,
      value1Index: 0,

      genders: [ {label: Lang.txt_D07, value: 'MALE'}, {label: Lang.txt_D08, value: 'FEMALE'} ],
      selectedGender: 'DUTCH',

      languages: [ {label: 'Dutch', value: 'DUTCH'}, {label: 'English', value: 'ENGLISH'} ],
      selectedLanguage: 'DUTCH'
    }
  }

  _onClickLanguage (newLanguage) {
    if (__DEV__) console.log(newLanguage)
    this.setState({selectedLanguage: newLanguage})
    this.props.onSelectLanguage(newLanguage)
    this.props.onValidate()
  }

  _onClickGender (newGender) {
    if (__DEV__) console.log(newGender)
    this.setState({selectedGender: newGender})
    this.props.onGenderSelect(newGender)
    this.props.onValidate()
  }

  _onSelectTerms (newValue) {
    this.setState({terms: newValue})
    this.props.parentChangeState({terms: newValue})
    this.props.onValidate()
  }
  _onPressUserNamehelp () {
    const { Lang } = this.props
    AlertBox.alert(' ', Lang.txt_D35,
      [{text: 'OK', onPress: () => {}}],
      { cancelable: true })
  }
  showTerms () {
    const { Lang } = this.props
    // Ik accepteer hierbij de algemene voorwaarden
    AlertBox.alert(Lang.txt_D31, Lang.txt_D33,
      [{text: 'Cancel', onPress: () => this._onSelectTerms(false)}, {text: Lang.txt_D32, onPress: () => this._onSelectTerms(true)}],
      { cancelable: false })
  }
  validatePassword (password) {
    const { Lang } = this.props
    if (!checkPassword(password)) {
      errorAlert(Lang.txt_D48)
      this.props.parentChangeState({isValidPassword: false})
      return null
    }
    // set password
    this.props.parentChangeState({isValidPassword: true})
    this.props.onValidate()
  }

  render () {
    const { genders } = this.state
    const { registrationCity, registrationStreetName, onValidate, liveValidation, gotoLogin, showInvalid, onSubmit, design, Lang } = this.props

    // parents state use for reload of components
    const { gender, first_name, last_name, username, postUserName, password,
      house_num, postal_code, email_address, mobile_num, language, terms, finished } = this.props.parentState
    const validatePassword = this.validatePassword.bind(this)
    const validate = showInvalid(false)
    return (
      <View style={styles.container}>
        <TabContentTitle title={Lang.txt_D04} />
        <View style={styles.verticalSpacing} />
        <View style={styles.textInputContainer}>
          <GenderSelection genders={genders} selected={gender} onSelectGender={this._onClickGender.bind(this)} title={Lang.txt_D29} />
        </View>
        <Spacer />
        <View style={styles.textInputContainer}>
          <Input
            style={styles.input}
            onEndEditing={(e) => { onValidate() }}
            placeholder={Lang.txt_D09}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onFirstNameTextChange(text)}
            multiline={false} value={first_name} />
        </View>
        <Spacer />
        <View style={styles.textInputContainer}>
          <Input
            style={styles.input}
            onEndEditing={(e) => { onValidate() }}
            placeholder={Lang.txt_D10}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onLastNameTextChange(text)}
            multiline={false} value={last_name} />
        </View>
        <Spacer /><HorizontalSpace /><Spacer />
        <View style={styles.textInputContainer}>
          <View><TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { this._onPressUserNamehelp() }}><Icon size={25} style={{ flex: 1, alignSelf: 'center', textAlignVertical: 'center' }} name='help-outline' /></TouchableOpacity></View>
          <Input
            style={[styles.input, { flex: 3, paddingRight: 0, marginRight: 0 }]}
            onEndEditing={(e) => { onValidate(); liveValidation('userName', e.nativeEvent.text) }}
            placeholder={Lang.txt_D11}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onUsernameTextChange(text)}
            multiline={false} value={username} />
          <Input
            editable={false}
            style={[styles.input, { flex: 2, paddingLeft: 0, marginLeft: 0 }]}
            placeholder={username.length > 0 ? postUserName : ''}
            underlineColorAndroid='transparent'
            multiline={false} value={''} />
        </View>
        <Spacer /><HorizontalSpace /><Spacer />
        <View style={styles.horizontalContainer}>
          <View style={[styles.textInputContainer, {flex: 2}]}>
            <Input
              style={[styles.input]}
              onEndEditing={(e) => { onValidate(); liveValidation('postalCode', e.nativeEvent.text) }}
              placeholder={Lang.txt_D14}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.props.onPostalCodeTextChange(text)}
              multiline={false} value={postal_code} />
          </View>
          <View style={styles.horizontalSpacing} />
          <View style={[styles.textInputContainer, {flex: 1}]}>
            <Input
              style={[styles.input]}
              keyboardType='numeric'
              onEndEditing={(e) => { onValidate(); liveValidation('houseNumber', e.nativeEvent.text) }}
              placeholder={Lang.txt_D13}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.props.onHouseNumTextChange(text)}
              multiline={false} value={house_num} />
          </View>
        </View>
        <Spacer />
        <View style={styles.horizontalContainer}>
          <View style={styles.textInputContainer}>
            { registrationStreetName ? <Input value={registrationStreetName} editable={false} /> : <Input value={Lang.txt_D12} editable={false} style={[styles.input, { color: 'gray' }]} /> }
          </View>
          <View style={styles.horizontalSpacing} />
          <View style={styles.textInputContainer}>
          
            { registrationCity ? <Input value={registrationCity} editable={false} style={[styles.input]} /> : <Input value={Lang.txt_D12} editable={false} style={[styles.input, { color: 'gray' }]} /> }
          </View>
        </View>
        <Spacer /><HorizontalSpace /><Spacer />
        <View style={styles.textInputContainer}>
          <Input
            style={[styles.input]}
            onEndEditing={(e) => { onValidate(); liveValidation('userEmail', e.nativeEvent.text) }}
            placeholder={Lang.txt_D16}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onEmailTextChange(text)}
            multiline={false} value={email_address} />
        </View>
        <View style={styles.verticalFieldsSpacing} />
        <View style={styles.textInputContainer}>
          <Input
            style={[styles.input]}
            onEndEditing={(e) => { onValidate(); liveValidation('phoneNumber', e.nativeEvent.text) }}
            placeholder={Lang.txt_D17}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onMobileTextChange(text)}
            multiline={false} value={mobile_num} />
        </View>
        <Spacer /><HorizontalSpace /><Spacer />
        <View style={styles.textInputContainer}>
          <Input
            style={[styles.input]}
            onEndEditing={(e) => { validatePassword(e.nativeEvent.text) }}
            placeholder={Lang.txt_D18}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onPasswordTextChange(text)}
            multiline={false} value={password} />
        </View>
        <Spacer /><HorizontalSpace /><Spacer />
        <View style={styles.textInputContainer}>
          <CheckBox
            style={{alignItems: 'flex-start', flex: 1, paddingBottom: 10}}
            title={Lang.txt_D31 + '     '}
            checked={terms}
            onPress={() => this.showTerms()}
          />
        </View>
        <Spacer count={2} />
        <Button active={validate} onPress={onSubmit} onPressDisabled={showInvalid} design={design} title={Lang.txt_D20.toUpperCase()} />
        <Spacer />
        <TouchableOpacity onPress={() => { gotoLogin() }}>
          <Text style={styles.alreadyuser}>
            {Lang.txt_D19}
          </Text>
        </TouchableOpacity>
        <Spacer count={4} />
        <Footer show />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    registrationStreetName: state.user.registrationStreetName,
    registrationCity: state.user.registrationCity,
    design: state.user.design,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationStepOne)
