import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
/**
 *  i will fixed this next time 
 * 
 */
class ScreenManipulator extends Component {
  static defaultPrps = {routes: {}}

  static propTypes = {
    routes: PropTypes.object,
    active: PropTypes.string

  }

  render () {
    return (
      <View style={{flex: 1}}>
        {this.props.children.map((obj, index) => {
          return this.props.active === obj.type.name ? obj : <View />
        })}
      </View>
    )
  }
}

export default ScreenManipulator
