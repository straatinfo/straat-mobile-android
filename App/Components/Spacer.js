import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

export default class Spacer extends Component {
  static propTypes = {
    count: PropTypes.number
  }
  static defaultProps = {
    count: 1
  }
  render () {
    const { count } = this.props

    return (
      <View>
        {[...Array(count)].map((x, i) =>
          <Text key={i} > </Text>
        )}
      </View>
    )
  }
}
