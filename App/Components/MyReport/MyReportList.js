import React, { Component } from 'react'
import { View } from 'react-native'
import { Content } from 'native-base'
import { connect } from 'react-redux'
import ReportsActions from './../../Redux/ReportsRedux'
import MyReportActions from './../../Redux/MyReportRedux'

import { Fonts, Colors } from './../../Themes'

import CircleLoader from '../CircleLoader'
import Spacer from './../../Components/Spacer'

import ReportItem from './Components/ReportItem'
import ReportChatIcon from './Components/ReportChatIcon'
import { AlertBox } from './../../Components'

class MyReportList extends Component {
  componentDidMount () {
    const { myReportRequest } = this.props
    myReportRequest()
  }
  _remove (report) {
    const { deleteMyreport, Lang } = this.props
    AlertBox.alert(
      Lang.confirmation, Lang.txt_J45,
      [{text: 'Delete', onPress: () => deleteMyreport(report._id)}, {text: 'Cancel', onPress: () => { }}],
      { cancelable: true }
    )
  }
  render () {
    const { fetching, reportList, navigation, reportMergeState } = this.props
    __DEV__ && console.log(this.props)
    const onRemove = this._remove.bind(this)
    return (
    (fetching && <CircleLoader color='blue' />) ||
    (!fetching &&
      <Content style={{backgroundColor: Colors.background}}>
        {reportList.length > 0 &&
          reportList.map((report, index) =>
            <View key={report._id}>
              <ReportItem item={report} navigation={navigation} reportMergeState={reportMergeState} swiper onRemove={onRemove} />
              {/* <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 30}}>
                <Badge style={{backgroundColor: 'gray'}}><Text style={{fontWeight: '400', color: 'white'}}>0</Text></Badge>
                <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.navigateToReportChat(report)}><Text style={{fontWeight: '400', color: 'blue'}}>Berichten</Text></TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.navigateToReportChat(report)}><Text style={{fontWeight: '400', color: 'blue'}}>Toon</Text></TouchableOpacity>
              </View>
              <ReportChatIcon report={report} navigation={navigation} /> */}
            </View>
             )}
        {/* <Spacer /> */}
      </Content>)
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.myReport.fetching,
    error: state.myReport.error,
    reportList: state.myReport.myReportList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    myReportRequest: (data) => dispatch(MyReportActions.myReportRequest(data)),
    myReportMerge: (newState) => dispatch(MyReportActions.myReportMerge(newState)),
    deleteMyreport: (_id) => dispatch(MyReportActions.deleteMyreport(_id))


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyReportList)
