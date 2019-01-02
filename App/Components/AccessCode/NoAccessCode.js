import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { Text } from 'native-base'
import { CenterView, CircleButton, RowView, Spacer } from './../../Components'
import { connect } from 'react-redux'
import { Fonts } from './../../Themes'

class NoAccessCode extends Component {
  render () {
    const { Lang } = this.props
    const TextStyles = {
      fontSize: Fonts.size.h5,
      textAlign: 'center',
      padding: 10
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

const mapStateToProps = state => {
  return {
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoAccessCode)
