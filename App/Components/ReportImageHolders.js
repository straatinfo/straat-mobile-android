import React, { Component } from 'react'
import {
  View
} from 'react-native'

import PropTypes from 'prop-types'
import ImageLoad from 'react-native-image-placeholder'
import { WidthSizes } from '../Lib/Common/Constants'
import { cropWH } from '../Transforms/Cloudinary';

/**
 *  @attribute arrays of images (_id, url)
 *
 */
export default class ReportImageHolders extends Component {
  static propsDefault = {
    listImages: []
  }
  static propTypes = {
    listImages: PropTypes.array
  }
  render () {
    const { listImages } = this.props
    
    return (
      <View>
        { listImages.map((urls, index) => {
          return <ImageLoad
            key={urls._id}
            style={[ WidthSizes.w90, {height: 250} ]}
            loadingStyle={{ size: 'large', color: 'blue' }}
            source={{ uri: cropWH(WidthSizes.w90.width, 250, urls.secure_url) }}
              />
        })}
      </View>
    )
  }
}
