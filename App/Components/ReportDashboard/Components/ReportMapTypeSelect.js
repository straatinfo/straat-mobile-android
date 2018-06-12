import React, { Component } from 'react'
import styles from './Styles/ReportMapTypeSelectStyle'
import { View, Picker, Text } from 'native-base'

export default class ReportMapTypeSelect extends Component {
  render () {
    const { language, onChange, filters, selected } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{language.map}: </Text>
        <Picker
          style={styles.picker}
          mode={'dropdown'}
          selectedValue={selected}
          onValueChange={onChange}>
          {filters.map((l, i) => { return <Picker.Item value={l.code} label={l.name} key={l.code} /> })}
        </Picker>
      </View>
    )
  }
}
