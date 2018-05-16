import React, { Component } from 'react';


import ChangeTeamProfileScreen from './MyTeam/ChangeTeamProfileScreen';
import Lang from '../Lib/CutomLanguage';

export default class TeamList extends Component {
    render() {

    return(
    <ChangeTeamProfileScreen title= {Lang.txt_E03} {...this.props}/>
    )}
}