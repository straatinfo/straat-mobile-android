import React from 'react'
import { View } from 'react-native'

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'

export default (props) => {
  const { regOptions, selected, onSelectRegOption, disable } = props
  return (
    <View style={{alignItems: 'flex-start', flex: 1, paddingBottom: 10}}>
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
        regOptions.map((regOption, i) => {
          const disableRadio = disable === i ? {disabled: true, buttonOuterColor: 'gray'} : null
          return <RadioButton labelHorizontal key={i} >
            <RadioButtonInput
              {...disableRadio}
              obj={regOption}
              index={i}
              isSelected={selected === regOption.value}
              onPress={(value, index) => { onSelectRegOption(value) }}
              buttonWrapStyle={{marginLeft: 10}} />
            <RadioButtonLabel
              {...disableRadio}
              obj={regOption}
              index={i}
              labelHorizontal
              onPress={(value, index) => { onSelectRegOption(value) }}
              labelWrapStyle={{}} />
          </RadioButton>
        })
        }
      </RadioForm>
    </View>
  )
}
