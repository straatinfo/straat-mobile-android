import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Badge, View, Text } from 'native-base'
import { connect } from 'react-redux'
import { ConvoTypes, convoOption } from '../../../Services/Constant'
import { showAlertBox } from '../../../Redux/commonRedux';

class ReportChatIcon extends Component {
  chatScreen (report) {
    const { Lang } = this.props
    let cPath = {target: {_id: report._id}, type: ConvoTypes.REPORT, title: report._mainCategory ? report._mainCategory.name || '' : '', _team: report._team}

    if (report._conversation) {
      cPath.target._id = report._conversation._id
      cPath.option = convoOption.BYID
    } else {
      cPath.option = convoOption.BYTYPE
    }

    if (!report._team) {
      showAlertBox(Lang.txt_E11)
      return true
    }
    this.props.navigation.navigate('Chat', cPath)
  }

  _messageCount (report) {
    if (report && report._conversation && report._conversation.messages) {
      return report._conversation.messages.length
    }
    return '0'
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
        <Badge style={{backgroundColor: 'gray', alignItems: 'center', justifyContent:'center'}}><Text style={{fontWeight: '400', color: 'white'}}>{this._messageCount(report)}</Text></Badge>
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


 