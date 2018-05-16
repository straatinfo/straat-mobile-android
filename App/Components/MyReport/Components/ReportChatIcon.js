import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Badge } from 'native-base'
// import FastImage from 'react-native-fast-image'

// import { GetDate, GetTime } from './../../../Lib/Helper/TimeUtils'
import Lang from './../../../Lib/CutomLanguage'
import { ConvoTypes, convoOption } from '../../../Services/Constant'
// import { Fonts, Images } from './../../../Themes'
// import style from './style'
// import CenterView from './../../../Components/CenterView'
// import RowView from './../../../Components/RowView'
// import ImageTumb from './ImageTumb'
// import { cropWH, crop } from '../../../Transforms/Cloudinary'
// import Urgency from './Urgency'
// import { getStyleStatusInPin } from '../../../Transforms/ReportHelper'

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
    const { report } = this.props
    return (
      <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 30}}>
        <Badge style={{backgroundColor: 'gray'}}><Text style={{fontWeight: '400', color: 'white'}}>0</Text></Badge>
        <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.chatScreen(report)}><Text style={{fontWeight: '400', color: 'blue'}}>Berichten</Text></TouchableOpacity>
        <TouchableOpacity style={{marginLeft: 10}} onPress={(e) => this.chatScreen(report)}><Text style={{fontWeight: '400', color: 'blue'}}>Toon</Text></TouchableOpacity>
      </View>
    )
  }
}

export default ReportChatIcon
