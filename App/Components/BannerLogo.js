import React, { Component } from 'react'
import { View, Image } from 'react-native'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'
import styles from './Styles/BannerLogoStyle'
import Images from './../Themes/Images'
import { isUrl } from '../Transforms/validationHelper'

export default class BannerLogo extends Component {
  static propTypes = {
    design: PropTypes.object
  }
  static defaultProps = {
    design: { secureUrl: '' }
  }
  __renderImage (url) {
    if (isUrl(url)) {
      return (<FastImage source={{uri: url}} style={styles.logo} />)
    }
    return (<Image source={Images.logo} style={styles.logo} />)
  }

  render () {
    const { design } = this.props
    return (
      <View style={styles.upperbox}>
        <View style={styles.logoHolder}>
          {this.__renderImage(design.secureUrl)}
        </View>
      </View>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     design: state.user.design
//     // Lang: state.language.Languages
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(BannerLogo)
