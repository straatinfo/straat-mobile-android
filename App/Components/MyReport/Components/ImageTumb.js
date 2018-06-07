import React from 'react'
import { View } from 'native-base'
import FastImage from 'react-native-fast-image'
import styles from './../../Styles/MyReportComponentStyles'

export default (props) => {
  return (
    <View>
      <FastImage
        source={{uri: props.url, priority: FastImage.priority.normal}}
        style={styles.image} />
    </View>
  )
}
