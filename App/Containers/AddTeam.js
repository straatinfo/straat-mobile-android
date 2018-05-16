import React, { Component } from 'react';


import AddTeamScreen from './MyTeam/AddTeamScreen';
import Lang from '../Lib/CutomLanguage';
import {drawerData} from '../Navigation/NavigationDrawer';

export default class TeamList extends Component {
    render() {
        // const pageTitle = drawerData[this.props.navigation.state.key].drawerLabel

    return(
    <AddTeamScreen title= {Lang.txt_Z07} {...this.props}/>
    )}
}   