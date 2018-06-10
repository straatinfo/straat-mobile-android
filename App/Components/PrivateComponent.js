import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/PrivateComponentStyle'
import { FcmService } from '../Services'

class PrivateComponent extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  componentDidMount () {
    const { user } = this.props
    FcmService.configure(user)
    FcmService.start(user)
    //  FcmService.logout()
    __DEV__ && console.log('fcm starting: ', user)
  }

  render () {
    return null
  }
}

const mapStateToProps = state => {
  return {
    design: state.user.design,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateComponent)
