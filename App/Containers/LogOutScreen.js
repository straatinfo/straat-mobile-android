import React, { Component } from 'react'
import { View, StatusBar, Text, AsyncStorage } from 'react-native'

// import UnderMigration from './../Components/UnderMigration'
import {drawerData} from './../Navigation/NavigationDrawer'
import MyNotification from './../Components/MyNotification/MyNotification'
import { Container } from 'native-base'
import DrawerHeader from './../Components/DrawerHeader'
import UnderMigration from './../Components/UnderMigration'

import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
import ReportActions from './../Redux/ReportsRedux'
import UserActions from './../Redux/UserRedux'
import TeamActions from './../Redux/TeamRedux'
import MessageActions from './../Redux/MessageRedux'
import ReportMapActions from './../Redux/ReportMapRedux'
import TeamListpActions from './../Redux/TeamListRedux'

import { AppData } from '../Redux/commonRedux';
import { CONNECTION } from '../Services/AppSocket';

class LogOutScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const { userReset, reportReset, messageReset, reportmapReset, teamlistReset, navigation } = this.props
    // clean all reduxes
    
    userReset()
    reportReset()
    messageReset()
    reportmapReset()
    teamlistReset()
    AppData.reset()

    const connection = CONNECTION.getConnection()
    // connection.disconnect()
    CONNECTION.logout()
    navigation.navigate('Splash')
    // console.log('connection', connection)
  }

  render () {
    return (
      <View />
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    userReset: (params) => dispatch(UserActions.userReset(params)),
    teamReset: (params) => dispatch(TeamActions.teamReset(params)),
    messageReset: (params) => dispatch(MessageActions.messageReset(params)),
    reportmapReset: (params) => dispatch(ReportMapActions.reportmapReset(params)),
    teamlistReset: (params) => dispatch(TeamListpActions.teamlistReset(params)),
    reportReset: (params) => dispatch(ReportActions.reportReset(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOutScreen)
