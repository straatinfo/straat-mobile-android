import React, { Component } from 'react'
import { View, TouchableOpacity, Modal, TextInput } from 'react-native'
import { Container, Header, Body, Text, Title, Button, Icon, Right, Content, Form, Item, Input, Left, Thumbnail, Card, CardItem, H1 } from 'native-base'
import { connect } from 'react-redux'
import ConversationActions from '../Redux/ConversationRedux'
import NotificationActions from '../Redux/NotificationRedux'
import TeamChat from './ChatScreen'
import { Images } from '../Themes'
import SocketActions from '../Redux/SocketRedux'
import { SocketTypes, convoOption, notificationTypes, ConvoTypes } from '../Services/Constant'
import { getTeamLogo } from '../Transforms/TeamHelper'
import { crop } from '../Transforms/Cloudinary'
import CircleLoader from '../Components/CircleLoader'
import CreateConversation from './CreateConversation'
import { NavigationActions } from 'react-navigation'

import { CONNECTION } from '../Services/AppSocket'

class Conversation extends Component {
  componentDidMount () {
    const { getConversationList } = this.props
    console.log('Conversation')
    getConversationList({})
  }
  _navigateToTeamChat = () => {

  }
  chatScreen (conversation) {
    const { clearNotification } = this.props
    clearNotification({type: notificationTypes.chat})

    // this.props.navigation.navigate('Chat', {
    //   conversationId: conversation._id,
    //   title: conversation.title,
    //   messages: [],
    //   option: convoOption.BYID,
    //   target: {_id: conversation._id}  //  {_id: '5adf2b173e894d0014c77f53'},
    //   // type: ConvoTypes.USER
    // })

    // used till back end fix
    this.props.navigation.navigate('Chat', {
      conversationId: conversation._id,
      title: conversation.title,
      messages: [],
      option: convoOption.BYTYPE,
      target: {_id: conversation._id},  //  {_id: '5adf2b173e894d0014c77f53'},
      type: ConvoTypes.TEAM
    })
  }
//   {logo
//     ? <Thumbnail large source={{ uri: crop(200, logo) }} />
//     : <Thumbnail large source={Images.empty} />
// }

  lastMessage = (convo) => {
    return convo.messages ? convo.messages[0] || '' : ''
  }
  _renderTeamList = conversation => {
    const logo = getTeamLogo(conversation)
    // const hasNew = conversation.hasNew
    return (

      <Card style={{ flex: 0 }} key={conversation._id}>
        <CardItem>
          <Left>
            <TouchableOpacity onPress={() => this.chatScreen(conversation)} >
              {logo
                ? <Thumbnail size={100} source={{ uri: crop(200, logo) }} />
                : <Thumbnail size={100} source={Images.empty} />
                }
            </TouchableOpacity>
            <Body>
              <TouchableOpacity transparent onPress={() => this.chatScreen(conversation)}>
                <H1>{conversation.title}</H1>
                <Text note>{ conversation.lastMessage || ''}</Text>
              </TouchableOpacity>
            </Body>
          </Left>
        </CardItem>
      </Card >
    )
  }
  render () {
    const { conversationList, fetching } = this.props
    if (fetching) {
      return (<CircleLoader color='blue' />)
    }

    return (
      <Container>
        <Content>
          { conversationList.map(this._renderTeamList) }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  console.log('Conversation State: ', state)
  return {
    fetching: state.conversation.fetching,
    user: state.user.user,
    conversationList: state.conversation.conversationList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchConversations: (conversationId) => dispatch(ConversationActions.fetchConversationRequest(conversationId)),
    setSocketConnectionId: (connectionId) => dispatch(SocketActions.setSocketConnectionId(connectionId)),
    setSelectedConversationId: (conversationId) => dispatch(ConversationActions.setSelectedConversationId(conversationId)),
    createConversation: (conversation) => dispatch(ConversationActions.createConversation(conversation)),
    getConversationList: (param) => dispatch(ConversationActions.getConversationList(param)),
    clearNotification: (param) => dispatch(NotificationActions.clearNotification(param))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)
