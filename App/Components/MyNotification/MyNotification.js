import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  NetInfo,
  TouchableHighlight,
  Dimensions,
  ScrollView
} from 'react-native'
import FastImage from 'react-native-fast-image'
import BusyIndicator from 'react-native-busy-indicator'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import SlidingUpPanel from 'rn-sliding-up-panel'
import Icon from 'react-native-vector-icons/MaterialIcons'
import renderIf from 'render-if'

import Api from './../../Lib/Common/Api'
import ApiUtil from './../../Lib/Common/ApiUtil'
import AlertBox from './../../Components/AlertBox'

import Lang from './../../Lib/CutomLanguage'
import { GetDate, GetTime } from './../../Lib/Helper/TimeUtils'

import ViewReportFromMap from './../../Components/ReportDashboard/view_report_from_map'
import styles from './style'

const { width, height } = Dimensions.get('window')
const tobarHeight = 100

class MyNotification extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reportData: [],
      slideMenuHeight: height * 0.5,
      total: 0,
      currentPage: 0,
      pages: 5,
      limit: 10,
      pageNoMore: false,

      /**
       *
       *  this define if view report from map is active or not
       *
       */
      vrfm: false,
      vrfmData: {}

    }

    this.calloutOnClick = function (item) {
      this.setState({ vrfm: true, vrfmData: item })
            // show report pannel report view
      this._panel_reportView.transitionTo(this.state.slideMenuHeight + 150 + 65)
    }

    // defualt amerkers
    this.calloutOnClose = function () {
      this.setState({ vrfm: false })
      // close report pannel report view
      this._panel_reportView.transitionTo(0)
      // show button
      this.setState({ txt_e10Height: {} })
    }
  }

  componentDidMount () {
    console.log(this.props.user)
    this.getUserReports()
  }

  getUserReports () {
    const offset = this.state.currentPage + 1
    loaderHandler.showLoader('Loading')

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        Api.getReports(this.props.user._id, '', '', '', '', '', offset, this.props.user.access_token, '', '', '')
          .then(getReportsResult => {
            console.log( getReportsResult )
            loaderHandler.hideLoader()
            if (getReportsResult.status === 1) {
              console.log(getReportsResult)
              if (getReportsResult.result.docs.length > 0) {
                this.setState({
                  reportData: [...this.state.reportData, ...getReportsResult.result.docs],
                  limit: getReportsResult.result.limit,
                  total: getReportsResult.result.total,
                  pages: getReportsResult.result.pages,
                  currentPage: parseInt(getReportsResult.result.page)})
              } else {
                  // if no more reports fetched
                this.setState({pageNoMore: true})
              }
            } else {
              AlertBox.alert('Error', ApiUtil.serverResponseResult(getReportsResult.result), [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                { cancelable: false })
            }
          }).catch(getReportsError => {
            console.log('errror')
            console.log(getReportsError)
            loaderHandler.hideLoader()
            AlertBox.alert('Error', 'Server Error', [{text: 'OK', onPress: () => console.log('OK Pressed')}],
             { cancelable: false })
          })
      } else {
        loaderHandler.hideLoader()
        AlertBox.alert('Error', 'No Internet Connection. Please try again.', [{text: 'OK', onPress: () => console.log('OK Pressed')}],
       { cancelable: false })
      }
    })
  }

  _onClickMorePages () {
    this.getUserReports()
  }
  changeStatus (reportID) {
    Api.changeStatus({ status: 1, report_id: reportID }, this.props.user.access_token)
    .then(result => {
      // check if success
      if (result.status === 1) {
        AlertBox.alert(Lang.txt_J22,
            Lang.txt_J21, [{text: 'OK', onPress: () => console.log('OK Pressed 1')}],
            { cancelable: false })
      } else {
        // catch error
        AlertBox.alert(Lang.txt_J23,
            Lang.txt_J24, [{text: 'OK', onPress: () => console.log('OK Pressed 1')}],
            { cancelable: false })
      }
    })
  }

  confirmChangeStatus (reportID) {
    AlertBox.alert(' ',
      Lang.txt_J18, [ {text: Lang.txt_J19, onPress: () => this.changeStatus(reportID)}, {text: Lang.txt_J20, onPress: () => console.log(reportID)} ],
      { cancelable: false }
    )
  }

  render () {
    const calloutOnPress = this.calloutOnClick.bind(this)
    const confirmChangeStatus = this.confirmChangeStatus.bind(this)

    const slideUpMenu = {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      height: 200,
      position: 'absolute'
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{ height: height - tobarHeight }}>
          <FlatList
            data={this.state.reportData}
            renderItem={({item}) =>
              <View style={{flex: 1, flexDirection: 'column', marginTop: 20, marginLeft: 20, marginRight: 20, backgroundColor: 'transparent'}}>
                <View style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
                  <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'column', alignItems: 'stretch', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                    <Text style={styles.s_r_title}>{item.report_title}</Text>
                    <Text style={styles.s_r_date}>{ GetDate(item.created_at) } / { GetTime(item.created_at) } </Text>
                    <Text style={styles.s_r_location}>{item.report_location}</Text>
                    <TouchableHighlight underlayColor='rgba(0,0,0,0.0)' onPress={() => calloutOnPress(item)} ><Text style={styles.s_r_b_view}>view notification</Text></TouchableHighlight>
                  </View>
                  <View style={[{backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', margin: 10}]}>
                    <FastImage
                      source={{uri: (item.report_image_urls.length > 0) ? item.report_image_urls[0].url : 'https://res.cloudinary.com/htotyy4ug/image/upload/v1513680600/d7ckfzkyrk9fhcyyhqaj.png',
                        priority: FastImage.priority.normal}}
                      style={styles.reportImg} />
                  </View>
                </View>
              </View>}
            keyExtractor={(item, index) => index} />
          <TouchableHighlight style={{flex: 1, alignItems: 'center', paddingTop: 20, paddingBottom: 20}} underlayColor='rgba(0,0,0,0.0)' onPress={this._onClickMorePages.bind(this)} >
            <View>
              {renderIf(!this.state.pageNoMore)(<Icon name='more-horiz' size={35} color='#fff' />)}
              {renderIf(this.state.pageNoMore)(<Text>No More</Text>)}
            </View>
          </TouchableHighlight>

        </ScrollView>
        <SlidingUpPanel
          ref={c => { this._panel_reportView = c }}
          allowDragging={false}
          showBackdrop={false}
          visible
          onRequestClose={() => this.setState({slidingPanelMode: false, slideMenuUp: true})}>

          {renderIf(this.state.vrfm === true)(
            <View style={[slideUpMenu, {height: this.state.slideMenuHeight + 150, width: width}]}>
              <ViewReportFromMap
                data={this.state.vrfmData}
                onCancel={this.calloutOnClose.bind(this)}
                onChangeStatus={confirmChangeStatus} />
            </View>)
           }
        </SlidingUpPanel>
      </View>
    )
  }
}

export default MyNotification
