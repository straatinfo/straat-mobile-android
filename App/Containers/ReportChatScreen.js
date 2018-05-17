import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import MessageActions from '../Redux/MessageRedux'
import AppConfig from '../Config/AppConfig'
import { Container, Header, Body, Title, Button, Icon, Right, Content, Form, Item, Input } from 'native-base'
import CircleLoader from '../Components/CircleLoader'
import { NavigationActions } from 'react-navigation';
import { SocketTypes } from '../Services/Constant';

import HeaderInDrawer from '../Components/HeaderInDrawer'

import { CONNECTION } from '../Services/AppSocket'

class TeamChat extends Component {
  connection = {}

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { userId } = this.props
    this.fetchMessages();

    this.connection = CONNECTION.getConnection(userId)
    this.connectionId = CONNECTION.connectionId;
    console.log('Chat props: ', this.props)
    console.log('Getting socket in component: ', this.connection)
  }

  componentWillUnmount() {
    const { conversationId } = this.props;
    this.connection.emit(SocketTypes.EXIT_CONVO, {
      "_conversation": conversationId,
      "_connection": this.connectionId
    })
  }

  fetchMessages() {
    const { conversationId, userId, } = this.props
    console.log('Chat screen conversationId: ', conversationId)
    if (conversationId) {
      this.props.fetchMessage(conversationId)
    }
  }

  onSend = message => {
    const { conversationId, sendMessage } = this.props;
    let params = {
      _conversation: conversationId,
      _author: message[0].user._id,
      body: message[0].text
    }
    console.log('send-message: Emitting...', SocketTypes.SEND_MESSAGE);
    this.connection.emit(SocketTypes.SEND_MESSAGE, params);
    this.connection.on(SocketTypes.SEND_MESSAGE, data => {
      console.log('send-message: Emit Response: ', data);
      if (data && data.status === 1) {
        /* Dispatch action for sending message to api  */
        console.log('send-message: params: ', params);
        sendMessage(params);
      }
    })
  }
  render() {
    console.log('Chat Screen navigation params: ', this.props.navigation.state.params);
    console.log('Chat Screen props: ', this.props);
    const { title } = this.props.navigation.state.params || { title: '' }
    const { fetching, userId, username, navigation, messages } = this.props
    if (fetching) {
      return (<CircleLoader color='blue' />)
    }
    return (
      <Container>
        <HeaderInDrawer navigation={navigation} title={ title } />
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <GiftedChat
              messages={messages}
              onSend={this.onSend}
              user={{ _id: userId, name: username }}
            />
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  console.log('Chat State: ', state)
  return {
    fetching: state.message.fetching,
    error: state.message.error,
    messages: state.message.messages,
    userId: state.user.user._id,
    username: state.user.user.username,
    conversationId: state.conversation.conversationId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessage: (conversationId) => dispatch(MessageActions.fetchMessageRequest(conversationId)),
    sendMessage: (params) => dispatch(MessageActions.sendMessageRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamChat)
