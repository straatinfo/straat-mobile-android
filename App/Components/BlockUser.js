import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import styles from './Styles/BlockUserStyle'

class BlockUser extends Component {
  componentDidMount () {
    const { navigation } = this.props
    navigation.navigate('LogOut')
  }
  render () {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockUser)
