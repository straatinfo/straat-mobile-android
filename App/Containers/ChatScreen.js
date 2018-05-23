import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import { Container, Content } from 'native-base'
import { GiftedChat } from 'react-native-gifted-chat'
import { connect } from 'react-redux'
import MessageActions from '../Redux/MessageRedux'

import { SocketTypes, ConvoTypes, convoOption } from '../Services/Constant'
import HeaderInDrawer from '../Components/HeaderInDrawer'
import CircleLoader from '../Components/CircleLoader'
import CenterView from '../Components/CenterView'

import { CONNECTION } from '../Services/AppSocket'
import { getTeamLogo } from '../Transforms/TeamHelper'
import { crop } from '../Transforms/Cloudinary'
/**
 *
 *  receive -> updateChatRedux ->
 *                   |
 *              find convo id in array in  convoRedux
 *              find & update if current convo Id in message redux if none then dont
 *
 *
 *
 */

class ChatScreen extends Component {
  connection = {}

  constructor (props) {
    super(props)
    this.state = { user: null }
  }

  componentDidMount () {
    // option: byId, byType - refId = (userID, teamID, reportId)

    const { navigation, chatMerge, user: { _id, token }, getMessagesByConvoId, createPostConvo } = this.props
    const { title, option, type, target, _team, _profilePic } = navigation.state.params ||  
    { title: 'test title', option: 'testOption', type: 'testType', target: 'tesTarget', _team: 'testOption', _profilePic: null }

    chatMerge({title: title})

    this.connection = CONNECTION.getConnection(_id, token)

    // must set conversation here
    // only two options 1st is to using conversationID or using createconvo param

    console.log('chatScreen: ', navigation.state.params)
    if (option === convoOption.BYTYPE) {
      // getConversation({type, target})
      if (type === ConvoTypes.USER) {
        createPostConvo({type: ConvoTypes.USER, param: {_author: _id, _chatee: target._id}})
      } else if (type === ConvoTypes.TEAM) {
        createPostConvo({type: ConvoTypes.TEAM, param: {_author: _id, _team: target._id}})
      } else if (type === ConvoTypes.REPORT) {
        createPostConvo({type: ConvoTypes.REPORT, param: {_author: _id, _team: _team, _report: target._id}})
      }
    }

    if (option === convoOption.BYID) {
      // get conversation using convo ID
      getMessagesByConvoId({target: target._id, title: title})
    }

    // set chat screen
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })

    this.initUser()
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress')
  }

  initUser () {
    const { user } = this.props
    const profile = getTeamLogo(user)
    const avatar = profile ? {avatar: crop(200, profile)} : {}

    this.setState({
      user: {
        _id: user._id,
        // avatar: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png',
        name: user.username,
        ...avatar
      }
    })
  }

  componentWillUnmount1 () {
  }

  onSend = onSendMessage => {
    const { conversationId, sendlocalMessage, user } = this.props
    // get user logo, as of now i will use team helper for getting user profile pic url

    const message = {
      _conversation: conversationId,
      _id: onSendMessage[0]._id,
      _author: user._id,
      user: this.state.user,
      text: onSendMessage[0].text,
      createdAt: new Date()
    }

    // reflect changes on chatbox first and remove afterRecive confirm
    sendlocalMessage(message)

    this.connection.emit(SocketTypes.SEND_MESSAGE, message, (test) => {})
  }

  render () {
    const { fetching, user: {_id, username}, navigation, messages, title, fetchingConvo } = this.props
    // if (fetchingConvo) {
    //   return (<CircleLoader color='blue' />)
    // }

    return (
      <Container>
        <HeaderInDrawer navigation={navigation} title={title} noHBack />
        <Content contentContainerStyle={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {fetchingConvo ? <CenterView ><CircleLoader color='blue' /></CenterView>
            : <GiftedChat
              messages={messages}
              onSend={this.onSend}
              user={{ _id: _id, name: username }}
            />}
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
    fetchingConvo: state.message.fetchingConvo,
    error: state.message.error,
    messages: state.message.messages,
    title: state.message.title,
    user: state.user.user,
    conversationId: state.message.conversationId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chatMerge: (newState) => dispatch(MessageActions.chatMerge(newState)),
    getConversation: (params) => dispatch(MessageActions.getConversation(params)),
    getMessagesByConvoId: (params) => dispatch(MessageActions.getMessagesByConvoId(params)),
    sendlocalMessage: (params) => dispatch(MessageActions.sendlocalMessage(params)),
    createPostConvo: (params) => dispatch(MessageActions.createPostConvo(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
