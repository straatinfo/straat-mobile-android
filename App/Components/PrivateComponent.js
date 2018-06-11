import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/PrivateComponentStyle'
import { FcmService } from '../Services'
import { CONNECTION } from '../Services/AppSocket'
import { SocketTypes } from '../Services/Constant'
import NotificationActions from './../Redux/NotificationRedux'
import ConversationActions from '../Redux/ConversationRedux'
import MessageActions from './../Redux/MessageRedux'

class PrivateComponent extends Component {
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

  connection = null

  componentDidMount () {
    this.fcmInit()
    this.socketInit()
  }

  fcmInit () {
    const { user } = this.props
    FcmService.configure(user)
    FcmService.start(user)
    //  FcmService.logout()
    __DEV__ && console.log('fcm starting: ', user)
  }

  socketInit () {
    const {_user, token, updateByNotification, messageReceive, convoReceiveMessage, addNotification} = this.props
    this.connection = CONNECTION.getConnection(_user, token)
    this.connection.on(SocketTypes.RECEIVE_GLOBAL, (data) => updateByNotification(SocketTypes.RECEIVE_GLOBAL, data))
    this.connection.on(SocketTypes.RECEIVE_MESSAGE, (data) => {
   //   console.log('convoReceiveMessage', data)
      // update conversation list
      convoReceiveMessage(data)
      // update current message screenList
      messageReceive(data)
      // uopdate notification
      if (data.payload.user._id !== _user) {
        __DEV__ && console.log('data', data)
        addNotification({convo: data.conversation, count: 1})
      }
    })
  }
  render () {
    return null
  }
}

const mapStateToProps = state => {
  return {
    design: state.user.design,
    user: state.user.user,
    _user: state.user.user._id,
    token: state.user.user.token,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateByNotification: (source, data) => dispatch(NotificationActions.updateByNotification(source, data)),

    messageReceive: (params) => dispatch(MessageActions.messageReceive(params)),
    convoReceiveMessage: (param) => dispatch(ConversationActions.convoReceiveMessage(param)),
    addNotification: (param) => dispatch(NotificationActions.addNotification(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateComponent)
