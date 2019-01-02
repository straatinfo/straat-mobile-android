/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Platform,
  ScrollView
} from 'react-native'

import { FcmService } from '../../Services'

// registerKilledListener()

class MainPage extends Component {
  async componentDidMount () {
    // FcmService.configure()
    // FcmService.start()
    FcmService.logout()
  }
  render () {
    return (<View><Text>test</Text></View>)
  }
}
export default MainPage