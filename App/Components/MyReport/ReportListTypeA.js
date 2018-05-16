import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Content, Badge } from 'native-base'
import { connect } from 'react-redux'
import NotificationActions from './../../Redux/NotificationRedux'
import ReportsActions from './../../Redux/ReportsRedux'
import ReportChat from '../../Containers/ReportChat'
import Lang from '../../Lib/CutomLanguage'
import { Fonts, Colors } from './../../Themes'

import CircleLoader from '../CircleLoader'
import Spacer from './../../Components/Spacer'

import ReportItem from './Components/ReportItem'
// import { CONNECTION } from '../../Services/AppSocket'
import ConversationActions from '../../Redux/ConversationRedux'
import SocketActions from '../../Redux/SocketRedux'
import { SocketTypes } from '../../Services/Constant'
import ReportChatIcon from './Components/ReportChatIcon';

class ReportTypeAList extends Component {
  conversationId = null

  constructor (props) {
    super(props)

    this.state = {
      isSuccess: false
    }
  }
  componentDidMount () {
    const { notificationRequest  } = this.props
    // this.connection = CONNECTION.getConnection(userId)
    // this.connectionId = CONNECTION.connectionId
    // console.log('Report conversation socket: ', this.connection)
    // console.log('Report conversation socket: ConnectionId ', this.connectionId)
    // console.log('Report conversation props: ', this.props)
    notificationRequest()
  }

  // navigateToReportChat = report => {
  //   const connectionId = this.connectionId
  //   this.conversationId = user.conversations[0]
  //   const { navigation, setSelectedConversationId, nav } = this.props
  //   console.log('report conversation params: ', user)
  //   if (!user.conversations[0]) {
  //     console.log('Creating report conversation...')
  //     this._createConversation(user)
  //   }
  //   console.log('Report ConversationId: ', this.conversationId)
  //   console.log('entering-convo: Emitting...', SocketTypes.ENTER_CONVO)
  //   this.connectionId.emit(SocketTypes.ENTER_CONVO, {
  //     '_conversation': this.conversationId,
  //     '_connection': connectionId
  //   })
  //   this.connectionId.on(SocketTypes.ENTER_CONVO, data => {
  //     console.log('entering-convo: Emit response: ', data)
  //     if (data && data.status === 1) {
  //       this.setState({ isSuccess: true })
  //     }
  //   })
  //   if (this.state.isSuccess === true) {
  //     console.log('Setting conversation id...', this.conversationId)
  //     setSelectedConversationId(this.conversationId)
  //     this.props.navigation.navigate('ReportChat', { title: 'Report' })
  //   }
  // }
/*   navigateToReportChat = report => {
    this.props.navigation.navigate('ReportChat', {report, ...this.props}, { title: "Report"});
  } */

  // _createConversation = report => {
  //   const { userId, conversationId } = this.props
  //   console.log('Report chat')
  //   const conversation = {
  //     'title': 'Report',
  //     'type': 'GLOBAL',
  //     '_author': userId,
  //     '_report': report._id
  //   }
  //   this.props.createConversation(conversation)
  //   if (conversationId) {
  //     this.conversationId = conversationId
  //   }
  // }
  render () {
    const { fetching, reportList, navigation, reportMergeState } = this.props
    console.log(this.props)
    if (fetching) {
      return (<CircleLoader color='blue' />)
    }
    return (
      <Content style={{backgroundColor: Colors.background}}>
        {reportList.length > 0 &&
          reportList.map((report, index) =>
            <View key={report._id}>
              <ReportItem item={report} navigation={navigation} reportMergeState={reportMergeState} />
              {/* <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 30}}>
                <Badge style={{backgroundColor: 'gray'}}><Text style={{fontWeight: '400', color: 'white'}}>0</Text></Badge>
                <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.navigateToReportChat(report)}><Text style={{fontWeight: '400', color: 'blue'}}>Berichten</Text></TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.navigateToReportChat(report)}><Text style={{fontWeight: '400', color: 'blue'}}>Toon</Text></TouchableOpacity>
              </View> */}
              <ReportChatIcon report={report} navigation={navigation} />
            </View>
             )}
        <Spacer />
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.notification.fetchingA,
    error: state.notification.errorA,
    reportList: state.notification.typeAList,
    conversations: state.conversation.conversation,
    conversationId: state.conversation.conversationId,
    connectionId: state.socket.connectionId,
    nav: state.nav
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    notificationRequest: (data) => dispatch(NotificationActions.notificationRequestTypeA(data)),
    notificationMerge: (newState) => dispatch(NotificationActions.notificationMerge(newState)),
    fetchConversations: (conversationId) => dispatch(ConversationActions.fetchConversationRequest(conversationId)),
    setSocketConnectionId: (connectionId) => dispatch(SocketActions.setSocketConnectionId(connectionId)),
    setSelectedConversationId: (conversationId) => dispatch(ConversationActions.setSelectedConversationId(conversationId)),
    createConversation: (conversation) => dispatch(ConversationActions.createConversation(conversation))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportTypeAList)
