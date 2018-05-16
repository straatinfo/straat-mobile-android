import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import {Fonts, Colors} from './../Themes'
// import styles from './Styles/LinearButtonStyle'
import LinearGradient from 'react-native-linear-gradient'

import { connect } from 'react-redux'

class MainButton extends Component {
  static propsDefault ={
    title: ''
  }
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    styles: PropTypes.object,
    design: PropTypes.object
  }

  render () {
    return (
      <TouchableOpacity style={[styles.button, this.props.styles]} underlayColor='rgba(0,0,0,0.0)' onPress={this.props.onPress}>
        <LinearGradient style = {{ borderRadius: 6} } colors={[ this.props.design.button2, this.props.design.button]}>
          <Text style={styles.buttonText}>{this.props.title.toUpperCase()}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}

const styles = {
  button: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    margin: 12,
    backgroundColor: 'transparent',
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    borderColor: '#fff'
  }
}

const mapStateToProps = state => {
  return {
    design: state.user.design
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainButton)

