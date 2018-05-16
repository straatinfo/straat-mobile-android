import React from 'react'
import {
    View,
    Text,
    Right,
    Left
  } from 'react-native'
import { Switch } from 'native-base'; 
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import Lang from './../../../Lib/CutomLanguage'
 
export default (props) => {
  const { options, selected, onSelect, title } = props
  return (
    <View style={{alignItems: 'center', flex: 1, flexDirection: 'row', paddingLeft: 10, paddingVertical: 10, justifyContent: 'space-between'}}>
      <View><Text >{title}</Text></View>
      <Switch value={selected} onValueChange={(value) => onSelect(value)} />
      {/* <View >
        <RadioForm style={{alignItems: 'center', flex: 1, flexDirection: 'row', paddingHorizontal: 2}}
        initial={0}
        formHorizontal={false}
        labelHorizontal
        buttonColor={'#bdcadc'}
        labelColor={'#bdcadc'}
        buttonSize={15}
      //  buttonWrapStyle={{paddingHorizontal: 2, marginLeft: 2}}
        buttonOuterSize={30}
       // labelWrapStyle={{ paddingHorizontal: 2, marginLeft: 2,backgroundColor: 'red'}}
        animation={false}
        >
        {
         options.map((option, i) => {
           return <RadioButton labelHorizontal key={i} >
             <RadioButtonInput
               obj={option}
               index={i}
               isSelected={selected === option.value}
               onPress={(value, index) => { onSelect(value) }}
               buttonWrapStyle={{marginLeft: 2, marginRight: 0, paddingHorizontal: 2}} />
             <RadioButtonLabel
               obj={option}
               index={i}
               labelHorizontal
               onPress={() => {}}
               labelWrapStyle={{marginLeft: 2, marginRight: 2, paddingHorizontal: 2, backgroundColor: 'red'}}
                />
           </RadioButton>
         })
        }
      </RadioForm></View> */}
    </View>
  )
}
