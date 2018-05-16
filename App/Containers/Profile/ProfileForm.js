import React, { Component } from 'react'
import { View, StatusBar, Switch, ScrollView, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ValidationComponent from 'react-native-form-validator'
import styles from './../Profile/styles'
import {
    Text,
    Container,
    Header,
    Content,
    Title,
    Button,
    Right,
    Body,
    Icon,
    Item,
    Input
} from 'native-base'

import { Images, Metrics } from './../../Themes'
import { connect } from 'react-redux'
import ProfileActions from '../../Redux/ProfileRedux'
import Lang from './../../Lib/CutomLanguage'
import AppData from './../../Lib/Common/AppData'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import { checkPassword, toUserModel } from '../../Transforms/RegistrationHelper'
import { getTeamLogo } from '../../Transforms/TeamHelper'
import ImagePicker from 'react-native-image-picker'
import { errorAlert } from '../../Lib/Helper/alertHelper'
import { crop } from '../../Transforms/Cloudinary'
import { isValidUserName } from '../../Redux/UserRedux'
import { usernameSeparator } from '../../Services/Constant'

class ProfileForm extends ValidationComponent {
  constructor (props) {
    super(props)
    this.state = {
      fname: '',
      lname: '',
      city: '',
      country: '',
      houseNumber: '',
      streetName: '',
      email: '',
      phoneNumber: '',
      chatName: '',
      username: '',
      usernameID: '',
      usernamePre: '',
      postalCode: ''

    }
  }
  componentDidMount () {
    const { user, editprofileMerge, editUser } = this.props
    const tuser = toUserModel(user)
    this.setState(tuser)
    editprofileMerge({currentUser: tuser, editUser: tuser})
  }

  liveValidation (key, value) {
    /**
     * @param key(String: enum(userEmail, userName, postaCode)), value
     */
    __DEV__ && console.log('validating liveValidation', key, value)
    if (key === 'userName') {
      const {user: {isVolunteer}, currentUser: {usernamePre, usernameID}} = this.props
      if (usernamePre === value) { // no change
        console.log('no change')
        return true
      }

      const username = value + usernameSeparator + usernameID
      __DEV__ && console.log('userName', value)
      if (isVolunteer === false) {
        this.props.setusernameProfile(username)
      } else {
        if (isValidUserName(value)) {
          this.props.setusernameProfile(username)
        } else {
          this.props.editfieldProfile({inusername: true})
          errorAlert(Lang.invalid + ': ' + Lang.txt_D11)
        }
      }
    }

    if (key === 'userEmail') {
      __DEV__ && console.log('liveValidate Email', value)
      const {currentUser: {email}} = this.props
      if (email === value) return true
      this.props.setemailProfile(value)
    }

    if (key === 'postalCode') {
      __DEV__ && console.log('liveValidate postalCode', value)
      const {currentUser: {postalCode}} = this.props
      if (postalCode === value) return true
      this.props.setpostalcodeProfile(value)
    }
 

    if (key === 'phoneNumber') {
      __DEV__ && console.log('liveValidate teamEmail', value)
      const {currentUser: {phoneNumber}} = this.props
      if (phoneNumber === value) return true
      this.props.setphonenumberProfile(value)
    }

    if (key === 'city') {
      __DEV__ && console.log('liveValidate city', value)
      const {currentUser: {city}} = this.props
      if (city === value) return true
      this.props.setcityProfile(value)
    }
  }

  getChanges () {
        /**
         * fname , lname
         * houseNumber, streetName, postalCode, city
         * phoneNumber
         * username
         * password
         *
         */

  }
  _updateProfileDetails = () => {
    const {submitEditprofile} = this.props
    submitEditprofile({})
  }

  validatePassword (password) {
    if (!checkPassword(password)) {
      errorAlert(Lang.txt_D48)
      this.props.parentChangeState({isValidPassword: false})
      return null
    }
  }
  _onPickImagePress = () => {
    const { uploadEditprofile } = this.props
    try {
      const options = {
        quality: 1.0,
        storageOptions: {
          skipBackup: true
        }
      }

      ImagePicker.launchImageLibrary(options, (response) => {
       // console.log('Response ', response)

        if (response.didCancel) {
          console.log('User cancelled photo picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
        } else {
          delete response.data
          console.log('response', response)
       //   this.setState({ teamPhoto: response.uri })
          uploadEditprofile(response)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  validate () {
    const { inemail, inusername, incity, inphonenumber, inpostalCode } = this.props
    return !(inemail || inusername || incity || inphonenumber || inpostalCode)
  }
  render () {
    const { navigation, editfieldProfile, currentUser, editUser } = this.props
    //   <CenterView><TouchableOpacity onPress={() => { this._onPickImagePress() }} >
    //   {
    //   !teamLogo ? <Icon style={picStyle} name='photo' size={200} color={'#b0bfc1'} /> : <Image source={{uri: teamLogo}} style={picStyle} resizeMode='contain' />
    //   }
    // </TouchableOpacity></CenterView>
    const logo = getTeamLogo(editUser)
    return (
      <Container>
        <HeaderInDrawer title={Lang.txt_E04} navigation={navigation} />
        <View style={{ flex: 1 }}>
          <ScrollView bounce={false}>
            <Content >
              <View style={styles.viewheader}>
                <TouchableOpacity onPress={() => { this._onPickImagePress() }} >
                  {logo ? <Image source={{uri: crop(200, logo)}} style={styles.profileroundimage} /> : <Image source={Images.uploadprofile} style={styles.profileroundimage} />}
                </TouchableOpacity>
              </View>
              <View style={styles.viewheader1}>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_D09}</Text>
                <Item>
                  <Input

                    style={{ color: '#3e3f42'}}
                    placeholder={currentUser.fname}
                    onChangeText={text => this.setState({ fname: text})}
                    value={this.state.fname}
                    onEndEditing={(e) => { editfieldProfile({fname: e.nativeEvent.text}) }}
                                />
                </Item>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_D10}</Text>
                <Item >
                  <Input

                    style={{ color: '#3e3f42'}}
                    placeholder={currentUser.lname}
                    onChangeText={text => this.setState({ lname: text})}
                    value={this.state.lname}
                    onEndEditing={(e) => { editfieldProfile({lname: e.nativeEvent.text}) }}
                                />
                </Item>
              </View>
              <View style={styles.viewheader1}>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_P02}</Text>
                <Item >
                  <Input
                    keyboardType='numeric'
                    style={{ color: '#3e3f42'}}
                    placeholder={currentUser.houseNumber}
                    onChangeText={text => this.setState({ houseNumber: text})}
                    value={this.state.houseNumber}
                    onEndEditing={(e) => { editfieldProfile({houseNumber: e.nativeEvent.text}) }}
                                />
                </Item>
                <Item >
                  <Input

                    style={{ color: '#3e3f42'}}
                    placeholder={currentUser.streetName}
                    onChangeText={text => this.setState({ streetName: text})}
                    value={this.state.streetName}
                    onEndEditing={(e) => { editfieldProfile({streetName: e.nativeEvent.text}) }} />
                </Item>
                <Item >
                  <Input

                    style={{ color: '#3e3f42'}}
                    placeholder={currentUser.postalCode}
                    onChangeText={text => this.setState({ postalCode: text})}
                    value={this.state.postalCode}
                    onEndEditing={(e) => { editfieldProfile({postalCode: e.nativeEvent.text}); this.liveValidation('postalCode', e.nativeEvent.text) }} />
                </Item>
                <Item >
                  <Input

                    style={{ color: '#3e3f42'}}
                    placeholder={currentUser.city}
                    onChangeText={text => this.setState({ city: text})}
                    value={this.state.city}
                    onEndEditing={(e) => { editfieldProfile({city: e.nativeEvent.text}); this.liveValidation('city', e.nativeEvent.text) }} />
                </Item>
                {/* <Item disabled>
                  <Input
                    disabled
                    style={{ color: '#3e3f42'}}
                    placeholder={user.country}
                    onChangeText={text => this.setState({ country: text})}
                    value={this.state.country}
                                />
                </Item> */}
              </View>
              <View style={styles.viewheader1}>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_P03}</Text>
                <Item>
                  <Input
                    style={{ color: '#3e3f42'}}
                    placeholder={currentUser.email}
                    onChangeText={text => this.setState({ email: text})}
                    value={this.state.email}
                    onEndEditing={(e) => { editfieldProfile({email: e.nativeEvent.text}); this.liveValidation('userEmail', e.nativeEvent.text) }}
                                />
                </Item>
                <Item >
                  <Input

                    style={{ color: '#3e3f42'}}
                    placeholder={currentUser.phoneNumber}
                    onChangeText={text => this.setState({ phoneNumber: text})}
                    value={this.state.phoneNumber}
                    onEndEditing={(e) => { editfieldProfile({phoneNumber: e.nativeEvent.text}); this.liveValidation('phoneNumber', e.nativeEvent.text) }}
                                />
                </Item>
              </View>
              <View style={styles.viewheader1}>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_P04}</Text>
                <Item disabled>
                  <Input

                    style={{ color: '#3e3f42'}}
                    placeholder={Lang.txt_P01}
                    onChangeText={text => this.setState({ usernamePre: text})}
                    value={this.state.usernamePre}
                    onEndEditing={(e) => { editfieldProfile({usernamePre: e.nativeEvent.text}); this.liveValidation('userName', e.nativeEvent.text) }} />
                </Item>
              </View>
              <View style={styles.viewheader1}>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_P05}</Text>
                <Text style={styles.inProfileTxt}>******</Text>
              </View>

              <View style={styles.buttonview}>
                <TouchableOpacity onPress={() => this._updateProfileDetails()}>
                  <LinearGradient colors={['#ffffff', '#ffffff']}style={styles.lgstyle} >
                    <Text style={styles.buttontext}>{Lang.txt_P06.toUpperCase()}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Content>
          </ScrollView>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  console.log('Profile state: ', state)
  return {
    user: state.user.user,
    userId: state.user.user._id,
    fetching: state.userProfile.fetching,
    error: state.userProfile.error,
    isSuccess: state.userProfile.isSuccess,
    email: state.user.email,
    editUser: state.userProfile.editUser,

    currentUser: state.userProfile.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitEditprofile: (params) => dispatch(ProfileActions.submitEditprofile(params)),
    editfieldProfile: (fields) => dispatch(ProfileActions.editfieldProfile(fields)),
    uploadEditprofile: (photo) => dispatch(ProfileActions.uploadEditprofile(photo)),
    setcityProfile: (value) => dispatch(ProfileActions.setcityProfile(value)),
    setusernameProfile: (value) => dispatch(ProfileActions.setusernameProfile(value)),
    setemailProfile: (value) => dispatch(ProfileActions.setemailProfile(value)),
    setphonenumberProfile: (value) => dispatch(ProfileActions.setphonenumberProfile(value)),
    setpostalcodeProfile: (value) => dispatch(ProfileActions.setpostalcodeProfile(value)),
    editprofileMerge: (newState) => dispatch(ProfileActions.editprofileMerge(newState))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
