import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'

import FastImage from 'react-native-fast-image';
import Images from './../Themes/Images'
import language from '../Lib/CutomLanguage';
const styles = {
  holder: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    left: 0,
    width: '100%',
    justifyContent: 'center'
  },
  footer: {
    fontSize: 18,
    color: '#6e85a1'
  },
  footerPin: {
    width: 30,
    height: 35,
    resizeMode: 'contain'
  }
}
class Footer extends Component {
  static propsDefaults = {
    
    style: {},
    show: false
  }

  static propTypes = {
    style: PropTypes.object,
    show: PropTypes.bool,
    design: PropTypes.object
  }

  render () {
    if (this.props.design.isSpecific === false) {
      return <View />
    }
    return (
      <View style={[styles.holder, this.props.style]}>
        <Text style={styles.footer}>{language.poweredBy} </Text>
        <Image style={styles.footerPin} source={Images.markerIcon} />
        <Text style={[styles.footer, {fontWeight: 'bold'}]}>straat.info</Text>
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
