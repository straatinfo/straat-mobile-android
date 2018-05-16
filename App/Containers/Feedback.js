import React, { Component } from 'react';

import FeedbackScreen from './Feedback/FeedBackScreen';
import {drawerData} from '../Navigation/NavigationDrawer';

export default class Feedback extends Component {
    render() {
        const pageTitle = drawerData[this.props.navigation.state.key].drawerLabel

    return(
    <FeedbackScreen title= {pageTitle} {...this.props}/>
    )}
}