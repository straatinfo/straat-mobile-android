import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Spinner } from 'native-base'

class CircleLoader extends Component {
  static propTypes = {
    color: PropTypes.string
  }
  static defaultProps = {
    color: 'blue'
  }
  render () {
    const { color } = this.props
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <Spinner color={color} />
      </View>
    )
  }
}

export default CircleLoader
