import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation } from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, Icon, Center} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Lang from './../../Lib/CutomLanguage'
import {Fonts, Colors} from './../../Themes'
import style from './style'
import CenterView from './../../Components/CenterView'
import RowView from './../../Components/RowView'
import CircleButton from './../../Components/CircleButton'
import Spacer from './../../Components/Spacer'

class HasAccessCodeOrNone extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const TextStyles = {
      fontSize: Fonts.size.h5,
      textAlign: 'center'
    }
    console.log(this.props)
    return (
      <CenterView>
        <Text style={TextStyles}>{Lang.txt_B01}</Text>
        <Spacer />
        <Text style={TextStyles}>{Lang.txt_B02}</Text>
        <Spacer />
        <RowView flexNumber={0}>{/** if user has access code and press this then open input for access code else open screen for accesscode registration*/}
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

export default HasAccessCodeOrNone
/**
 *
 *     return (
      <View style={style.container}>
        <View style={{ backgroundColor: 'red', flex:1 }}>
        <Text style={{ textAlign: 'center' }}>jalord></Text></View>
      </View>
 */
