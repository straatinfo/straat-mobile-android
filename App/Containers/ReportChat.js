import React, { Component } from 'react'
import { View, Text } from 'react-native'
import io from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import { Container, Header, Body, Title, Button, Icon, Right, Content, Form, Item, Input } from 'native-base'
import MessageActions from '../Redux/MessageRedux'
import AppConfig from '../Config/AppConfig'

import { drawerData } from '../Navigation/NavigationDrawer'
import { CONNECTION } from '../Services/AppSocket'

// const BASE_URL = AppConfig.ApiUrl
// const socket = io.connect(`${BASE_URL}/v1/api/socket.io/socket.io.min.js`, {transports: ['websocket']})

export default class ReportChat extends Component {
  constructor (props) {
    super(props)
  }

  connection = {}

  componentDidMount () {
    console.log('Report chat props: ', this.props)
    console.log()
  }

  /**
   * When a user joins the chatroom, check if they are an existing user.
   * Checks if the userId has a value.
   * If true, register the user.
   */

  fetchMessages (conversationId) {
    // const { conversationId } = this.props;
    this.props.fetchMessage(conversationId)
  }

  registerUser () {
    const { userId, conversationId } = this.props
    console.log('Registering user...')

    if (userId) {
      console.log('Has user id')

      this.connection = CONNECTION.getConnection(userId)
      // no need for this here , when getConnection: its aut register
      // socket.on('connect', () => {
      //   console.log('User connected...')
      //   // If connected, proceed to registration of userId
      //   socket.emit('register', {
      //     '_user': userId
      //   })
      //   socket.on('register', data => {
      //     // Check first if data returns a value. If registration is successful, enter conversation
      //     console.log('Register data ', data)
      //     // if (data && data.status === 1) {
      //     //   appSocket.emit('enter-convo', {
      //     //     "_conversation": conversationId,
      //     //     "_connection": data._connection
      //     //   });
      //     // } else {
      //     //   /** Do something if registration fails
      //     //    *  Probably show an alert.
      //     //    */
      //     //   console.log(data.message);
      //     // }
      //   })
      // })
    }
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */

  onReceivedMessage (messages) {
    console.log('Receiving messages...', messages)
    this.connection.on('send-message', data => {
        // call an action creator to update state
    })
    this._storeMessages(messages)
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */

  onSend = message => {
    console.log('On send ', message)
    const { conversationId, userId } = this.props
    let params = {
      _conversation: conversationId,
      _author: userId,
      body: message[0].text
    }
    // appSocket.emit('send-message', params);
    /* Dispatch action for sending message to api  */
    console.log('Send message params: ', params)
    this.props.sendMessage(params)
  }
  render () {
    // const pageTitle = drawerData[this.props.navigation.state.key].drawerLabel
    const { title, screen, noHeader, userId, username } = this.props
    return (
      <Container>
        {/*
          !noHeader &&
          <Header style={{ height: 40 }}>
            <Body style={{ flex: 3 }}>
              <Title>{pageTitle}</Title>
            </Body>
            <Right>
              {!screen && <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Icon name='ios-menu' />
              </Button>
              }
              {screen &&
                <Button transparent onPress={() => this.props.navigation.navigate('Login')}>
                  <Icon name='ios-arrow-back' />
                </Button>
              }
            </Right>
          </Header>
            */}
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text>Report Chat</Text>
            {/*  <GiftedChat
              messages={this.props.messages}
              onSend={this.onSend}
              user={{ _id: userId, name: username }}
            /> */}
          </View>
        </Content>
      </Container>
    )
  }

  // Helper functions
  _storeMessages (message) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, message)
      }
    })
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
    conversationId: state.message.conversationId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessage: (conversationId) => dispatch(MessageActions.fetchMessageRequest(conversationId)),
    sendMessage: (params) => dispatch(MessageActions.sendMessageRequest(params))
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ReportChat)
