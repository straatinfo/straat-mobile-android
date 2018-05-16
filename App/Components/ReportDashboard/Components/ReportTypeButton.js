import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation, TouchableHighlight} from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, List, Switch, Body} from 'native-base'
import ImagePicker from 'react-native-image-picker'

import RowView from '../../RowView'
import CenterView from '../../CenterView'
import Lang from './../../../Lib/CutomLanguage'
import GeneralDesign from './../../../Lib/GeneralDesign'
import Images from './../../../Themes/Images'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spacer from '../../Spacer'

import colors from './../../../Themes/Colors'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import ReportStyle from '../ReportStyle'
import LinearGradient from 'react-native-linear-gradient'

export default class ReportTypeButton extends Component {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    onHelp: PropTypes.func,
    design: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const { design } = this.props
    return (
      <RowView>
        <TouchableOpacity style={ReportStyle.buttonHolder} underlayColor='rgba(0,0,0,0.0)' onPress={this.props.onPress}>
          <LinearGradient style={ReportStyle.roundButton} colors={[design.button2, design.button]}>
            <Text style={ReportStyle.buttonText}>{this.props.title} </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onHelp}><Icon size={25} style={{flex: 0, alignSelf: 'center'}} name='help-outline' /></TouchableOpacity>
    </RowView>)
  }
}
