import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

class RowView extends Component {
  static defaultProps = { flexNumber: 1, alignItems: 'center' }
  static propTypes = {
    style: PropTypes.object,
    left: PropTypes.bool,
    flexNumber: PropTypes.number
  }

  render () {
    const { flexNumber } = this.props
    let alignItems = 'center'

    if (this.props.left) {
      alignItems = 'flex-start'
    }

    return (
      <View style={[{
        flex: flexNumber,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: alignItems}, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

export default RowView
