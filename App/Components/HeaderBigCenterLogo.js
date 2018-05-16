import React, { PropTypes } from 'react'
import { Image } from 'react-native'
import Styles from './Styles/HeaderBigCenterLogoStyle'
import { Images } from './../Themes'

export default (props) => {
  return <Image source={Images.logo} style={[Styles.topLogo]} />
}
