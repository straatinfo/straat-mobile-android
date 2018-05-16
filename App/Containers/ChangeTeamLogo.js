import React, { Component } from 'react';


import ChangeTeamLogoScreen from './MyTeam/ChangeTeamLogoScreen';
import {drawerData} from './../Navigation/NavigationDrawer';
import Lang from '../Lib/CutomLanguage';

export default class TeamList extends Component {
    render() {

    return(
    <ChangeTeamLogoScreen title= {Lang.txt_E03} {...this.props}/>
    )}
}   