import React, { Component } from 'react'

import DeviceInfo from 'react-native-device-info'
import { View, Text, Button } from 'native-base';
import Chatconnection from './../../Components/Chatconnection'

class FeedBack extends Component {

  render () {
    return (
      <View style={{display: "flex", flex: 1}}>
        <View style={{display: 'flex', flex: 1, backgroundColor: 'blue'}}>
          <Text>jaylord</Text>
        </View>

        <Chatconnection />

      </View>
      )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // sendFeedback: (params) => dispatch(FeedbackActions.sendFeedbackRequest(params))
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(FeedBack)

export default FeedBack