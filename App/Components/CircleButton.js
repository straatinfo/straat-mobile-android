import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'native-base'
import {Fonts, Colors} from './../Themes'
import LinearGradient from 'react-native-linear-gradient'

export default class CircleButton extends Component {
  static defaultProps = { 
    gradient: {start: '#f95b4f', end: '#f74638'} ,
    radius: 20,
    color:  Colors.snow,
    borderColor: 'transparent',
    disabled: false
  }

  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    styles: PropTypes.object,
    gradient: PropTypes.object,
    radius:  PropTypes.number,
    color:  PropTypes.any,
    disabled: PropTypes.bool
  }

  render () {
    const radiusStyle = {
      borderRadius: 20,
      flex: 0
    }
    const { borderColor, radius, text, color, onPress, disabled, styles, gradient: {start, end } } = this.props
   // const { start, end } = this.props.gradient
    return (
      <TouchableOpacity disabled={disabled} style={[Styles.button]} underlayColor='rgba(0,0,0,0.0)' onPress={onPress}>
        <LinearGradient colors={[start, end]} style={[radiusStyle, styles, {borderColor: borderColor, borderWidth: 0.5, borderRadius: radius} ]}>
          <Text style={[Styles.buttonText,{color: color}]}>{ text && text.toUpperCase()}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}

const Styles = StyleSheet.create({
    buttonText: {
      textAlign: 'center',
      margin: 10,
      backgroundColor: 'transparent',
      fontSize: Fonts.size.medium,
      fontFamily: Fonts.type.bold,
      borderColor: '#fff'
    },
    button: {
      justifyContent: 'center',
      marginVertical: 5
    }
  })
  