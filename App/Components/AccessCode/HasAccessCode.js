import React, { Component } from 'react'
import { Text, Item, Input, View } from 'native-base'
import { CenterView, CircleButton, RowView, Spacer } from './../../Components'
import { connect } from 'react-redux'
import { Fonts } from './../../Themes'

class HasAccessCode extends Component {
  render () {
    const { Lang } = this.props
    const TextStyles = {
      fontSize: Fonts.size.h5,
      textAlign: 'center'
    }

    return (
      <CenterView>
        <View stlye={{flex: 0}}>
          <Text style={TextStyles}>{Lang.txt_B03}</Text>
          <Spacer />
          <Item regular>
            <Input placeholder='' onChangeText={(value) => this.props.parentSetState({accessCode: value})} />
          </Item>
          <Spacer />
          <RowView flexNumber={0}>
            <CircleButton styles={{ width: 100 }} text={Lang.txt_Z04} gradient={{start: '#f95b4f', end: '#f74638'}} onPress={() => this.props.parentSetState({screen: 'HasAccessCodeOrNone'})} />
            <Spacer />
            <CircleButton styles={{ width: 100 }} text={Lang.txt_A01} gradient={{start: '#339fd6', end: '#2088bc'}} onPress={() => this.props.onProcess()} />
          </RowView>
          <Spacer />
          <Spacer />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HasAccessCode)
