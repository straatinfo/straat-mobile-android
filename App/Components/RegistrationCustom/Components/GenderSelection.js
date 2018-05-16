import React from 'react'
import {
    View,
    Text
  } from 'react-native'

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import Lang from './../../../Lib/CutomLanguage'

export default (props) => {
  const { genders, selected, onSelectGender } = props
  return (
    <View style={{alignItems: 'flex-start', flex: 1, paddingBottom: 10}}>
      <Text style={{marginBottom: 10}}>{Lang.txt_D29}</Text>
      <RadioForm style={{alignItems: 'flex-start', flex: 1}}
        initial={0}
        formHorizontal={false}
        labelHorizontal
        buttonColor={'#bdcadc'}
        labelColor={'#bdcadc'}
        buttonSize={15}
        buttonWrapStyle={{marginLeft: 100}}
        buttonOuterSize={30}
        labelWrapStyle={{marginLeft: 100}}
        animation={false}
        >
        {
         genders.map((gender, i) => {
           return <RadioButton labelHorizontal key={i} >
             <RadioButtonInput
               obj={gender}
               index={i}
               isSelected={selected === gender.value}
               onPress={(value, index) => { onSelectGender(value) }}
               buttonWrapStyle={{marginLeft: 10}} />
             <RadioButtonLabel
               obj={gender}
               index={i}
               labelHorizontal
               onPress={() => {}}
               labelWrapStyle={{}} />
           </RadioButton>
         })
        }
      </RadioForm>
    </View>
  )
}
