import React, { Component } from 'react'
import { Content, View } from 'native-base'
import { CircleLoader } from './../../Components'
import { connect } from 'react-redux'
import { Colors } from './../../Themes'
import NotificationActions from './../../Redux/NotificationRedux'
import ReportsActions from './../../Redux/ReportsRedux'
import ReportItem from './Components/ReportItem'

class ReporTypeBtList extends Component {
  componentDidMount () {
    const { notificationRequest } = this.props
    notificationRequest()
  }

  render () {
    const { fetching, reportList, navigation, reportMergeState } = this.props

    return (
    (fetching && <CircleLoader color='blue' />) ||
    (!fetching &&
      <Content style={{backgroundColor: Colors.background}}>
        {reportList.length > 0 &&
          reportList.map((report, index) =>
            <View key={report._id}>
              <ReportItem item={report} navigation={navigation} reportMergeState={reportMergeState} />
              {/* <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 30}}>
                <Badge style={{backgroundColor: 'gray'}}><Text style={{fontWeight: '400', color: 'white'}}>0</Text></Badge>
                <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.navigateToReportChat(report)}><Text style={{fontWeight: '400', color: 'blue'}}>Berichten</Text></TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.navigateToReportChat(report)}><Text style={{fontWeight: '400', color: 'blue'}}>Toon</Text></TouchableOpacity>
              </View>
              <ReportChatIcon report={report} navigation={navigation} /> */}
            </View>
            )}
      </Content>)
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.notification.fetchingB,
    error: state.notification.errorB,
    reportList: state.notification.typeBList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    notificationRequest: (data) => dispatch(NotificationActions.notificationRequestTypeB(data)),
    notificationMerge: (newState) => dispatch(NotificationActions.notificationMerge(newState))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReporTypeBtList)
