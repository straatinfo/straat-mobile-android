import React, { Component } from 'react'
import { View, StatusBar, Text } from 'react-native'

import UnderMigration from './../Components/UnderMigration'
import { drawerData } from './../Navigation/NavigationDrawer'

export default class MyLocation extends Component {
    render() {
        const pageTitle = drawerData[this.props.navigation.state.key].drawerLabel
            /**
             * under migraiotn so this page must only return migration page
             *
             */

        return ( <
            UnderMigration title = { pageTitle } {...this.props }
            />
        )
    }
}