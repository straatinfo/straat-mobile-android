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

class ReporTypeBtList extends Component {
  componentDidMount () {
    const { notificationRequest } = this.props
    notificationRequest()
  }

  render () {
    const { fetching, reportList, navigation, reportMergeState } = this.props
    console.log(this.props)
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
