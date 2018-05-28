import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Badge } from 'native-base'
import { connect } from 'react-redux'
import { ConvoTypes, convoOption } from '../../../Services/Constant'

class ReportChatIcon extends Component {
  chatScreen (report) {
    let cPath = {target: {_id: report._id}, type: ConvoTypes.REPORT, title: report._mainCategory ? report._mainCategory.name || '' : '', _team: report._team}

    if (report._conversation) {
      cPath.target._id = report._conversation._id
      cPath.option = convoOption.BYID
    } else {
      cPath.option = convoOption.BYTYPE
    }

    this.props.navigation.navigate('Chat', cPath)
  }

  _navigation () {
    const {reportMergeState, navigation, item} = this.props
    navigation.navigate('ReportDetails', {report: item})
    reportMergeState({reportDetails: item})
  }
  navigateToReportChat (report) {
    console.log('report', report)
  }
  render () {
    const { report, Lang } = this.props
    return (
      <View style={{flexDirection: 'row',  alignItems: 'center', paddingVertical: 3}}>
        <Badge style={{backgroundColor: 'gray', alignItems: 'center', justifyContent:'center'}}><Text style={{fontWeight: '400', color: 'white'}}>0</Text></Badge>
        <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.chatScreen(report)}><Text style={{fontWeight: '400', color: 'blue'}}>{Lang.messages}</Text></TouchableOpacity>
        <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.chatScreen(report)}><Text style={{fontWeight: '400', color: 'blue'}}>{Lang.show}</Text></TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportChatIcon)


 