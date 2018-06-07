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
    active: true,
    disabled: false,
    title: '',
    design: {},
    onPress: () => {},
    onPressDisabled: () => {}
  }
  __getColors () {
    const { design, disabled, active } = this.props
    return disabled || !active ? ['#a6b2c1', '#7f8893'] : [ design.button2, design.button ]
  }
  __getOnPress () {
    const { onPress, onPressDisabled, active } = this.props
    return !active ? onPressDisabled : onPress
  }
  render () {
    const { title, disabled, active } = this.props
    return (
      <TouchableOpacity disabled={disabled} active={active}
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
