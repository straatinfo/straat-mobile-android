import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

class CenterView extends Component {
  static propTypes = {
    style: PropTypes.object

  }

  render () {
    return (
      <View style={[{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'}, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

export default CenterView
