import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container, Content, Form, Item, Input } from 'native-base'
import { connect } from 'react-redux'
import { Metrics } from '../../Themes'
import FeedbackActions from '../../Redux/FeedbackRedux'
import LinearGradient from 'react-native-linear-gradient'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import Styles from './FeedbackScreenStyles'
import DeviceInfo from 'react-native-device-info'
class FeedBack extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      problem: '',
      visibleHeight: Metrics.screenHeight,
      submitStatus: false
    }
  }
  feedbackInfo = []
  _handleChangeName = text => {
    // handles change of text in name
    this.setState({ name: text })
  }

  _handleChangeEmail = text => {
    // handles change of text in email
    this.setState({ email: text })
  }

  _handleChangeProblem = text => {
    // handles change of text in problem
    this.setState({ problem: text, submitStatus: true })
  }

  _handleSubmit = () => {
    // handle feedback submit
    const { name, email, problem } = this.state
    const { userId } = this.props
    const params = {
      userId,
      data: {
        feedback: problem,
        reporterName: name,
        reporterEmail: email,
        info: this.feedbackInfo
      }
    }
    this.props.sendFeedback(params)
  }
  componentDidMount () {
    // this.feedbackInfo = [
    //   {title: 'Device Manufacturer', info: DeviceInfo.getManufacturer()},
    //   {title: 'Device Model', info: DeviceInfo.getModel()},
    //   {title: 'Device System Name', info: DeviceInfo.getSystemName()},
    //   {title: 'Device Version', info: DeviceInfo.getSystemVersion()},

    //   {title: 'Bundle Id', info: DeviceInfo.getBundleId()},
    //   {title: 'Build Number', info: DeviceInfo.getBuildNumber()},
    //   {title: 'App Version', info: DeviceInfo.getVersion()},
    //   {title: 'App Version (Readable)', info: DeviceInfo.getReadableVersion()}
    // ]

    this.feedbackInfo = [
      {title: 'Device Manufacturer', info: DeviceInfo.getManufacturer()},
      {title: 'Device Name', info: DeviceInfo.getDeviceName()},
      {title: 'Device Model', info: DeviceInfo.getModel()},
      {title: 'Device Unique ID', info: DeviceInfo.getUniqueID()},
      {title: 'Device Locale', info: DeviceInfo.getDeviceLocale()},
      {title: 'Device Country', info: DeviceInfo.getDeviceCountry()},
      {title: 'User Agent', info: DeviceInfo.getUserAgent()},

      {title: 'Device System Name', info: DeviceInfo.getSystemName()},
      {title: 'Device ID', info: DeviceInfo.getDeviceId()},
      {title: 'Device Version', info: DeviceInfo.getSystemVersion()},

      {title: 'Bundle Id', info: DeviceInfo.getBundleId()},
      {title: 'Build Number', info: DeviceInfo.getBuildNumber()},
      {title: 'App Version', info: DeviceInfo.getVersion()},
      {title: 'App Version (Readable)', info: DeviceInfo.getReadableVersion()}
    ]
  }
  render () {
    const { title, navigation, design, Lang } = this.props
    const { name, email, problem, submitStatus } = this.state
    return (
      <Container>
        <HeaderInDrawer title={title} navigation={navigation} />
        <Content padder>
          <View style={Styles.form}>
            <Form>
              <Item regular style={Styles.item}>
                <Input
                  ref={'name'}
                  value={name}
                  // editable={editable}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={this._handleChangeName}
                  underlineColorAndroid='transparent'
                  placeholder={Lang.txt_Z08}
                  onSubmitEditing={() => this.refs.email._root.focus()} />
              </Item>
              <Item regular style={Styles.item}>
                <Input
                  ref={'email'}
                  placeholder={Lang.txt_C02}
                  value={email}
                  // editable={editable}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={this._handleChangeEmail}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={() => this.refs.problem._root.focus()} />
              </Item>
              <Item regular style={Styles.item}>
                <Input
                  ref={'problem'}
                  value={problem}
                  // editable={editable}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  multiline
                  numberOfLines={5}
                  onChangeText={this._handleChangeProblem}
                  underlineColorAndroid='transparent'
                  placeholder={Lang.txt_Z09}
                  onSubmitEditing={() => this._handleSubmit} />
              </Item>
            </Form>
          </View>

          <View style={Styles.buttonContainer}>
            <TouchableOpacity disabled={!submitStatus} underlayColor='rgba(0,0,0,0.0)' onPress={this._handleSubmit}>
              <LinearGradient colors={[submitStatus ? design.button2 : '#a6b2c1', submitStatus ? design.button : '#7f8893']} style={Styles.linearGradient}>
                <Text style={Styles.buttonText}>{Lang.txt_Z10.toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.user._id,
    isFetching: state.feedback.fetching,
    error: state.feedback.error,
    isSuccess: state.feedback.isSuccess,
    design: state.user.design,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendFeedback: (params) => dispatch(FeedbackActions.sendFeedbackRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack)
