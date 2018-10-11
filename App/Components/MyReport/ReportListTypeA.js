import React, { Component } from 'react'
import { Content, View, Text } from 'native-base'
import { AlertBox, CircleLoader } from './../../Components'
import { connect } from 'react-redux'
import { Colors } from './../../Themes'
import NotificationActions from './../../Redux/NotificationRedux'
import ConversationActions from '../../Redux/ConversationRedux'
import ReportsActions from './../../Redux/ReportsRedux'
import ReportItem from './Components/ReportItem'
import MyReportActions from './../../Redux/MyReportRedux'
import SocketActions from '../../Redux/SocketRedux'
import { StatusSource } from '../../Services/Constant';

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
    notificationRequest()
  }

  _remove (report) {
    const { unfollowReport, Lang } = this.props
    AlertBox.alert(
      Lang.confirmation, Lang.txt_J45,
      [{text: 'Delete', 
        onPress: () => {
          unfollowReport(report._id);
        }}, {text: 'Cancel', onPress: () => { }}],
      { cancelable: true }
    )
  }

  render () {
    const { fetching, reportList, navigation, reportMergeState, user } = this.props
    const onRemove = this._remove.bind(this)
    if (fetching) {
      return (<CircleLoader color='blue' />)
    }
    return (
      <Content style={{backgroundColor: Colors.background}}>
        {reportList.length > 0 &&
          reportList.map((report, index) =>
            <View key={report._id}>
              <ReportItem 
                item={report} 
                navigation={navigation} 
                reportMergeState={reportMergeState} 
                onRemove={onRemove} 
                swiper
                hidden={!!report.unfollow ? report.unfollow.user.toString() === user._id.toString() ? true : false : false }
                statusSource={StatusSource.reportA} 
              />
            </View>
             )}
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
    Lang: state.language.Languages,
    user: state.user.user,
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
    createConversation: (conversation) => dispatch(ConversationActions.createConversation(conversation)),
    deleteMyreport: (_id) => dispatch(MyReportActions.deleteMyreport(_id)),
    unfollowReport: (_id) => dispatch(MyReportActions.unfollowReport(_id))
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportTypeAList)
