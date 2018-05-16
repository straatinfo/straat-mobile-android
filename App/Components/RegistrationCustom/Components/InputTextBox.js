import React from 'react'
import {
    Text, View, TextInput, Platform
  } from 'react-native'

export default (props) => {
  const { placeholder, onChangeText, value, onEndEditing } = props
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={{ height: (Platform.OS === 'ios') ? 30 : 40, flex: 1 }}
        onEndEditing={onEndEditing}
        placeholder={placeholder}
        underlineColorAndroid='transparent'
        onChangeText={(text) => onChangeText(text)}
        multiline={false} value={value} />
    </View>
  )
}
const verticalSpace = 10
const styles = {
  textInputContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#bdcadc',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: verticalSpace,
    marginBottom: verticalSpace

  }
}
