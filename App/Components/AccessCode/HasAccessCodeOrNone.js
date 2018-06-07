import React, { Component } from 'react'
import { Text } from 'native-base'
import { CenterView, CircleButton, RowView, Spacer } from './../../Components'
import { connect } from 'react-redux'
import { Fonts } from './../../Themes'

class HasAccessCodeOrNone extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const { Lang } = this.props
    const TextStyles = {
      fontSize: Fonts.size.h5,
      textAlign: 'center'
    }
    return (
      <CenterView>
        <Text style={TextStyles}>{Lang.txt_B01}</Text>
        <Spacer />
        <Text style={TextStyles}>{Lang.txt_B02}</Text>
        <Spacer />
        <RowView flexNumber={0}>{/** if user has access code and press this then open input for access code else open screen for accesscode registration */}
          <CircleButton styles={{ width: 100 }} text={Lang.txt_Z02} gradient={{start: '#56b574', end: '#3a9958'}} onPress={() => this.props.parentSetState({screen: 'HasAccessCode'})} />
          <Spacer />
          <CircleButton styles={{ width: 100 }} text={Lang.txt_Z03} gradient={{start: '#f95b4f', end: '#f74638'}} onPress={() => this.props.parentSetState({screen: 'NoAccessCode'})} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HasAccessCodeOrNone)
