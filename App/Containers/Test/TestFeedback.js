import React, { Component } from 'react'

import DeviceInfo from 'react-native-device-info'
class FeedBack extends Component {
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

  HARDWARE_DATA = [
    {title: 'Device Manufacturer', info: DeviceInfo.getManufacturer()},
    {title: 'Device Name', info: DeviceInfo.getDeviceName()},
    {title: 'Device Model', info: DeviceInfo.getModel()},
    {title: 'Device Unique ID', info: DeviceInfo.getUniqueID()},
    {title: 'Device Locale', info: DeviceInfo.getDeviceLocale()},
    {title: 'Device Country', info: DeviceInfo.getDeviceCountry()},
    {title: 'User Agent', info: DeviceInfo.getUserAgent()}
  ]

  OS_DATA = [
    {title: 'Device System Name', info: DeviceInfo.getSystemName()},
    {title: 'Device ID', info: DeviceInfo.getDeviceId()},
    {title: 'Device Version', info: DeviceInfo.getSystemVersion()}
  ]

  APP_DATA = [
    {title: 'Bundle Id', info: DeviceInfo.getBundleId()},
    {title: 'Build Number', info: DeviceInfo.getBuildNumber()},
    {title: 'App Version', info: DeviceInfo.getVersion()},
    {title: 'App Version (Readable)', info: DeviceInfo.getReadableVersion()}
  ]

  render () {
    console.log(this.HARDWARE_DATA)
    console.log(this.OS_DATA)
    console.log(this.APP_DATA)
    console.log(JSON.stringify(this.HARDWARE_DATA))
    console.log(JSON.stringify(this.OS_DATA))
    console.log(JSON.stringify(this.APP_DATA))
    return null
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendFeedback: (params) => dispatch(FeedbackActions.sendFeedbackRequest(params))
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(FeedBack)

export default FeedBack