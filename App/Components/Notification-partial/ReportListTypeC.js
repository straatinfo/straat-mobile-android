import React, { Component } from 'react'
import { View } from 'react-native'
import { Content } from 'native-base'
import { connect } from 'react-redux'
import NotificationActions from './../../Redux/NotificationRedux'
import ReportsActions from './../../Redux/ReportsRedux'

import { Fonts, Colors } from './../../Themes'

import CircleLoader from '../CircleLoader'
import Spacer from './../../Components/Spacer'

import ReportItem from './Components/ReportItem'

class ReportListTypeC extends Component {
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
        {reportList.length > 0 && reportList.map((report, index) => <ReportItem key={report._id} item={report} navigation={navigation} reportMergeState={reportMergeState} />)}
        <Spacer />
      </Content>)
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.notification.fetchingC,
    error: state.notification.errorC,
    reportList: state.notification.typeCList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    notificationRequest: (data) => dispatch(NotificationActions.notificationRequestTypeC(data)),
    notificationMerge: (newState) => dispatch(NotificationActions.notificationMerge(newState))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportListTypeC)
