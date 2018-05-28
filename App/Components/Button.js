import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from './Styles/ButtonStyle'

export default class Button extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    design: PropTypes.object,
    onPressDisabled: PropTypes.func,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  }
  static defaultProps = {
    disabled: false,
    title: '',
    design: {},
    onPress: () => {},
    onPressDisabled: () => {}
  }
  __getColors () {
    const { design, disabled } = this.props
    return disabled ? ['#a6b2c1', '#7f8893'] : [ design.button2, design.button ]
  }
  __getOnPress () {
    const { onPress, onPressDisabled, disabled } = this.props
    return disabled ? onPressDisabled : onPress
  }
  render () {
    const { title, disabled } = this.props
    return (
      <TouchableOpacity disabled={disabled}
        style={styles.buttonContainer}
        underlayColor='rgba(0,0,0,0.0)'
        onPress={this.__getOnPress()}
      >
        <LinearGradient colors={this.__getColors()} style={styles.linearGradient}>
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}
