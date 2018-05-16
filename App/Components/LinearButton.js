import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import {Fonts, Colors} from './../Themes'
import styles from './Styles/LinearButtonStyle'
import LinearGradient from 'react-native-linear-gradient'

export default class LinearButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    styles: PropTypes.object
  }

  render () {
    return (
      <TouchableOpacity style={[styles.button, this.props.styles]} underlayColor='rgba(0,0,0,0.0)' onPress={this.props.onPress}>
        <LinearGradient colors={[Colors.softGreen, Colors.green]}>
          <Text style={styles.buttonText}>{this.props.text && this.props.text.toUpperCase()}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}
