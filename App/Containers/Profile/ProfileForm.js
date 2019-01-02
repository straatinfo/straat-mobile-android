import React from 'react'
import { View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Text, Container, Content, Item, Input } from 'native-base'
import { connect } from 'react-redux'
import { checkPassword, toUserModel } from '../../Transforms/RegistrationHelper'
import { crop } from '../../Transforms/Cloudinary'
import { errorAlert } from '../../Lib/Helper/alertHelper'
import { isValidUserName } from '../../Redux/UserRedux'
import { Images } from './../../Themes'
import { getTeamLogo } from '../../Transforms/TeamHelper'
import { usernameSeparator } from '../../Services/Constant'
import ImagePicker from 'react-native-image-picker'
import LinearGradient from 'react-native-linear-gradient'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import ProfileActions from '../../Redux/ProfileRedux'
import styles from './../Profile/styles'
import ValidationComponent from 'react-native-form-validator'

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
    const { user, editprofileMerge } = this.props
    const tuser = toUserModel(user)
    this.setState(tuser)
    editprofileMerge({currentUser: tuser, editUser: tuser})
  }

  liveValidation (key, value) {
    const { Lang } = this.props
    /**
     * @param key(String: enum(userEmail, userName, postaCode)), value
     */
    // __DEV__ && console.log('validating liveValidation', key, value)
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
    const { Lang } = this.props
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
          __DEV__ && console.log('User cancelled photo picker')
        } else if (response.error) {
          __DEV__ && console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          __DEV__ && console.log('User tapped custom button: ', response.customButton)
        } else {
          delete response.data
          __DEV__ && console.log('response', response)
       //   this.setState({ teamPhoto: response.uri })
          uploadEditprofile(response)
        }
      })
    } catch (error) {
      __DEV__ && console.log(error)
    }
  }
  validate () {
    const { inemail, inusername, incity, inphonenumber, inpostalCode } = this.props
    return !(inemail || inusername || incity || inphonenumber || inpostalCode)
  }
  render () {
    const { navigation, editfieldProfile, currentUser, editUser, Lang } = this.props
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
                    onChangeText={text => this.setState({ fname: text})}
                    value={this.state.fname}
                    onEndEditing={(e) => { editfieldProfile({fname: e.nativeEvent.text}) }}
                                />
                </Item>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_D10}</Text>
                <Item >
                  <Input

                    style={{ color: '#3e3f42'}}
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
                    onChangeText={text => this.setState({ houseNumber: text})}
                    value={this.state.houseNumber}
                    onEndEditing={(e) => { editfieldProfile({houseNumber: e.nativeEvent.text}) }}
                                />
                </Item>
                <Item >
                  <Input

                    style={{ color: '#3e3f42'}}
                    onChangeText={text => this.setState({ streetName: text})}
                    value={this.state.streetName}
                    onEndEditing={(e) => { editfieldProfile({streetName: e.nativeEvent.text}) }} />
                </Item>
                <Item >
                  <Input

                    style={{ color: '#3e3f42'}}
                    onChangeText={text => this.setState({ postalCode: text})}
                    value={this.state.postalCode}
                    onEndEditing={(e) => { editfieldProfile({postalCode: e.nativeEvent.text}); this.liveValidation('postalCode', e.nativeEvent.text) }} />
                </Item>
                <Item >
                  <Input

                    style={{ color: '#3e3f42'}}
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
                    onChangeText={text => this.setState({ email: text})}
                    value={this.state.email}
                    onEndEditing={(e) => { editfieldProfile({email: e.nativeEvent.text}); this.liveValidation('userEmail', e.nativeEvent.text) }}
                                />
                </Item>
                <Item >
                  <Input

                    style={{ color: '#3e3f42'}}
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

    currentUser: state.userProfile.currentUser,
    Lang: state.language.Languages
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
