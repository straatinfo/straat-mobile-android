import React, { Component } from 'react'
import { View, StatusBar, Text, AsyncStorage } from 'react-native'

//import UnderMigration from './../Components/UnderMigration'
import {drawerData} from './../Navigation/NavigationDrawer'
import MyNotification from './../Components/MyNotification/MyNotification'
import { Container } from 'native-base'
import DrawerHeader from './../Components/DrawerHeader'
import UnderMigration from './../Components/UnderMigration'

export default class MyNotificationScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    AsyncStorage.getItem('userInfo').then((userInfo) => {
      const user = JSON.parse(userInfo)
            /** set user variable */
      this.setState({user: user})
      console.log('user')
      console.log(user)
    })
  }

  render () {
    const pageTitle = drawerData[this.props.navigation.state.key].drawerLabel
    /**
     * under migraiotn so this page must only return migration page
     *
     */

    return (
      <UnderMigration title={pageTitle} {...this.props} />
    )
    /**
    return (
      <Container>
        <DrawerHeader title={pageTitle} />
        <MyNotification title={pageTitle} {...this.props} user={global.usersAccount} />
      </Container>
    ) */
  }
}
