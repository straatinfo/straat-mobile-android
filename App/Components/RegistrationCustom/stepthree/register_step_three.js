import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Picker,
  NetInfo,
  Alert
} from 'react-native'
import { connect } from 'react-redux'

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import LinearGradient from 'react-native-linear-gradient'
import renderIf from 'render-if'

import Api from './../../../Lib/Common/Api'
import ApiUtil from './../../../Lib/Common/ApiUtil'
import Lang from './../../../Lib/CutomLanguage'

import CircleButton from './../../../Components/CircleButton'
import styles from '../stepthree/style'
import GeneralDesign from './../../../Lib/GeneralDesign'
import RegistrationOptionSelectiom from './../Components/RegistrationOptionSelection'
import Spacer from '../../Spacer';
import Footer from '../../Footer';

class RegistrationStepThree extends Component {
  constructor (props) {
    super(props)
   // const {teamList} = this.props
    this.state = {
      types3: [
        {label: Lang.txt_D24, value: 0},
        {label: Lang.txt_D25, value: 1},
        {label: Lang.txt_D26, value: 2}
      ],
      value3: 0,
      value3Index: 0,
    //  teamList: teamList,
      selectedTeamID: '',
      // 0 for idividual user , 1 for join existing team, 2 for create team
      regOptions: [{label: Lang.txt_D24, value: 0}, {label: Lang.txt_D25, value: 1}, {label: Lang.txt_D26, value: 2}],
      selectedRegOption: ''

    }
  }

  componentDidMount () {
    this.getTeam()
  }

  getHostNearby () {

  }

  getTeam () {
    // this.props.getTeamlist('5a7b561e3b47226e7dac5deb', true)
    return true
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        Api.getTeam('', '5a393fbad783702506cc0056', '', '', '', '')
              .then(getTeamResult => {
                if (getTeamResult.status === 1) {
                  this.setState({
                    teamList: getTeamResult.result
                  })
                  console.log('team collected')
                  console.log(getTeamResult)
                } else {
                  Alert.alert(
                          'Error',
                          ApiUtil.serverResponseResult(getTeamResult.result), [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                          { cancelable: false }
                      )
                }
              }).catch(loginError => {
                Alert.alert(
                      'Error',
                      'Server Error', [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                      { cancelable: false }
                  )
              })
      } else {
        Alert.alert(
              'Error',
              'No Internet Connection. Please try again.', [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              { cancelable: false }
          )
      }
    })
  }

  selectedTeam (itemValue, itemIndex) {
    // invalid if index 0 is selected
    if (itemIndex === 0) {
      // 0 index is used for showing label only
      __DEV__ && console.log('inValid selectrion')
      return null
    }
    __DEV__ && console.log('valid selectrion')
    this.props.onTeamIDSelect(itemValue)
    this.setState({selectedTeamID: itemValue})
  }

  _onClickRegOption (registrationOptionSelectedId) {
    this.setState({selectedRegOption: registrationOptionSelectedId})
    this.props.onRegOptionSelect(registrationOptionSelectedId)
  }

  render () {
    const { teamList, onRegisterSubmit, design } = this.props
    const { regOptions } = this.state
    const { teamID, register_option: registerOption, validation: { personalDataForm, volunteerOptionForm, teamOptionForm } } = this.props.parentState
    __DEV__ && console.log('personalDataForm, volunteerOptionForm, teamOptionForm', personalDataForm, volunteerOptionForm, teamOptionForm)
    const formThreeSubmitButtonEnabled = personalDataForm && volunteerOptionForm && teamOptionForm
    const { MainButton } = GeneralDesign
    console.log('teamList in step 3', teamList)

    return (
      <View style={styles.container}>
        <Text style={{color: '#6e85a1', fontSize: 30}}>{Lang.txt_D06}</Text>
        <View style={styles.verticalSpacing} />
        <View style={styles.radioButtonContainer}>
          <RegistrationOptionSelectiom disable={0} regOptions={regOptions} selected={registerOption} onSelectRegOption={this._onClickRegOption.bind(this)} />
        </View>
        { registerOption === 1 &&
          <View style={{borderColor: 'gray', borderWidth: 1}}>
            <Picker
              mode={'dropdown'}
              selectedValue={teamID}
              onValueChange={(itemValue, itemIndex) => { this.selectedTeam(itemValue, itemIndex) }}>
              <Picker.Item value={'default'} label={Lang.txt_D41} enabled={false} key={'default'} />
              {/** __DEV__ && <Picker.Item value={'devId'} label={'devName'} key={'devkey'} /> */}
              {teamList.map((l, i) => { console.log('team', l); return <Picker.Item value={l._id} label={l.teamName} key={l._id} /> })}
            </Picker>
          </View>
        }
        {/**  enable this button if user selected join team & validated, */}
        <TouchableOpacity disabled={!formThreeSubmitButtonEnabled} style={styles.buttonContainer} underlayColor='rgba(0,0,0,0.0)' onPress={onRegisterSubmit}>
          {formThreeSubmitButtonEnabled && <LinearGradient colors={[design.button2, design.button]} style={styles.linearGradient}>
            <Text style={styles.buttonText}>{Lang.txt_D21.toUpperCase()}</Text>
          </LinearGradient>}
          {/** disabled style button partial */}
          {!formThreeSubmitButtonEnabled && <LinearGradient colors={[MainButton.disabledColors.gradient.start, MainButton.disabledColors.gradient.end]} style={styles.linearGradient}>
            <Text style={styles.buttonText}>{Lang.txt_D21.toUpperCase()}</Text>
          </LinearGradient>}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationStepThree)
