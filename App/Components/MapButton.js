import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/MapButtonStyle'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon } from 'react-native-elements'

export default class MapButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    icon: PropTypes.string
  }

  render () {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Icon icon={styles.icon} name={this.props.icon} size={18} />
      </TouchableOpacity>
    )
  }
}
