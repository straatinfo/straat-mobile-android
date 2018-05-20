import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Dimensions,
  Platform,
  NetInfo,
  Alert,
  PermissionsAndroid,
  ListView,
  Modal,
  TouchableHighlight
} from 'react-native'
import ValidationComponent from 'react-native-form-validator'
import validator from 'validator'
import renderIf from 'render-if'
import Triangle from 'react-native-triangle'
import SlidingUpPanel from 'rn-sliding-up-panel'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'

import Api from './../../Lib/Common/Api'
import AppData from './../../Lib/Common/AppData'
import ApiUtil from './../../Lib/Common/ApiUtil'
import { errorAlert } from './../../Lib/Helper/alertHelper'

import RegistrationStepOne from './../../Components/RegistrationCustom/stepone/register_step_one'
import RegistrationStepTwo from './../../Components/RegistrationCustom/steptwo/register_step_two'
import RegistrationStepThree from './../../Components/RegistrationCustom/stepthree/register_step_three'
import CreateTeam from './../../Components/RegistrationCustom/Components/CreateTeam'

import styles from './styles'
import Images from './../../Themes/Images'
import { Button } from 'react-native-elements'
import { showAlertBox } from '../../Redux/commonRedux'
import { formAFieldValidate, getLocation } from '../../Transforms/RegistrationHelper'
import { isValidUserName } from '../../Redux/UserRedux'
import Footer from '../../Components/Footer'
import FastImage from 'react-native-fast-image'

import RandomString from 'random-string'
import AppConfig from '../../Config/AppConfig'
import { usernameSeparator, Languages } from '../../Services/Constant';

const {width, height} = Dimensions.get('window')

class RegistrationForm extends ValidationComponent {
  static navigationOptions = {
    title: 'Registration'
  };

  constructor (props) {
    super(props)
     // set host ID from redux HostId
    const { accessCode, hostId, teamList, teamPhotoUploaded } = this.props
    // steps
    // firststep, secondstep, thirdstep
    this.state = {
     // status: 'thirdstep',
      status: !__DEV__ ? 'firststep' : 'firststep',
      accessCode: accessCode,
      host_id: hostId,

      gender: '',
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      street_name: '',
      house_num: '',
      postal_code: '',
      city: '',
      email_address: '',
      mobile_num: '',
      is_volunteer: false,
      register_option: null,
      lat: '53.2729807',
      lng: '5.985930199999999',
      is_reporter: 1,
      teamList: teamList,
      teamID: '',
      language: AppConfig.language,   // defualt language will get from app defualt setting
      showCreateTeam: false,
      teamName: '',
      teamEmailAddress: '',
      teamLogo: '',
      teamPhotoUploaded: teamPhotoUploaded,
      terms: false,
      postUserName: '_ID:',

      validation: {
        personalDataForm: false,
        volunteerOptionForm: false,
        teamOptionForm: false,
        createTeamForm: false
      },

      // enabled here if validation of all forms success
      formThreeSubmitButtonEnabled: false,

      // aba ewan nga ba
      isCreateTeamValidated: false,
      // true for create team, false for join team
      createTeamOrJoinTeam: null, // use register_option instead
      // status: 'secondstep'
      finished: {
        step1: false,
        step2: false,
        step3: false
      }
    }
    this._panel_createTeam = null
    this.enableSecondStep = this.enableSecondStep.bind(this)
  //  this.enableSubmit = this.enableSubmit.bind(this)

    this.getTeamWithHostID()
  }

  componentDidMount () {
    // this._panel_createTeam.transitionTo(this.state.slideMenuHeight + 65)

    let registrationData = {
    //  accessCode: '',
      gender: 'MALE',
      first_name: 'jaylord',
      last_name: 'torres',
      username: 'jaylordPogi',
      password: 'jaylordpogi',
      street_name: 'street',
      house_num: 'houseNumber',
      postal_code: '',
      city: 'secret',
      email_address: 'jay@jaylord.com',
      mobile_num: '0909876762',
      is_volunteer: false,
      lat: '',
      lng: '',
      host_id: this.state.host_id,
      teamID: '',
      language: 'DUTCH',
      teamName: '',
      teamEmailAddress: ''
    }
    //  __DEV__ && this.setState(registrationData)

    // generate code id for userName
    const randomId = RandomString({length: 5, numeric: true, letters: true})
    this.setState({ postUserName: usernameSeparator + randomId })

    // set user coordinate for getting accurate _host
    this.setLocaiton()
  }

  async setLocaiton () {
    const { userMergeState } = this.props

    try { // im here  <------|
      const location = await getLocation()
      if (location.err) {
        userMergeState({isCoor: false})
        return
      }
      if (location.position) {
        userMergeState({isCoor: true, position: location.position})
        return
      }
    } catch (e) {
      __DEV__ && console.log(e)
    }
  }

  getTeamWithHostID () {
    // this.props.getTeamlist('5a7b561e3b47226e7dac5deb', true)
    /**
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        console.log(this.state.host_id)
        Api.getTeam('', '', '', '', '', this.state.host_id)
                    .then(getTeamResult => {
                      loaderHandler.hideLoader()

                      if (getTeamResult.status === 1) {
                        this.setState({teamList: getTeamResult})
                      } else {
                        Alert.alert(
                                'Error',
                                ApiUtil.serverResponseResult(getTeamResult.result), [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                                { cancelable: false }
                            )
                      }
                    }).catch(loginError => {
                      loaderHandler.hideLoader()
                      console.log(loginError)
                      Alert.alert(
                            'Error',
                            loginError.toString(), [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                            { cancelable: false }
                        )
                    })
      } else {
        loaderHandler.hideLoader()
        Alert.alert(
                    'Error',
                    'No Internet Connection. Please try again.', [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    { cancelable: false }
                )
      }
    }) */
  }

  enableSecondStep () {
    this.validate({
      gender: {required: true},
      first_name: {required: true},
      last_name: {required: true},
      username: {required: true},
      password: {required: true},
      street_name: {required: true},
      house_num: {required: true},
      postal_code: {required: true},
      city: {required: true},
      email_address: {required: true},
      mobile_num: {required: true},
      language: {required: true}
    })

    if (this.getErrorMessages()) {
      loaderHandler.hideLoader()
      Alert.alert(
                'Error',
                this.getErrorMessages(), [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                { cancelable: false }
            )
      return
    }

    this.setState({status: 'secondstep'})
    this.setState({finished: {...this.state.finished, step1: true, step2: true}})
  }

  registerAccount () {
    const { accessCode, hostId, teamList, teamPhotoUploaded, registrationTeamName, registrationUserEmail, registrationPostalCode, registrationUserName } = this.props

    // here will submit the registration
    // new api format
    let registrationData = {
      code: accessCode,
      gender: this.state.gender,
      fname: this.state.first_name,
      lname: this.state.last_name,
      username: registrationUserName,
      password: this.state.password,
      streetName: this.state.street_name,
      houseNumber: this.state.house_num,
      postalCode: registrationPostalCode,
      city: this.state.city,
      email: registrationUserEmail,
      phoneNumber: this.state.mobile_num,
      isVolunteer: this.state.is_volunteer,
      lat: this.state.lat,
      long: this.state.lng,
      _host: hostId, // host ID
      _team: this.state.teamID, // team ID
      language: this.state.language,

      teamName: registrationTeamName,
      teamEmail: this.state.teamEmailAddress,
      logoUrl: teamPhotoUploaded.url,
      logoSecuredUrl: teamPhotoUploaded.secure_url,
      registerOption: this.state.register_option
     // 'team-logo': this.state.teamLogo
    }
    // process teamPhoto
    if (teamPhotoUploaded._id) {
      registrationData.teamPhotoUploaded = teamPhotoUploaded
    }

    // registerOption: this.state.register_option  1 for create team | 2 for joinTeam
  // if register_option is 0 then : now idont know
  // if register_option is 1 then user must select valid team; then validate all forms; if success then enable submit button from form 3 else
  // if register_option is 2 then user must create valid team; then validate all forms; if success then enable sumit button on createTeam form

    // register this user using formC submit if user selecet option 1 in selection for team
    if (this.state.register_option === 1) {
    //  if (this.state.validation.personalDataForm && this.state.validation.volunteerOptionForm && this.state.validation.teamOptionForm) {
        // it means validation on all form success
              // remove team created if running in here
      delete (registrationData['teamName'])
      delete (registrationData['teamEmail'])
      delete (registrationData['teamPhotoUploaded'])

        // submit registration
      this.props.registerRequest(registrationData, this.props.navigation, 'Login')
    //  }
      return true
    }

    if (this.state.register_option === 2) {
    //  if (this.state.validation.personalDataForm && this.state.validation.volunteerOptionForm && this.state.validation.teamOptionForm && this.state.validation.createTeamForm) {
        // it means validation on all form success
      delete (registrationData['_team'])
      this.props.registerRequest(registrationData, this.props.navigation, 'Login')
     // }
      return true
    }

    // end here
    return true
    loaderHandler.showLoader('')

    this.validate({
      gender: {required: true},
      first_name: {required: true},
      last_name: {required: true},
      username: {required: true},
      password: {required: true},
      street_name: {required: true},
      house_num: {required: true},
      postal_code: {required: true},
      city: {required: true},
      email_address: {required: true},
      mobile_num: {required: true},
      is_volunteer: {required: true},
      register_option: {required: true},
      lat: {required: true},
      lng: {required: true},
      is_reporter: {required: true},
      host_id: {required: true}
    })

    if (this.getErrorMessages()) {
      loaderHandler.hideLoader()
      Alert.alert(
                'Error',
                this.getErrorMessages(), [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                { cancelable: false }
            )
    }

    if (this.state.register_option === 0) {
      Alert.alert(
                'Not Availabe',
                'Coming soon.', [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                { cancelable: false }
            )
    } else if (this.state.register_option === 2) {
      this.props.navigation.navigate('NavigationDrawer', {userData: this.state, method: 'register-add'})
    } else {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          Api.register(this.state.language,
                        this.state.gender,
                        this.state.first_name,
                        this.state.last_name,
                        this.state.username,
                        this.state.password,
                        this.state.street_name,
                        this.state.house_num,
                        this.state.postal_code,
                        this.state.city,
                        this.state.email_address,
                        this.state.mobile_num,
                        this.state.is_volunteer,
                        this.state.register_option,
                        this.state.lat,
                        this.state.lng,
                        this.state.is_reporter,
                        this.state.host_id)
                        .then(registerResult => {
                          loaderHandler.hideLoader()

                          if (registerResult.status === 1) {
                            AppData.setUsername(this.state.username)
                            AppData.setPassword(this.state.password)
                            AppData.setUserInfo(registerResult.result)

                            this.props.navigation.navigate('NavigationDrawer')
                          } else {
                            Alert.alert(
                                    'Error',
                                    ApiUtil.serverResponseResult(registerResult.result), [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                                    { cancelable: false }
                                )
                          }
                        }).catch(registerResult => {
                          loaderHandler.hideLoader()
                          console.log(registerResult)
                          Alert.alert(
                                'Error',
                                'Server Error', [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                                { cancelable: false }
                            )
                        })
        } else {
          loaderHandler.hideLoader()
          Alert.alert(
                        'Error',
                        'No Internet Connection. Please try again.', [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                        { cancelable: false }
                    )
        }
      })
    }
  }

  onGenderSelect (gender) {
    this.setState({gender: gender})
  }
  onSelectLanguage (language) {
    this.setState({language: language})
  }

  onFirstNameTextChange (firstName) {
    this.setState({first_name: firstName})
  }

  onLastNameTextChange (lastName) {
    this.setState({last_name: lastName})
  }

  onUsernameTextChange (userName) {
    this.setState({username: userName})
  }

  onStreetNameTextChange (streetName) {
    this.setState({street_name: streetName})
  }

  onHouseNumTextChange (houseNum) {
    this.setState({house_num: houseNum})
  }

  onPostalCodeTextChange (postal) {
    this.setState({postal_code: postal})
  }

  onCityTextChange (city) {
    this.setState({city: city})
  }

  onEmailTextChange (email) {
    this.setState({email_address: email})
  }

  onMobileTextChange (mobile) {
    this.setState({mobile_num: mobile})
  }

  onPasswordTextChange (password) {
    this.setState({password: password})
  }

  onRegOption (regOption) {
    //
    // here is where magic begin
    // if user select create new team then screen show team creation
    //
    // when user select create new team then, new form will show contain createTeam component
    this.setState({register_option: regOption}, this.validateTeamOptionForm)

    // show create team form
    if (regOption === 2) {
      this.setState({showCreateTeam: true})
    }
  }

  onUserVolunteer (value) {
    const { hostId, Lang } = this.props
    this.setState({is_volunteer: value})
    // according to spec
    // volunteer cennot use forbiden user names
    if (value && !isValidUserName(this.state.username)) {
      // validate here
      errorAlert(Lang.txt_D44, () => this.setState({status: 'firststep'}))
      return true
    }
    // this.setState({is_volunteer: value})

    // shift screen to stepthree
    this.setState({
      status: 'thirdstep'
    })
    // validate form b
    this.props.getTeamlist(hostId, value)
    this.validatevolunteerOptionForm()
  }

  onTeamIDSelect (teamID) {
    this.setState({
      teamID: teamID, createTeamOrJoinTeam: false
    }, this.validateTeamOptionForm)
  }

  _showCreateTeam (status) {
    // console.log( this._panel_createTeam)
    if (status) {
      this.setState({showCreateTeam: true})
      // this._panel_createTeam.transitionTo(height)
      // this._panel_createTeam._flick()
    } else {
     // this._panel_createTeam.transitionTo(0)
      this.setState({showCreateTeam: false})
    }
  }

  validateTeamOptionForm () {
    // if 1 then user must select team
    if (this.state.register_option === 1) {
      if (this.state.teamID) {
        // if team Id is valid then allow submission
        __DEV__ && console.log('this.state.teamID: ', this.state.teamID)
        this.setState({validation: { ...this.state.validation, teamOptionForm: true }})
      } else {
        // if team Id is valid then allow submission
        this.setState({validation: { ...this.state.validation, teamOptionForm: false }})
      }
    } else {
      // else dont activate
      this.setState({validation: { ...this.state.validation, teamOptionForm: false }})
    }
  }

  validatevolunteerOptionForm () {
    this.setState({finished: {...this.state.finished, step2: true, step3: true}, validation: {...this.state.validation, volunteerOptionForm: true}})
  }
  validatePersonalDataForm () {
    const { terms, isValidPassword } = this.state
    // get data from redux
    const { isValidatedUserEmail, isValidatedUserName, isValidatedPostalCode, isValidatedCity, isValidatedPhoneNumber } = this.props
    const invalidate = () => {
      this.setState({finished: {...this.state.finished, step1: false, step2: false}, validation: {...this.state.validation, personalDataForm: false}})
    }
    // only validate fields and enable next button when success
    this.validate({
      gender: {required: true},
      first_name: {required: true},
      last_name: {required: true},
      username: {required: true},
      password: {required: true},
      street_name: {required: true},
      house_num: {required: true},
      postal_code: {required: true},
      city: {required: true},
      email_address: {required: true},
      mobile_num: {required: true},
      language: {required: true}
    })

    if (this.getErrorMessages()) {
      invalidate()
      return null
    }
    if (!terms || !isValidPassword) {
      invalidate()
      return null
    }

    // validate email, username, postalcode
    if (!isValidatedUserEmail && !isValidatedUserName && !isValidatedPostalCode && !isValidatedCity && !isValidatedPhoneNumber) {
      return null
    }

    // when come here that means successs
    //  this.setState({status: 'secondstep'})
    this.setState({finished: {...this.state.finished, step1: true, step2: true}, validation: {...this.state.validation, personalDataForm: true}})
    return true
  }

  validateCreateTeam () {
    __DEV__ && console.log('validating.. team or teamEmail')
    this.setState({ validation: {...this.state.validation, createTeamForm: false} })

    const { teamName, teamEmailAddress } = this.state
    const { isValidatedTeamName, isValidatedTeamEmail } = this.props

    if (!teamName || !teamEmailAddress) {
      // check if empty fields
      return null
    }
    /**
     *  alaready check at the redux saga
    // check email if it is email type
    if (!validator.isEmail(teamEmailAddress)) {
      // 'confirmEmail  must be email type!'
      errorAlert(Lang.txt_B15)
      return null
    } */
    // validate email, username, postalcode
    if (!isValidatedTeamName && !isValidatedTeamEmail) {
      return null
    }

    // validate team setting form back end

    // if success then allow registration here (enable button)
    this.setState({ validation: {...this.state.validation, createTeamForm: true} }) // if validation from backend successe
  }

  liveValidation (key, value) {
    const { Lang } = this.props
    const { postUserName } = this.state
    /**
     * @param key(String: enum(userEmail, userName, postaCode)), value
     */
    __DEV__ && console.log('validating liveValidation', key, value)
    if (key === 'userName') {
      __DEV__ && console.log('userName', value)
      if (this.state.is_volunteer === false) {
        this.props.registerSetUsername(value + postUserName, value)
      } else {
        if (isValidUserName(value)) {
          this.props.registerSetUsername(value + postUserName, value)
        } else {
          errorAlert(Lang.invalid + ': ' + Lang.txt_D11)
        }
      }
    }

    if (key === 'userEmail') {
      __DEV__ && console.log('liveValidate Email', value)
      this.props.registerSetEmail(value)
    }

    if (key === 'postalCode') {
      __DEV__ && console.log('liveValidate postalCode', value)
      this.props.registerSetPostalcode(value)
    }

    if (key === 'teamName') {
      __DEV__ && console.log('liveValidate teamName', value)
      this.props.registerSetTeamname(value, this.state.is_volunteer)
    }

    if (key === 'teamEmail') {
      __DEV__ && console.log('liveValidate teamEmail', value)
      this.props.registerSetTeamemail(value)
    }

    if (key === 'phoneNumber') {
      __DEV__ && console.log('liveValidate teamEmail', value)
      this.props.registerSetPhonenumber(value)
    }

    if (key === 'city') {
      __DEV__ && console.log('liveValidate city', value)
      this.props.registerSetCity(value)
    }
  }

  _submit () {
    this.props.registerRequest({}, this.navigation, 'ss')
  }

  gotoLogin () {
    this.props.navigation.navigate('Login')
  }
  showInvalid (display = true) {
    let errorList = []
    const { isValidatedUserEmail, isValidatedUserName, isValidatedPostalCode, isValidatedCity, isValidatedPhoneNumber, Lang } = this.props
    const showAlert = (message) => {
      return Lang.invalid + ': ' + message
    }
    // show error per field
    if (!formAFieldValidate('gender', this.state.gender)) {
      errorList.push(showAlert(Lang.txt_D29))
    }
    if (!formAFieldValidate('firstName', this.state.first_name)) {
      errorList.push(showAlert(Lang.txt_D09))
    }
    if (!formAFieldValidate('lastName', this.state.last_name)) {
      errorList.push(showAlert(Lang.txt_D10))
    }
    if (!isValidatedUserName) {
      errorList.push(showAlert(Lang.txt_D11))
    }
    if (!formAFieldValidate('streetName', this.state.street_name)) {
      errorList.push(showAlert(Lang.txt_D12))
    }
    if (!formAFieldValidate('houseNum', this.state.house_num)) {
      errorList.push(showAlert(Lang.txt_D13b))
    }
    if (!isValidatedPostalCode) {
      errorList.push(showAlert(Lang.txt_D14))
    }
    // if (!formAFieldValidate('city', this.state.city)) {
    //   errorList.push(showAlert(Lang.txt_D15))
    // }

    if (!isValidatedCity) {
      errorList.push(showAlert(Lang.txt_D15))
    }
    if (!isValidatedUserEmail) {
      errorList.push(showAlert(Lang.txt_D16))
    }
    if (!isValidatedPhoneNumber) {
      errorList.push(showAlert(Lang.txt_D17))
    }
    if (!formAFieldValidate('password', this.state.password)) {
      // errorList.push(showAlert(Lang.txt_D18))
      errorList.push(showAlert(Lang.txt_D48))
    }
    if (!this.state.terms) {
      errorList.push(showAlert(Lang.txt_D31))
    }

    if (!display) {
      if (errorList.length === 0) {
        return true
      } else {
        return 0
      }
    }
    errorAlert(errorList.join('\n'))
  }

  render () {
    console.log(this.props)
    const { showCreateTeam } = this.state
    const activeHeaderButton = this.state.status
    const { isValidatedTeamEmail, isValidatedTeamName, getTeamlist, teamList, setTeamPhoto, design, Lang } = this.props
    let headerButtonStyleFirststep = { }
    let headerButtonStyleSecondstep = {}
    let headerButtonStyleThirdstep = {}

    const headerButtonActive = {
      backgroundColor: '#bdcadc',
      borderColor: '#bdcadc'
    }
    const headerButtonActiveLeft = {
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20
    }

    const headerButtonActiveMiddle = {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20
    }

    const headerButtonActiveRight = {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20
    }

    switch (activeHeaderButton) {
      case 'firststep':
        headerButtonStyleFirststep = { ...headerButtonActive, ...headerButtonActiveLeft }
        break
      case 'secondstep':
        headerButtonStyleSecondstep = { ...headerButtonActive, ...headerButtonActiveMiddle }
        break
      case 'thirdstep':
        headerButtonStyleThirdstep = { ...headerButtonActive, ...headerButtonActiveRight }
        break
    }
    return (
      <View style={{flex: 1}}>
        { AppConfig.DEBUG === true && <View>
          <Button onPress={() => this._submit()} title={'test'} /><Text>ACCESS CODE : {this.props.accessCode}  ; HOST ID : {this.props.hostId}</Text></View>
        }
        { !showCreateTeam && <ScrollView bounces={false}>
          {/** here will show registrations with 3 tabs and form contetns But hide when click register in create new team mode, must remember that the state will preserve */}
          <View style={styles.container}>
            <View style={styles.upperboxContainer}>
              <View style={styles.upperbox}>
                <View style={styles.logoHolder}>
                  { design.secureUrl === '' && <Image source={Images.logo} style={styles.logo} /> }
                  { design.secureUrl !== '' && <FastImage source={{uri: design.secureUrl}} style={styles.logo} /> }
                </View>
              </View>
              <View style={styles.registerStepContainer}>
                <View style={styles.registerStep}>
                  <View style={[{flex: 1}, headerButtonStyleFirststep]}>
                    <TouchableHighlight disabled={this.state.finished.step1 !== true} onPress={() => { this.setState({status: 'firststep'}) }}>
                      <Text style={[styles.registerText, {color: this.state.status === 'firststep' || this.state.finished.step1 === true ? '#4f6a85' : '#bdcadc'}]}>{Lang.txt_D01}</Text>
                    </TouchableHighlight>
                  </View>
                  <View style={[{flex: 1}, headerButtonStyleSecondstep]}>
                    <TouchableHighlight disabled={this.state.finished.step2 !== true} onPress={() => { this.setState({status: 'secondstep'}) }}>
                      <Text style={[styles.registerText, {color: this.state.status === 'secondstep' || this.state.finished.step2 === true ? '#4f6a85' : '#bdcadc', backgroundColor: this.state.status === 'secondstep' ? '#bdcadc' : 'white'}]}>{Lang.txt_D02}</Text>
                    </TouchableHighlight>
                  </View>
                  <View style={[{flex: 1}, headerButtonStyleThirdstep]}>
                    <TouchableHighlight disabled={this.state.finished.step3 !== true} onPress={() => { this.setState({status: 'thirdstep'}) }}>
                      <Text style={[styles.registerText, {color: this.state.status === 'thirdstep' || this.state.finished.step3 === true ? '#4f6a85' : '#bdcadc'}]}>{Lang.txt_D03}</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.horizontalSpacing, styles.backgroundColorWhite]} />
            <View style={[styles.triangleContainer, {justifyContent: 'space-around'}]}>
              <Triangle width={90} height={30} direction={'down'} color={this.state.status === 'firststep' ? 'white' : 'transparent'} />
              <Triangle width={90} height={30} direction={'down'} color={this.state.status === 'secondstep' ? 'white' : 'transparent'} />
              <Triangle width={90} height={30} direction={'down'} color={this.state.status === 'thirdstep' ? 'white' : 'transparent'} />
            </View>
            <View style={styles.horizontalSpacing} />
            <View style={[styles.horizontalSpacing]} />
            <View style={styles.container}>
              {
                renderIf(this.state.status === 'firststep')(
                  <RegistrationStepOne
                    parentState={this.state}
                    parentChangeState={this.setState.bind(this)}
                    onGenderSelect={this.onGenderSelect.bind(this)}
                    onSelectLanguage={this.onSelectLanguage.bind(this)}
                    onValidate={this.validatePersonalDataForm.bind(this)}
                    onFirstNameTextChange={this.onFirstNameTextChange.bind(this)}
                    onLastNameTextChange={this.onLastNameTextChange.bind(this)}
                    onUsernameTextChange={this.onUsernameTextChange.bind(this)}
                    onStreetNameTextChange={this.onStreetNameTextChange.bind(this)}
                    onHouseNumTextChange={this.onHouseNumTextChange.bind(this)}
                    onPostalCodeTextChange={this.onPostalCodeTextChange.bind(this)}
                    onCityTextChange={this.onCityTextChange.bind(this)}
                    onEmailTextChange={this.onEmailTextChange.bind(this)}
                    onMobileTextChange={this.onMobileTextChange.bind(this)}
                    onPasswordTextChange={this.onPasswordTextChange.bind(this)}
                    gotoLogin={this.gotoLogin.bind(this)}
                    liveValidation={this.liveValidation.bind(this)}
                    showInvalid={this.showInvalid.bind(this)}
                    onSubmit={this.enableSecondStep.bind(this)} />
                )
              }
              {
                renderIf(this.state.status === 'secondstep')(
                  <RegistrationStepTwo onVolunteerSubmit={this.onUserVolunteer.bind(this)} />
                )
              }
              {
                renderIf(this.state.status === 'thirdstep')(
                  <RegistrationStepThree
                    parentState={this.state}
                    parentChangeState={this.setState.bind(this)}
                    onTeamIDSelect={this.onTeamIDSelect.bind(this)}
                    onRegOptionSelect={this.onRegOption.bind(this)}
                    teamList={teamList}
                    onRegisterSubmit={this.registerAccount.bind(this)} />
                )
              }
            </View>
          </View>
        </ScrollView>}
        {/** here is container for team cration: i think it would be better if i use slide up instead of screen, so state will preserve and has good animation */}
        { showCreateTeam && <CreateTeam
          title={Lang.txt_D37} onClose={this._showCreateTeam.bind(this)}
          parentSetState={this.setState.bind(this)}
          parentState={this.state}
          validateCreateTeam={this.validateCreateTeam.bind(this)}
          liveValidated={{isValidatedTeamEmail, isValidatedTeamName}}
          liveValidation={this.liveValidation.bind(this)}
          onRegisterSubmit={this.registerAccount.bind(this)}
          setTeamPhoto={setTeamPhoto}
        />}
      </View>
    )
  }
}

export default RegistrationForm
