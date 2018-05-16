import React, { Component } from 'react'
import { Text, BackHandler } from 'react-native'

import Lang from './../../Lib/CutomLanguage'
import { Fonts } from './../../Themes'
// import style from './style'
import CenterView from './../../Components/CenterView'
import RowView from './../../Components/RowView'
import CircleButton from './../../Components/CircleButton'
import Spacer from './../../Components/Spacer'

class NoAccessCode extends Component {
  render () {
    const TextStyles = {
      fontSize: Fonts.size.h5,
      textAlign: 'center'
    }

    return (
      <CenterView>
        <Text style={TextStyles}>{Lang.txt_B04}</Text>
        <Spacer />
        <Spacer />
        <RowView flexNumber={0}>
          <CircleButton styles={{ width: 100 }} text={Lang.txt_Z02} gradient={{start: '#56b574', end: '#3a9958'}} onPress={() => this.props.parentSetState({screen: 'RegisterAccessCode'})} />
          <Spacer />
          <CircleButton styles={{ width: 100 }} text={Lang.txt_Z03} gradient={{start: '#f95b4f', end: '#f74638'}} onPress={() => BackHandler.exitApp()} />
        </RowView>
        <Spacer />
        <Spacer />
      </CenterView>
    )
  }
}

export default NoAccessCode
