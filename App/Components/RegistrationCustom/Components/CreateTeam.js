import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabContentTitle from './TabContentTitle'
import { connect } from 'react-redux'

import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation, TouchableHighlight } from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, List, Switch, Body} from 'native-base'
import ImagePicker from 'react-native-image-picker'

import RowView from '../../RowView'
import CenterView from '../../CenterView'
import Lang from './../../../Lib/CutomLanguage'
import InputTextBox from './InputTextBox'
import CircleButton from './../../../Components/CircleButton'
import GeneralDesign from './../../../Lib/GeneralDesign'
import Images from './../../../Themes/Images'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spacer from '../../Spacer'

import colors from './../../../Themes/Colors'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'

class CreateTeam extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // default image when none selected
      hasImageSelected: false,
      selectedImage: {uri: null}
    }
  }

  static defaultProps = { show: true }

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    design: PropTypes.object
  }

  _onPickImagePress () {
    const { setTeamPhoto } = this.props
    const title = Lang.txt_D40

    const options = {
      title: title,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    loaderHandler.showLoader('Loading...')
    ImagePicker.showImagePicker(options, (response) => {
      // console.log (response)
      if (response.didCancel) {
        // this.setState({hasImageSelected: false})
        loaderHandler.hideLoader()
      } else if (response.error) {
        loaderHandler.hideLoader()
      } else if (response.customButton) {
        loaderHandler.hideLoader()
      } else {
        // this.setState({ selectedImage: {uri: response.uri}, hasImageSelected: true })
         // set parent logo
        __DEV__ && console.log(response)
        this.props.parentSetState({teamLogo: response.uri}, loaderHandler.hideLoader)
        setTeamPhoto(response)
      }
    })
  }

  render () {
    __DEV__ && console.log('rendering create team')
    const { MainButton } = GeneralDesign
    const { onRegisterSubmit, title, onClose, parentSetState, liveValidation, validateCreateTeam, liveValidated: { isValidatedTeamEmail, isValidatedTeamName }, design } = this.props
    const { teamName, teamEmailAddress, teamLogo, validation: { personalDataForm, volunteerOptionForm }, register_option: registerOption } = this.props.parentState
    const enableRegister = personalDataForm && volunteerOptionForm && (registerOption === 2) && isValidatedTeamName && isValidatedTeamEmail
    // const enableRegister = (registerOption === 2) && isValidatedTeamEmail && isValidatedTeamName
    const picStyle = {
      width: 200,
      height: 200,
      borderWidth: 1,
      borderColor: '#b0bfc1'
    }
// Image source={Images.tapHere}
    return (
      <Content style={{backgroundColor: colors.background}} key={'CreateTeam'}>
        <RowView left><TouchableOpacity onPress={() => onClose()}><Text style={{ color: '#6e85a1', fontSize: 20, padding: 10 }}>{'<'} {Lang.txt_D36}</Text></TouchableOpacity></RowView>
        <View style={{padding: 20}}>
          <TabContentTitle title={title} />
          <Spacer />
          <InputTextBox onChangeText={(value) => { parentSetState({teamName: value}) }} onEndEditing={(e) => { validateCreateTeam(); liveValidation('teamName', e.nativeEvent.text) }} value={teamName} placeholder={Lang.txt_D38} />
          <InputTextBox onChangeText={(value) => { parentSetState({teamEmailAddress: value}) }} onEndEditing={(e) => { validateCreateTeam(); liveValidation('teamEmail', e.nativeEvent.text) }} value={teamEmailAddress} placeholder={Lang.txt_D39} />
          <CircleButton text={Lang.txt_D40} onPress={() => { this._onPickImagePress() }} gradient={{start: '#e8eff7', end: '#d5dee8'}} radius={5}
            color={'gray'}
            borderColor={'#9aa9bc'} />
          <Spacer />
          <CenterView><TouchableOpacity onPress={() => { this._onPickImagePress() }} >
            {
            !teamLogo ? <Icon style={picStyle} name='photo' size={200} color={'#b0bfc1'} /> : <Image source={{uri: teamLogo}} style={picStyle} resizeMode='contain' />
            }
          </TouchableOpacity></CenterView>
          <Spacer />
          { enableRegister && <CircleButton text={Lang.txt_D21.toUpperCase()} onPress={() => { onRegisterSubmit() }} gradient={{start: design.button2, end: design.button}} radius={5}
            color={MainButton.colors.color}
            borderColor={MainButton.border.borderColor}
          />}
          { !enableRegister && <CircleButton disabled text={Lang.txt_D21.toUpperCase()} onPress={() => { console.log('pressSubmit') }} gradient={MainButton.disabledColors.gradient} radius={5}
            color={MainButton.colors.color}
            borderColor={MainButton.border.borderColor}
          />}
        </View>
      </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam)
