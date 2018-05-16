import React, { Component } from 'react'
import { View, StatusBar, Text, Switch } from 'react-native'
import { Container } from 'native-base'

import UnderMigration from './../Components/UnderMigration'
import SettingForm from './Settings/SettingForm'
import { drawerData } from './../Navigation/NavigationDrawer'


export default class Setting extends Component {

  render() {
    const pageTitle = drawerData[this.props.navigation.state.key] ? drawerData[this.props.navigation.state.key].drawerLabel : 'Setting'
    /**
     * under migraiotn so this page must only return migration page
     *
     */
    

    return (
      <SettingForm title={pageTitle} {...this.props} />
      //<UnderMigration title={pageTitle} {...this.props} />
    )
  }
}
