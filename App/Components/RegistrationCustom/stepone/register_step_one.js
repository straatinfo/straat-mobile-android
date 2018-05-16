import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import LinearGradient from 'react-native-linear-gradient'

import Lang from './../../../Lib/CutomLanguage'
import { CheckBox } from 'react-native-elements'
import HorizontalSpace from './../../RegistrationCustom/Components/HorizontalSpace'
import styles from './../stepone/style'
import TestOnlyScreen from '../../../Containers/TestOnlyScreen'
import RowView from '../../RowView'
import LanguageSelection from './../Components/LanguageSelection'
import GenderSelection from './../Components/GenderSelection'
import TabContentTitle from './../Components/TabContentTitle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Footer from '../../Footer'
import Spacer from '../../Spacer'
import { errorAlert } from '../../../Lib/Helper/alertHelper'
import { checkPassword } from '../../../Transforms/RegistrationHelper';

class RegistrationStepOne extends Component {
  constructor (props) {
    super(props)
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
    Alert.alert(' ', Lang.txt_D35,
      [{text: 'OK', onPress: () => {}}],
      { cancelable: true })
  }
  showTerms () {
    // Ik accepteer hierbij de algemene voorwaarden
    Alert.alert(Lang.txt_D31, Lang.txt_D33,
      [{text: 'Cancel', onPress: () => this._onSelectTerms(false)}, {text: Lang.txt_D32, onPress: () => this._onSelectTerms(true)}],
      { cancelable: false })
  }
  validatePassword (password) {
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
    const { languages, genders } = this.state
    const { onValidate, liveValidation, gotoLogin, showInvalid, onSubmit, design } = this.props

    // parents state use for reload of components
    const { gender, first_name, last_name, username, postUserName, password,
      street_name, house_num, postal_code, city, email_address, mobile_num, language, terms, finished } = this.props.parentState

    // console.log(`Rendering RegistrationStepOne View`)
    const validatePassword = this.validatePassword.bind(this)
    // const validate = null // showInvalid(false)
    const validate = showInvalid(false)

    return (
      <View style={styles.container}>
        <TabContentTitle title={Lang.txt_D04} />
        <View style={styles.verticalSpacing} />
        <View style={styles.textInputContainer}>
          <GenderSelection genders={genders} selected={gender} onSelectGender={this._onClickGender.bind(this)} />
        </View>
        <View style={styles.verticalFieldsSpacing} />
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1 }}
            onEndEditing={(e) => { onValidate() }}
            placeholder={Lang.txt_D09}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onFirstNameTextChange(text)}
            multiline={false} value={first_name} />
        </View>
        <View style={styles.verticalFieldsSpacing} />
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1 }}
            onEndEditing={(e) => { onValidate() }}
            placeholder={Lang.txt_D10}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onLastNameTextChange(text)}
            multiline={false} value={last_name} />
        </View>
        <View style={styles.verticalFieldsSpacing} />
        <HorizontalSpace />
        <View style={styles.textInputContainer}>
          <View><TouchableOpacity onPress={() => { this._onPressUserNamehelp() }}><Icon size={25} style={{flex: 1, alignSelf: 'center', margin: 5, marginTop: 7}} name='help-outline' /></TouchableOpacity></View>
          <TextInput
            style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 3, paddingRight: 0, marginRight: 0 }}
            onEndEditing={(e) => { onValidate(); liveValidation('userName', e.nativeEvent.text) }}
            placeholder={Lang.txt_D11}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onUsernameTextChange(text)}
            multiline={false} value={username} />
          <TextInput
            editable={false}
            style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1, paddingLeft: 0, marginLeft: 0 }}
            placeholder={username.length > 0 ? postUserName : ''}
            underlineColorAndroid='transparent'
            multiline={false} value={''} />
        </View>
        <View style={styles.verticalFieldsSpacing} />
        <HorizontalSpace />
        <View style={styles.horizontalContainer}>
          <View style={[styles.textInputContainer, {flex: 2}]}>
            <TextInput
              style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1 }}
              onEndEditing={(e) => { onValidate() }}
              placeholder={Lang.txt_D12}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.props.onStreetNameTextChange(text)}
              multiline={false} value={street_name} />
          </View>
          <View style={styles.horizontalSpacing} />
          <View style={[styles.textInputContainer, {flex: 1}]}>
            <TextInput
              keyboardType='numeric'
              style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1 }}
              onEndEditing={(e) => { onValidate() }}
              placeholder={Lang.txt_D13}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.props.onHouseNumTextChange(text)}
              multiline={false} value={house_num} />
          </View>
        </View>
        <View style={styles.verticalFieldsSpacing} />
        <View style={styles.horizontalContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1 }}
              onEndEditing={(e) => { onValidate(); liveValidation('postalCode', e.nativeEvent.text) }}
              placeholder={Lang.txt_D14}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.props.onPostalCodeTextChange(text)}
              multiline={false} value={postal_code} />
          </View>
          <View style={styles.horizontalSpacing} />
          <View style={styles.textInputContainer}>
            <TextInput
              style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1 }}
              onEndEditing={(e) => { onValidate(); liveValidation('city', e.nativeEvent.text) }}
              placeholder={Lang.txt_D15}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.props.onCityTextChange(text)}
              multiline={false} value={city} />
          </View>
        </View>
        <HorizontalSpace />
        <View style={styles.verticalFieldsSpacing} />
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1 }}
            onEndEditing={(e) => { onValidate(); liveValidation('userEmail', e.nativeEvent.text) }}
            placeholder={Lang.txt_D16}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onEmailTextChange(text)}
            multiline={false} value={email_address} />
        </View>
        <View style={styles.verticalFieldsSpacing} />
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1 }}
            onEndEditing={(e) => { onValidate(); liveValidation('phoneNumber', e.nativeEvent.text) }}
            placeholder={Lang.txt_D17}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onMobileTextChange(text)}
            multiline={false} value={mobile_num} />
        </View>
        <HorizontalSpace />
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1 }}
            onEndEditing={(e) => { validatePassword(e.nativeEvent.text) }}
            placeholder={Lang.txt_D18}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.props.onPasswordTextChange(text)}
            multiline={false} value={password} />
        </View>
        <HorizontalSpace />
        {/* <View style={styles.textInputContainer}>
          <LanguageSelection languages={languages} selected={language} onSelectLanguage={this._onClickLanguage.bind(this)} />
        </View>
        <HorizontalSpace /> */}
        <View style={styles.textInputContainer}>
          <CheckBox
            style={{alignItems: 'flex-start', flex: 1, paddingBottom: 10}}
            title={Lang.txt_D31 + '     '}
            checked={terms}
            onPress={() => this.showTerms()}
          />
        </View>
        <View style={styles.verticalFieldsSpacing} />
        <View style={styles.verticalFieldsSpacing} />
        <View style={styles.verticalFieldsSpacing} />
        <TouchableOpacity
          style={styles.buttonContainer}
          underlayColor='rgba(0,0,0,0.0)'
          // onPress={finished.step1 ? this.props.onSubmit : this.props.showInvalid}
          onPress={validate ? onSubmit : showInvalid}>
          <LinearGradient colors={[validate ? design.button2 : '#a6b2c1', validate ? design.button : '#7f8893']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>{Lang.txt_D20}</Text>
          </LinearGradient>{/**  disabled={!finished.step1} */}
        </TouchableOpacity>
        <View style={styles.verticalFieldsSpacing} />
        <TouchableOpacity onPress={() => { gotoLogin() }}>
          <Text style={styles.alreadyuser}>
            {Lang.txt_D19}
          </Text>
        </TouchableOpacity>
        <Spacer /><Spacer /><Spacer />
        <Spacer />
        <Footer show />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    design: state.user.design
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationStepOne)
