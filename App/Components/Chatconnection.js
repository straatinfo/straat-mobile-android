import React, { Component } from 'react'
// import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { View, Text, Title, Button } from 'native-base';
import styles from './Styles/ChatconnectionStyle'
import { chatSocketEvent } from '../Redux/ChatconnectionRedux';

class Chatconnection extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  _message (socketState) {
    const { Lang } = this.props
    if (socketState === chatSocketEvent.connect) {
      return Lang.connected
    }

    if (socketState === chatSocketEvent.disconnect) {
      return Lang.disconnected
    }

    if (socketState === chatSocketEvent.reconnecting || socketState === chatSocketEvent.reconnect) {
      return Lang.connecting
    }
  
    return ''
  }

  _color (socketState) {
    if (socketState ===  chatSocketEvent.connect) {
      return { success: true }
    }

    if (socketState === chatSocketEvent.reconnecting || socketState === chatSocketEvent.reconnect) {
      return { warning: true }
    }

    if (socketState === chatSocketEvent.disconnect) {
      return { danger: true }
    }
    return { }
  }

  render () {
    const { socketState } = this.props

    if (socketState === chatSocketEvent.connect) {
      return null
    }

    return (
      <View style={styles.container}>
        <Button {...this._color(socketState)} full><Text> { this._message(socketState) } </Text></Button>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    socketState: state.chatconnection.socketState,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // sendFeedback: (params) => dispatch(FeedbackActions.sendFeedbackRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatconnection)
 