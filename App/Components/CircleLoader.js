import React from 'react'
import {
    Header,
    Title,
    Button,
    Right,
    Body,
    Icon,
    Spinner
  } from 'native-base'
  
import { View } from 'react-native'
export default (props) => {
  const { color } = props
  return (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      <Spinner color={color} />
    </View>
    )
}
