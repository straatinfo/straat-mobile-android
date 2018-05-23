import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Alert,
  NetInfo,
  Platform,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  PermissionsAndroid,
  WebView
} from 'react-native'
import {
  Header,
  Title,
  Button,
  Right,
  Body,
  Icon
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import SlidingUpPanel from 'rn-sliding-up-panel'
import BusyIndicator from 'react-native-busy-indicator'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import renderIf from 'render-if'
import Modal from 'react-native-modal'
import MapView from 'react-native-maps'

import { ReportTypes, ReportStatus } from './../../Services/Constant'
import Api from './../../Lib/Common/Api'
import ApiUtil from './../../Lib/Common/ApiUtil'
import AlertBox from './../../Components/AlertBox'
import Images from './../../Themes/Images'
import { getStyleStatusInPin } from './../../Transforms/ReportHelper'

import MapButton from './../../Components/MapButton'
import ReportStepThree from './../../Components/ReportDashboard/stepthree/report_stepthree'
import ViewReportFromMap from './../../Components/ReportDashboard/view_report_from_map/'
import ReportStepOne from './../../Components/ReportDashboard/stepone/report_stepone'
import ReportStepTwo from './../../Components/ReportDashboard/steptwo/report_steptwo'
import ReportStyle from './../../Components/ReportDashboard/ReportStyle.js'
import styles from './style'
import { reportCoordinate, getReportsNearbyRequest } from '../../Redux/ReportsRedux'
import { cropWH } from '../../Transforms/Cloudinary'
import DebugConfig from './../../Config/DebugConfig'

/**
 * i think i will not shift this module to redux saga, as of now i dont have time for that @ArC
 *
 *
 *
 */

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const thankYouMessage = 'Thank you for your report! From now on everybody can see in the app. Ifthe report is about public space, it is also mailed to the host.'

const ZERO = 0

class ReportMapContainer extends Component {
  constructor (props) {
    super(props)

    // default
    this.defaultLat = 53.2729807
    this.defaultLong = 5.985930199999999
    this.accuracy = 100

    this.currentCoordinate = { latitude: this.defaultLat,
      longitude: this.defaultLong,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      accuracy: this.accuracy
    }

    this.state = {
      user: {},
      slideMenuUp: true,
      slideMenuHeight: height * 0.5,
      slidingPanelPage: 'report-location',
      drawerLockMode: true,
      offset: 1,
      reportsList: [],
      photoPermission: '',
      status: {},
      watchID: null,
      categories: [],
      report_title: 'Report',
      report_text: '',
      report_urgent: 0,
      img1: null,
      img2: null,
      img3: null,
      report_main_category: {},
      report_sub_category: {},
      has_mainCategory: false,
      has_subCategory: false,
      report_type: 0,
      report_location: '',
      report_long: this.defaultLong,
      report_lat: this.defaultLat,
      report_note: '',
      report_host_id: '5a15c7c3c189fb0014c09210',
      is_vechicle_involved: 0,
      vechile_involved_description: '',
      is_person_involved: 0,
      person_involved_num: 0,

      mapReset: 1,
      currentLat: this.defaultLat,
      currentLong: this.defaultLong,
      currentCoordinate: this.currentCoordinate,
      radius: 250,
      markers: [],
      reportPosition: this.currentCoordinate,
      testHostId: '5a7b561e3b47226e7dac5deb',

      mapState: reportCoordinate,
      /**
      *  this define if view report from map is active or not
      */
      vrfm: false,
      vrfmData: {},

      txt_e10Height: {}

    }
    this.watchID = null
    this.openSlideUpMenu = this.openSlideUpMenu.bind(this)
    this.hideCreateReport = this.hideCreateReport.bind(this)
    this.showCreateReport = this.showCreateReport.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getUserAddress = this.getUserAddress.bind(this)

        // defualt amerkers
    this.calloutOnClose = function () {
      this.setState({ vrfm: false })
            // close report pannel report view
      // this._panel_reportView.transitionTo(ZERO)
            // show button
      this.setState({ txt_e10Height: {} })
    }
    this.reportMap = {}
    this.reportMapRegion = {}
    console.log('this.props.reportState', this.props.reportState)

    this.slideUpMenuHeight = height * 0.5
  }

  calloutOnClick = function (marker) {
    const { reportMergeState } = this.props
    this.setState({ vrfm: true, vrfmData: marker })
          // show report pannel report view
    // this._panel_reportView.transitionTo(this.state.slideMenuHeight + 150 + 65)
          // cnr button, hide report green button
    this.setState({ txt_e10Height: {height: 0} })
    reportMergeState({reportDetails: marker})
  }

  resetMap () {
        // this.setState({mapReset:0})
        // setTimeout(()=>{this.setState({mapReset: 1 })}, 500)
  }

  componentDidMount () {
    const { mapState } = this.state
    const { reportMergeState } = this.props
    const { reportCoordinate, userPosition } = this.props.reportState

    this.setState({ mapState: reportCoordinate })
    try {
      /** is separate user position and report position couse pin in map can be move */
      this.watchID = navigator.geolocation.watchPosition((position) => {
       // this.setState({ mapState: {...mapState, ...position.coords} })
        const { latitude, longitude } = position.coords
        this.mapViewToRegion({ latitude, longitude }, 100)
        console.log('position.coords', position.coords)
        reportMergeState({reportCoordinate: {...reportCoordinate, ...position.coords}, userPosition: {...userPosition, ...position.coords}})
        // this.setAddress(position.coords)
        console.log('didmount coordinate: ', position)
      })
    } catch (e) {
      console.log(e.message)
    }
    console.log(this.watchID)
    // set user address from start of this screen
    // this.setAddress(reportCoordinate)
    // this.getUserAddress ()
    // set host id base on current GPS position
    this.setHostIdByCoordinate()

    // get reports ang plot to map
    this.getNearbyReport()
  }

  componentWillUnMount () {
    navigator.geolocation.clearWatch(this.watchID)
  }

  // ang gulo tlga pag hindi naka redux saga nak ng teteng
  setHostIdByCoordinate () {
    const _host = this.state.testHostId
    this.setState({ report_host_id: _host })
  }

  getNearbyReport () {
    const { getReportsNearbyRequest, reportState: {reportCoordinate}, user} = this.props
    //
    // call
    // call fetchNearbyReports
    // coordinate, user
    getReportsNearbyRequest({ coordinate: reportCoordinate, user})
  }

  getCategories (_reportType, _host) {
    /**
     *
     * @param ReportTypes: _reportType, ID: _host
     *  shift to formA  @date feb16
     */

    // const { getCategories } = this.props
    // getCategories({_reportType, _host})

  }

  getUserAddress () {
    const { setReportAddressByCoordinate } = this.props
    const { currentCoordinate } = this.state

    setReportAddressByCoordinate(currentCoordinate)
  }
  submitReport () {
  }

  onReportTypeSelect (value) {
    this.setState({ slidingPanelPage: 'report-info'})
    // this.setState({ slidingPanelPage: 'report-info'}, () => this._panel.transitionTo(this.state.slideMenuHeight + 150 + 65))

    // this.setState({slidingPanelPage: 'report-info'})
    // this.showCreateReport()
  }

  onMainCatUpdate (category) {
    this.setState({report_main_category: category, has_mainCategory: true})
  }

  onSubCatUpdate (subcategory) {
    this.setState({report_sub_category: subcategory, has_subCategory: true})
  }

  openSlideUpMenu () {
    this.setState({slideMenuUp: false})
    // this.setState({slideMenuUp: false}, () => this._panel.transitionTo(this.state.slideMenuHeight + 65))

            // jay lord test
            // this.setState({slidingPanelPage : 'report-view-from-map'});
  }

  hideCreateReport () {
    const { reportMergeState } = this.props
    this.setState({slidingPanelPage: 'report-location', slideMenuUp: true})
    reportMergeState({isReportFormActive: false})
    // this._panel.transitionTo(0)
   //  this._panel._requestClose()
    this.setState({
      slidingPanelPage: null,
      report_title: 'Report',
      report_text: '',
      report_urgent: false,
      img1: null,
      img2: null,
      img3: null,
      report_main_category: {},
      report_sub_category: {},
      has_mainCategory: false,
      has_subCategory: false,
      report_type: 0,
            //    report_long: this.defaultLong,
             //   report_lat: this.defaultLat,
      report_note: '',
      report_host_id: '5a15c7c3c189fb0014c09210',
      is_vechicle_involved: 0,
      vechile_involved_description: '',
      is_person_involved: 0,
      person_involved_num: 0
    })
  }

  showCreateReport () {
    if (this.state.slidingPanelPage === 'report-location') {
      this.setState({slidingPanelPage: 'report-type'})
    } else if (this.state.slidingPanelPage === 'report-type') {
      this.setState({slidingPanelPage: 'report-info'})
    //  this._panel.transitionTo(this.state.slideMenuHeight + 150 + 65)
    } else if (this.state.slidingPanelPage === 'report-info') {

    }
  }
  moveReportCircle (position) {
    const { mapState } = this.state
    const { reportMergeState, reportState: {reportCoordinate} } = this.props
    const newPosition = {...reportCoordinate, ...position}

    this.mapViewToRegion({...mapState, latitude: position.latitude, longitude: position.longitude}, 300)
    // reset address
    this.setAddress(newPosition)
    reportMergeState({reportCoordinate: newPosition})
  }

  setAddress (reportPosition) {
    const { setReportAddressByCoordinate } = this.props
    console.log('setAddress', reportPosition)
    setReportAddressByCoordinate(reportPosition)
  }

  changeStatus (reportID) {
    const { Lang } = this.props
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
    const { Lang } = this.props
    AlertBox.alert(' ',
      Lang.txt_J18, [ {text: Lang.txt_J19, onPress: () => this.changeStatus(reportID)}, {text: Lang.txt_J20, onPress: () => console.log(reportID)} ],
      { cancelable: false }
    )
  }
  updateScreenLocation (region) {
    this.reportMapRegion = region
  }
  mapViewToRegion (region, duration = 1000) {
    const { mapState } = this.state
    const newState = { ...mapState, ...region }
    try {
      this.reportMap.animateToRegion(newState, duration)
      // this.setState({mapState: newState}, () => console.log(newState))
    } catch (e) {
      console.log(e)
    }
  }
  _zoomIn () {
    const { mapState } = this.state
    const {reportMergeState, reportState: {userPosition, reportCoordinate}} = this.props
    const zoomLevel = [0.00021122395992279053, 0.0002894657288248226]

    // console.log(this.reportMap)

    try {
      const latitudeDelta = mapState.latitudeDelta - zoomLevel[1]
      const longitudeDelta = mapState.longitudeDelta - zoomLevel[0]
      if (latitudeDelta <= 0 || longitudeDelta <= 0) {
        return null
      }
      this.mapViewToRegion({latitudeDelta, longitudeDelta}, 200)
      // reportMergeState({
      //   reportCoordinate: {
      //  //   ...this.reportMapRegion,
      //     ...reportCoordinate,
      //     ...{
      //       longitudeDelta: newLongitudeDelta,
      //       latitudeDelta: newLatitudeDelta}
      //   }})
    } catch (e) {
      console.log('zoom')
    }
  }
  _zoomOut () {
    const { mapState } = this.state
    console.log('this.reportMap', this.reportMap)
   // const { region } = this.reportMap.props
    const {reportMergeState, reportState: {userPosition, reportCoordinate}} = this.props

    const zoomLevel = [0.00021122395992279053, 0.0002894657288248226]
    try {
      this.mapViewToRegion({latitudeDelta: mapState.longitudeDelta + zoomLevel[0], longitudeDelta: mapState.longitudeDelta + zoomLevel[1]}, 200)
      // reportMergeState({
      //   reportCoordinate: {
      //   //  ...this.reportMapRegion,
      //     ...reportCoordinate,
      //     ...{
      //       longitudeDelta: this.reportMapRegion.longitudeDelta + zoomLevel[0],
      //       latitudeDelta: this.reportMapRegion.latitudeDelta + zoomLevel[1]}
      //   }})
    } catch (e) {
      console.log('zoom')
    }
  }

  _findUserLocation () {
    const { mapState } = this.state
    const {reportMergeState, reportState} = this.props

    this.mapViewToRegion({...mapState, latitude: reportState.userPosition.latitude, longitude: reportState.userPosition.longitude}, 400)
    // reportMergeState({userPosition: {...reportState.userPosition}})
  }
  reportFormShow () {
    const {reportMergeState, reportState: {isReportFormActive, reportCoordinate, userPosition }} = this.props
    this.mapViewToRegion({latitude: reportCoordinate.latitude, longitude: reportCoordinate.longitude }, 300)
    // set user address from start of this screen
    this.setAddress(reportCoordinate)

    this.setState({slideMenuUp: false, slidingPanelPage: 'report-location'},
    () => {
    //  this._panel.transitionTo(this.state.slideMenuHeight + 65)
      reportMergeState({isReportFormActive: true})
    })
  }
  getHeight () {
    const { slidingPanelPage } = this.state

    if (slidingPanelPage === 'report-location') {
      return {sldeUp: height * 0.35, hmap: height * 0.70}
    }
    if (slidingPanelPage === 'report-type') {
      return {sldeUp: height * 0.35, hmap: height * 0.70}
    }
    if (slidingPanelPage === 'report-info') {
      // repor form
      return {sldeUp: height * 0.70, hmap: height}
    }

    return {sldeUp: 0, hmap: height}
  }

  /**
   *
   * @description get ping image for marker in mapView
   * @default NEW
   * @param {*} status
   *
   */
  pinImage (status = 'NEW') {
    // pangit ang switch maxadong matagal
    if (status === ReportStatus.inProgress) {
      return Images.pinInProgress
    }
    if (status === ReportStatus.done) {
      return Images.pingDone
    }
    if (status === ReportStatus.expired) {
      return Images.pingExpired
    }
    return Images.pinNew
  }
  render () {
    const { reportMergeState, reportState, user, navigation, design, Lang } = this.props
    // console.log('reportState ', reportState)
    const { currentCoordinate, reportPosition, mapState } = this.state
    const calloutOnPress = this.calloutOnClick.bind(this)
    const confirmChangeStatus = this.confirmChangeStatus.bind(this)
    const pinImage = this.pinImage
    const heights = this.getHeight()
    if (!DebugConfig.displayGoogleMap) {
      return null
    }
    return (
      <View style={styles.container}>
        {renderIf(this.state.mapReset === 1)(
          <MapView
            ref={c => { this.reportMap = c }}
            style={[styles.map, { height: heights.hmap }]}
            showsUserLocation={false}
            followUserLocation={false}
            showsMyLocationButton={false}
            showsCompass={false}
            followsUserLocation={false}
            loadingEnabled={false}
            toolbarEnabled={false}
            // zoomEnabled={false}
            rotateEnabled
            onRegionChangeComplete={(region) => { this.setState({mapState: region}) }}
            // onRegionChange={(region) => { this.updateScreenLocation(region) }}
            initialRegion={mapState}
            // region={mapState}
            >
            {/* initialRegion={reportState.userPosition} */}

            {reportState.isReportFormActive && <MapView.Marker
              coordinate={reportState.reportCoordinate}
              title={''}
              draggable
              zIndex={-1}
              image={Images.pinIcon}
              key='t5a15c7c3c189fb0014c09210'
              onDragEnd={(e) => {
                const position = e.nativeEvent.coordinate
                this.moveReportCircle(position)
              }} >
              <MapView.Callout style={{flexDirection: 'row', flex: 1}}>
                <View style={[styles.m_t_container, { width: width - 110 }]} >
                  <Text >{reportState.reportAddress}</Text>

                  {/** <Text style={styles.m_r_category} >Report Position</Text>
                  <Text >Latitude  : {reportPosition.latitude}</Text>
                  <Text >Longitude : {reportPosition.longitude}</Text>
                  <Text >Radius : { this.state.radius }</Text> */}
                </View>
              </MapView.Callout>
            </MapView.Marker >}
            <MapView.Circle
              center={reportState.userPosition}
              radius={300}
              strokeColor={'transparent'}
              fillColor={'rgba(112,185,213,0.30)'}
                    />
            <MapView.Circle
              center={reportState.userPosition}
              radius={5}
              strokeColor={'transparent'}
              fillColor={'rgba(112,185,213,0.60)'} />

            { reportState.reportMapMarkerList.length > 0 && reportState.reportMapMarkerList.map(function (marker, index) {
              return <MapView.Marker
                coordinate={{ longitude: marker.reportCoordinate.coordinates[0], latitude: marker.reportCoordinate.coordinates[1] }}
                // title={''}
                image={pinImage(marker.status)}
                zIndex={index + 5}
                key={marker._id} >
                <MapView.Callout style={{flexDirection: 'row', flex: 1}} onPress={() => calloutOnPress(marker)}>
                  <View style={styles.m_t_container} >
                    {marker.hasOwnProperty('_mainCategory') === true && marker._mainCategory !== null && marker._mainCategory.hasOwnProperty('name') === true && <Text style={styles.m_r_category} >{ marker._mainCategory.name }</Text>}
                    <Text style={styles.m_r_date} >{ ApiUtil.format_date(marker.createdAt) }</Text>
                    {/* <Text style={styles.m_r_note} >Note: { marker.description }</Text>
                    <Text style={styles.m_r_addr} >Location: { marker.location }</Text> */}
                    <Text style={[styles.m_r_addr, {color: getStyleStatusInPin(marker.status)}]} >{Lang.checkOutTheReport}</Text>
                  </View>
                  {marker.hasOwnProperty('attachments') === true && marker.attachments.length > 0 && marker.attachments[0].secure_url !== undefined &&
                  <WebView
                    source={{uri: cropWH(60, 80, marker.attachments[0].secure_url)}}
                    style={{width: 60, height: 80, flex: 1, marginVertical: 5}}
                    />}
                </MapView.Callout>
              </MapView.Marker>
            }) }
          </MapView>
            )}

        {/*
        <View style={{position: 'absolute', top: 0, right: 10}}>
          {/* <MapButton onPress={() => {}} icon={'crop-free'}><Text>screenShot</Text></MapButton> * /}
          <MapButton onPress={() => this._zoomIn()} icon={'add'}><Text>zoomIn</Text></MapButton>
          <MapButton onPress={() => this._zoomOut()} icon={'remove'}><Text>zoomOut</Text></MapButton>
        </View>{/** top right: screenShot, zoomIn, zoomOut  * /}
         */}
        <View style={{position: 'absolute', top: 0, left: 5}}>
          <MapButton onPress={() => this._findUserLocation()} icon={'gps-fixed'}><Text>findUserLocation</Text></MapButton>
        </View>

        {/*
          <SlidingUpPanel
            ref={c => { this._panel = c }}
            allowDragging={false}
            showBackdrop={false}
            visible >
            {renderIf(this.state.slidingPanelPage === '77')(
              <View style={[styles.slideUpMenu, {height: this.state.slideMenuHeight, width: width}]}>
                <ReportStepOne onCancel={this.hideCreateReport} onSubmit={() => this.setState({slidingPanelPage: 'report-type'})} address={reportState.reportAddress} />
              </View>)}
            {renderIf(this.state.slidingPanelPage === '77')(
              <View style={[styles.slideUpMenu, {height: this.state.slideMenuHeight, width: width}]}>
                <ReportStepTwo onCancel={this.hideCreateReport} onSubmit={this.onReportTypeSelect.bind(this)} />
              </View>)}
            {renderIf(this.state.slidingPanelPage === '77')(
              <View style={[styles.slideUpMenu, {height: this.state.slideMenuHeight + 150, width: width}]}>
                <ReportStepThree
                  onCancel={this.hideCreateReport}
                  onSubmit={this.showCreateReport}
                  data={this.state}
                  onMainCategoryUpdate={this.onMainCatUpdate.bind(this)}
                  onSubCategoryUpdate={this.onSubCatUpdate.bind(this)}
                  onReportSubmit={this.submitReport.bind(this)}
                  navigation={navigation}
                  />
              </View>)}
          </SlidingUpPanel>
          <SlidingUpPanel
            ref={c => { this._panel_reportView = c }}
            allowDragging={false}
            showBackdrop={false}
            visible
            onRequestClose={() => this.setState({slideMenuUp: true})}>

            {renderIf(this.state.vrfm === 77)(
              <View style={[styles.slideUpMenu, {height: this.slideUpMenuHeight + 150, width: width}]}>
                <ViewReportFromMap
                  data={this.state.vrfmData}
                  onCancel={this.calloutOnClose.bind(this)}
                  onSubmit={this.onReportTypeSelect.bind(this)} />
              </View>)}
          </SlidingUpPanel>
          */
         }
        { this.state.vrfm === true && <View style={[styles.slideUpMenu, {height: height * 0.80, width: width}]}>
          <ViewReportFromMap
            data={this.state.vrfmData}
            onCancel={this.calloutOnClose.bind(this)}
            onSubmit={this.onReportTypeSelect.bind(this)} />
          </View>}
        {/** because slide menu is so slow i will make alternative for now i will not make it animated: maybe later on */}
        {/** show location with next button */}
        {reportState.isReportFormActive === true && this.state.slidingPanelPage === 'report-location' && <View style={[styles.slideUpMenu, {height: heights.sldeUp, width: width}]}>
          <ReportStepOne onCancel={this.hideCreateReport} onSubmit={() => this.setState({slidingPanelPage: 'report-type'})} address={reportState.reportAddress} />
          </View>}
        {/** here will select what type of reports */}
        {reportState.isReportFormActive === true && this.state.slidingPanelPage === 'report-type' && <View style={[styles.slideUpMenu, {height: heights.sldeUp, width: width}]}>
          <ReportStepTwo onCancel={this.hideCreateReport} onSubmit={this.onReportTypeSelect.bind(this)} />
          </View>}
        {/** here will set all need in report then submit */}
        {reportState.isReportFormActive === true && this.state.slidingPanelPage === 'report-info' && <View style={[styles.slideUpMenu, {height: heights.sldeUp, width: width}]}>
          <ReportStepThree
            onCancel={this.hideCreateReport}
            onSubmit={this.showCreateReport}
            data={this.state}
            onMainCategoryUpdate={this.onMainCatUpdate.bind(this)}
            onSubCategoryUpdate={this.onSubCatUpdate.bind(this)}
            onReportSubmit={this.submitReport.bind(this)}
            navigation={navigation}
            />
          </View>}

        {/** crate report button */}
        {renderIf(this.state.slideMenuUp === true && reportState.isReportFormActive === false)(
          <View style={[ styles.txt_E10_container, { ...this.state.txt_e10Height, width: '90%' } ]}>
            <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={() => this.reportFormShow()}>
              <LinearGradient style={ReportStyle.roundButton} colors={[design.button2, design.button]}>
                <Text style={styles.buttonText}>{Lang.txt_E10}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={{height: 40}} />
          </View>)}
      </View>
    )
  }
}

const tempReportData = {'_id': '5a38eed7204f4114ba18d134', 'report_title': 'dsfasdf', 'report_main_category': {'_id': '5a427e5fae6ba7001412d828', 'category_name': 'graffiti', 'category_design_id': '0', 'host_id': '5a15c7c3c189fb0014c09210', 'is_default': 0, '__v': 0, 'modified_at': '2017-12-26T16:52:47.095Z', 'created_at': '2017-12-26T16:52:47.095Z', 'sub_category_ids': ['5a427e96ae6ba7001412d829', '5a427e9dae6ba7001412d82a', '5a427ea1ae6ba7001412d82b', '5a427ea4ae6ba7001412d82c']}, 'report_text': 'fsdfsdfsdf', 'report_location': '2174 Chino Roces Ave, Makati, Metro Manila, Philippines', 'report_status': 0, 'report_note': 'jay lord toret ing na ma lupet jay lord toret ing na ma lupet jay lord toret ing na ma lupet jay lord toret ing na ma lupet jay lord toret ing na ma lupet jay lord toret ing na ma lupet jay lord toret ing na ma lupetjay lord toret ing na ma lupet', 'report_user_id': {'_id': '5a38a3795cad7c00142abc47', 'username': 'user', 'password': '$2a$10$ikfPQjqlcMYD4QCM4pCbjuq8K3jRLxGFmdZ8MPaNeh9AgMRHgcMEu', 'is_active': 1, 'first_name': 'jdflajsdlf', 'last_name': 'dsfasdfasd', 'mobile_num': '097724502802', 'street_name': 'adsfa', 'house_num': 'dfasd', 'postal_code': 'dfasd', 'city': 'dfasdf', 'code': '', 'email_address': 'dfasdfasd@yahoo.com', 'reg_option': 2, 'lat': 5.985930199999999, 'lng': 53.2729807, 'is_volunteer': 1, 'is_admin': 0, 'is_team_leader': 0, 'is_host': 0, 'is_reporter': 1, 'has_team': 0, 'is_host_activated': 0, '__v': 0, 'modified_at': '2017-12-19T05:28:25.166Z', 'created_at': '2017-12-19T05:28:25.166Z', 'host_team_ids': [], 'team_ids': [], 'can_push': 1, 'user_coordinate': {'coordinates': [0, 0], 'type': 'Point'}, 'host_id': '5a15c7c3c189fb0014c09210'}, 'report_host_id': null, 'report_is_active': 1, 'report_type': 1, 'report_is_vechicle_involved': 0, 'report_vechicle_description': "'  '", 'report_is_person_involved': 0, 'report_num_person_involved': 0, 'report_person_description': 'dfasdfasdfasdf', '__v': 0, 'modified_at': '2017-12-19T10:49:59.011Z', 'created_at': '2017-12-19T10:49:59.010Z', 'report_image_urls': [{'url': 'https://res.cloudinary.com/htotyy4ug/image/upload/v1514310182/wmgkffyfa5mlxhcy0afa.jpg', '_id': '5a38eed8204f4114ba18d135'}, {'url': 'https://res.cloudinary.com/htotyy4ug/image/upload/v1513680600/u6q8btc7yvqvkwnsakjb.png', '_id': '5a38eed8204f4114ba18d136'}, {'url': 'https://res.cloudinary.com/htotyy4ug/image/upload/v1513680600/to0pusrbsnrpha6wppma.png', '_id': '5a38eed8204f4114ba18d137'}], 'report_coordinates': {'coordinates': [53.2729807, 5.985930199999999], 'type': 'Point'}, 'report_finished': null, 'report_filed': '2017-12-19T10:49:59.010Z'}
export default ReportMapContainer
