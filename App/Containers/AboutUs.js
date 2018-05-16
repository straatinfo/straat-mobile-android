import React, { Component } from 'react'

import AboutUsScreen from './AboutUs/AboutUs'
import {drawerData} from './../Navigation/NavigationDrawer'

export default class TeamList extends Component {
  render () {
    const pageTitle = drawerData[this.props.navigation.state.key].drawerLabel

    return (
      <AboutUsScreen title={pageTitle} {...this.props} />
    )
  }
}
