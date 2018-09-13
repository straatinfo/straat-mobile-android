import React, { PropTypes, Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation, TouchableHighlight, Dimensions, Modal } from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, Icon, List, Switch, Body} from 'native-base'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import Styles from './../Containers/Styles/LoginScreenStyles'
import { ScreenActions } from '../Redux/ScreenRedux'
import LoginActions from '../Redux/LoginRedux'
import AlertMessage from './../Components/AlertMessage'
import Lang from './../Lib/CutomLanguage'
import LinearButton from './../Components/LinearButton'
import ImageContainer from './../Components/ReportDashboard/Components/ImageContainer'
import SlidingUpPanel from 'rn-sliding-up-panel'
import CenterView from './../Components/CenterView'
export default class TestOnlyComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount () {
    const {setReportAddressByCoordinate, getReportsNearbyRequest, user } = this.props

    const coordinate = {lat: 53.2729807, long: 5.985930199999999}

    // test for getAddressBycoordinate
    setReportAddressByCoordinate(coordinate)

    // test for getReportsByNearBy
    // {user, coordinate
    // const param = { user, coordinate }
    getReportsNearbyRequest({ user, coordinate })
  }

  _createReportImagesAdd (newImage, _next = () => {}) {
    const { mergeInReport, reportState } = this.props
    mergeInReport({createReportImages: [...reportState.createReportImages, newImage]})
    _next()
  }

  _createReportImagesRemove (index, _next = () => {}) {
    const { mergeInReport, reportState } = this.props
    const images = reportState.createReportImages.filter((img, i) => { return i !== index })
    mergeInReport({createReportImages: images})
    _next()
  }

  // setState('ref':resultObj)
  render () {
    const { reportState } = this.props
    return (
      <Content><Text>location : { reportState.reportAddress } </Text>
        <CenterView><TouchableOpacity onPress={() => { this._addImage() }} ><Text>'add pic</Text></TouchableOpacity></CenterView>
        <ImageContainer source={this.props.reportState.createReportImages} addItem={this._createReportImagesAdd.bind(this)} removeItem={this._createReportImagesRemove.bind(this)} />
      </Content>
    )
  }
}
