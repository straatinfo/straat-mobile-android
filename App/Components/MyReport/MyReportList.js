import React, { Component } from 'react'
import { Content, View } from 'native-base'
import { AlertBox, CircleLoader } from './../../Components'
import { connect } from 'react-redux'
import { Colors } from './../../Themes'
import MyReportActions from './../../Redux/MyReportRedux'
import ReportItem from './Components/ReportItem'
import ReportsActions from './../../Redux/ReportsRedux'
import { StatusSource } from '../../Services/Constant';

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
    const onRemove = this._remove.bind(this)
    return (
    (fetching && <CircleLoader color='blue' />) ||
    (!fetching &&
      <Content style={{backgroundColor: Colors.background}}>
        {reportList.length > 0 &&
          reportList.map((report, index) =>
            <View key={report._id}>
              <ReportItem 
                item={report} 
                navigation={navigation} 
                reportMergeState={reportMergeState} 
                swiper 
                onRemove={onRemove} 
                statusSource={StatusSource.myList} 
                hidden={false}
              />
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
