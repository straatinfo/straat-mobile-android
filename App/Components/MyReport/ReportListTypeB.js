import React, { Component } from 'react'
import { TouchableWithoutFeedback } from 'react-native';
import { Content, View, Text } from 'native-base'
import { AlertBox, CircleLoader } from './../../Components'
import { connect } from 'react-redux'
import { Colors } from './../../Themes'
import NotificationActions from './../../Redux/NotificationRedux'
import MyReportActions from './../../Redux/MyReportRedux'
import ReportsActions from './../../Redux/ReportsRedux'
import ReportItem from './Components/ReportItem'
import { StatusSource } from '../../Services/Constant';

class ReporTypeBtList extends Component {
  componentDidMount () {
    const { notificationRequest } = this.props
    notificationRequest()
  }

  _remove (report) {
    const { unfollowReport, Lang } = this.props
    AlertBox.alert(
      Lang.confirmation, Lang.txt_J45,
      [{text: 'Delete', 
        onPress: () => {
          // deleteMyreport(report._id)
          // console.log("delete me")
          console.log('unfollow');
          unfollowReport(report._id);
        }}, {text: 'Cancel', onPress: () => { }}],
      { cancelable: true }
    )
  }

  render () {
    const { fetching, reportList, navigation, reportMergeState, user } = this.props
    const onRemove = this._remove.bind(this)
    return (
    (fetching && <CircleLoader color='blue' />) ||
    (!fetching &&
      <Content style={{backgroundColor: Colors.background}}>
        {reportList.length > 0 &&
          reportList.map((report, index) =>
          <TouchableWithoutFeedback key={report._id} onPress={() => {console.log('hey')}}>
            <View>
              <ReportItem 
                item={report} 
                navigation={navigation} 
                reportMergeState={reportMergeState} 
                onRemove={onRemove} 
                hidden={!!report.unfollow ? report.unfollow.user.toString() === user._id.toString() ? true : false : false }
                statusSource={StatusSource.reportB} 
              />
              {/* <ReportItem item={report} navigation={navigation} reportMergeState={reportMergeState} statusSource={StatusSource.reportB} /> */}
              {/* <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 30}}>
                <Badge style={{backgroundColor: 'gray'}}><Text style={{fontWeight: '400', color: 'white'}}>0</Text></Badge>
                <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.navigateToReportChat(report)}><Text style={{fontWeight: '400', color: 'blue'}}>Berichten</Text></TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.navigateToReportChat(report)}><Text style={{fontWeight: '400', color: 'blue'}}>Toon</Text></TouchableOpacity>
              </View>
              <ReportChatIcon report={report} navigation={navigation} /> */}
            </View>
            </TouchableWithoutFeedback>
            )}
      </Content>)
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.notification.fetchingB,
    error: state.notification.errorB,
    reportList: state.notification.typeBList,
    user: state.user.user,
    Lang: state.language.Languages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    notificationRequest: (data) => dispatch(NotificationActions.notificationRequestTypeB(data)),
    notificationMerge: (newState) => dispatch(NotificationActions.notificationMerge(newState)),
    unfollowReport: (_id) => dispatch(MyReportActions.unfollowReport(_id))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReporTypeBtList)
