import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native' 
import  { Fonts, Colors } from '../Themes';
import { Icon } from 'native-base'
const styles = {
  button: {
  },
  buttonText: {
    marginVertical: 0,
    marginHorizontal: 7,
    textAlign: 'center',
    color: 'gray',
    fontSize: 20
  }
}

export default class ButtonIcon extends Component {
  static propTypes = {
    iconName: PropTypes.string,
    onPress: PropTypes.func,
    styles: PropTypes.object
  }
  render () {
    return (
      <TouchableOpacity style={[styles.button, this.props.styles]} onPress={this.props.onPress}>
        <Icon style={styles.buttonText} name={this.props.iconName} />
      </TouchableOpacity>
    )
  }
}
