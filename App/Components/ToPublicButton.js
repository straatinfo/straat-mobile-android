import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native'
import { Text, View } from 'native-base'
import styles from './Styles/ToPublicButtonStyle'

export default class ToPublicButton extends Component {
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

  render () {
    const { isPublic, Lang, onPress } = this.props
    return (
      <View style={[ styles.w50, styles.statusValue]} >
        <Text style={[ styles.f16 ]}>{isPublic ? Lang.public : Lang.private}</Text>
        {isPublic === false && <TouchableOpacity style={styles.changeStatusCon} underlayColor='rgba(0,0,0,0.0)' onPress={() => onPress()}>
          <Text style={[styles.changeStatusbtnTxt]} >{Lang.change}</Text>
        </TouchableOpacity>}
      </View>
    )
  }
}
 