import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation, FlatList, Share, PermissionsAndroid,
   StyleSheet, Platform } from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container, Body,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, Icon, Toast, ScrollableTab, Badge} from 'native-base'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyles'
import { Images, Metrics } from '../Themes'
import { ScreenActions } from '../Redux/ScreenRedux'
import LoginActions from '../Redux/LoginRedux'
import AlertMessage from './../Components/AlertMessage'
import BusyIndicator from 'react-native-busy-indicator'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import Lang from './../Lib/CutomLanguage'
import HeaderBigCenterLogo from './../Components/HeaderBigCenterLogo'
import HeaderTextField from './../Components/HeaderTextField'
import RegisterUserData from './../Components/RegisterUserData'
import UnderMigration from './../Components/UnderMigration'
import TestOnly from './../Components/TestOnlyComponent'
import ReportsActions from './../Redux/ReportsRedux'
import MessageActions from './../Redux/MessageRedux'
import ConversationActions from '../Redux/ConversationRedux'
import NotificationnActions from '../Redux/NotificationRedux'
import Report3 from './../Components/ReportDashboard/stepthree/report_stepthree'
import Report2 from './../Components/ReportDashboard/steptwo/report_steptwo'
import Report1 from './../Components/ReportDashboard/stepone/report_stepone'
import CenterView from '../Components/CenterView'
import TeamSelect from '../Components/ReportDashboard/Components/TeamSelect'
import ReportReview from '../Components/ReportDashboard/Components/ReportReview'

import validator from 'validator'
import ReportMapContainer from './ReportMap/ReportMapContainer'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Spacer from '../Components/Spacer'
import ReportSelectTeamScreen from './ReportMap/ReportSelectTeamScreen'
import { CheckBox } from 'react-native-elements'

import RegistrationStepOne from './../Components/RegistrationCustom/stepone/register_step_one'

// import RandomString from './../Services/RandomString'

import RandomString3 from 'random-string'
import MyTeam from './MyTeam'
import TestWebSocket from '../Components/TestWebSocket'
import { getLoginParams } from '../Transforms/RegistrationHelper'
import ChatScreen from './ChatScreen'
import { ConvoTypes, convoOption, SocketTypes, notificationTypes } from '../Services/Constant'
import { CONNECTION } from '../Services/AppSocket'
import Conversation from './Conversation'
import AddTeamScreen from './MyTeam/AddTeamScreen';

const styles = StyleSheet.create({
  container: {

    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'column',
    left: 0,
    right: 0
  },
  radioButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  horizontalSpacing: {
    width: 10,
    backgroundColor: 'transparent'
  },
  verticalSpacing: {
    height: 20,
    backgroundColor: 'transparent'
  },
  verticalFieldsSpacing: {
    height: 10,
    backgroundColor: 'transparent'
  },
  textInputContainer: {

    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#bdcadc',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'center',
    flexDirection: 'row'

  },
  horizontalContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    height: 50,
    justifyContent: 'center'
  },
  textInput: {
    textAlign: 'right'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  alreadyuser: {
    fontSize: 20,
    color: '#96acc7',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center'
  }
})
const style = {button: {margin: 5, width: 250, alignItems: 'center'}}
class TestOnlyScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func,
    error: PropTypes.string
  };

  isAttempting = false;
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  constructor (props) {
    super(props)
    this.state = {
      report3: false, // reseter,
      cp: 'd',
      isUrgent: false,
      position: {},
      username: '',
      postUserName: '_D:'
    }

    if (!global.appSetting) {
      global.appSetting = {
        colors: {button: '', header: 'yellow'}
      }
    }
  }

  setAddress () {
    // set address
    const { setReportAddressByCoordinate, reportState: { reportCoordinate } } = this.props
    setReportAddressByCoordinate(reportCoordinate)
  }

  reportSubmit () {
    this.props.reportSubmit()
  }

  successSignUp () {
    this.props.navigation.navigate('Login', getLoginParams(true, false, 'test@test.com', 'test'))
  }

  successSignUp2 () {
    this.props.navigation.navigate('Login', getLoginParams(true, false, 'straattest3@gmail.com', '123456'))
  }

  _logIn (userName, password) {
   // this.props.attemptLogin('test9', 'test', {navigate: () => {}}, 'route')
   // this.props.attemptLogin('test@test.com', 'test', {navigate: () => {}}, 'route')
    this.props.attemptLogin(userName, password, {navigate: () => {}}, 'route')
  }
  formStart () {
    return (
      <Card>
        <CardItem>
          <Button style={style.button} onPress={() => this._logIn('straattest3@gmail.com', '123456')}><Title>user 1 ( straattest3 ) </Title></Button>
        </CardItem>
        <CardItem>
          <Button style={style.button} onPress={() => this._logIn('test@test.com', 'test')}><Title>user 2 ( test )</Title></Button>
        </CardItem>
        <CardItem>
          <Button style={style.button} onPress={() => this.setAddress()}><Title>SET ADDRESS</Title></Button>
        </CardItem>
        <CardItem>
          <Button style={style.button} onPress={() => this.reportSubmit()}><Title>SUBMIT REPORT</Title></Button>
        </CardItem>
        <CardItem>
          <Button style={style.button} onPress={() => this.successSignUp()}><Title>Test succes signUp</Title></Button>
        </CardItem>
        <CardItem>
          <Button style={style.button} onPress={() => this.successSignUp2()}><Title>Test Login user With GD</Title></Button>
        </CardItem>
      </Card>
    )
  }
  _testCP (newValue) {
    this.setState({cp: newValue, cpValidation: validator.isPostalCode(newValue, 'any')})
  }
  _loadTestReportData () {
    const { reportUploadImages, reportListImages, reportMapMarkerList,
      reportSelectMainCategoryID, reportSelectSubCategoryID, reportTeamSelected,
      reportIsUrgent, reportAddress, reportDescription, reportMainCategoryList, reportSubCategoryList, reportType } = this.props.reportState
    const { user } = this.props

    const style = {
      row: {borderBottomWidth: 0.5, borderColor: 'gray', padding: 10},
      startList: {borderColor: 'gray', borderTopWidth: 0.5},
      title: {padding: 20, color: 'blue'}
    }
    return (
      <Content>
        <Title style={style.title}>{'report form summary'.toUpperCase()}</Title>
        <View style={[style.row, style.startList]}>
          <Text> UPLOADED IMAGES:</Text>
          <FlatList
            keyExtractor={(item, index) => index}
            data={reportUploadImages}
            renderItem={({item, index}) => <Text key={index}>                                 {item.uri}</Text>} />
        </View>
        <View style={style.row}>
          <Text> LIST IMAGE:</Text>
          <FlatList
            keyExtractor={(item, index) => index}
            data={reportListImages}
            renderItem={({item, index}) => <Text key={index}>                                 {item.public_id}</Text>} />
        </View>
        <View style={style.row}>
          <Text>reportListImages: { JSON.stringify(reportListImages)}</Text>
        </View>
        <View style={style.row}>
          <Text> MAP MARKER LIST:</Text>
          <FlatList
            keyExtractor={(item, index) => index}
            data={reportMapMarkerList}
            renderItem={({item, index}) => <Text key={index}>                                  {item.title}</Text>} />
        </View>
        <View style={style.row}>
          <Text> MAIN CATEGORY LIST: {reportSelectMainCategoryID}</Text>
          <FlatList
            keyExtractor={(item, index) => index}
            data={reportMainCategoryList}
            renderItem={({item, index}) => <Text key={index}>                                  {item.name}</Text>} />
        </View>
        <View style={style.row}>
          <Text> SUB CATEGORY LIST: {reportSelectSubCategoryID}</Text>
          <FlatList
            keyExtractor={(item, index) => index}
            data={reportSubCategoryList}
            renderItem={({item, index}) => <Text key={index}>                                  {item.name}</Text>} />
        </View>
        <View style={style.row}>
          <Text> IS URGENT: { reportIsUrgent ? 'true' : 'false' }</Text>
        </View>
        <View style={style.row}>
          <Text> ADDRESS: { reportAddress }</Text>
        </View>
        <View style={style.row}>
          <Text> DESCRIPTION: { reportDescription }</Text>
        </View>
        <View style={style.row}>
          <Text> REPORT TYPE: { reportType && reportType.name ? reportType.name : ''}</Text>
        </View>
        <View style={style.row}>
          <Text> REPORT TYPE: { JSON.stringify(user)}</Text>
        </View>
        <View style={style.row}>
          <Text>Report team List: { JSON.stringify(reportTeamSelected)}</Text>
        </View>

      </Content>)
  }
  _share () {
    console.log(Share.share)
    Share.share({
      message: 'This message has a title:  http://bam.tech/ ',
      title: 'Best title ever!',
      url: 'http://bam.tech/'
    }, {
      dialogTitle: 'Share',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter',
        'com.apple.uikit.activity.mail'
      ],
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch(err => console.log(err))
  }
  _inPressIsUrgent () {
    // Toast.show({
    //   text: 'Wrong password!',
    //   position: 'bottom',
    //   buttonText: 'Okay',
    //   duration: 5000,
    //   type: 'danger'

    // })
    this.setState({isUrgent: !this.state.isUrgent})
  }
  componentDidMount () {
    console.log(PermissionsAndroid)
    // Permissions.getPermissionStatus('location')
    // .then(response => {
    //   this.setState({ locationPermission: response })
    // })

    console.log(navigator.geolocation)

  //   navigator.geolocation.getCurrentPosition((pos) => {

  //     console.log(pos)
  //   }, (x) => {
  //     console.log(x)
  //   }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }

  // )

  //   try {
  //     /** is separate user position and report position couse pin in map can be move */
  //     this.watchID = navigator.geolocation.watchPosition((position) => {
  //      // this.setState({ mapState: {...mapState, ...position.coords} })
  //       const { latitude, longitude } = position.coords
  //       // this.mapViewToRegion({ latitude, longitude }, 100)
  //       console.log('position.coords', position.coords)
  //       // reportMergeState({reportCoordinate: {...reportCoordinate, ...position.coords}, userPosition: {...userPosition, ...position.coords}})
  //       // this.setAddress(position.coords)
  //       console.log('didmount coordinate: ', position)
  //       this.setState({position: position})
  //     })
  //   } catch (e) {
  //     console.log(e.message)
  //   }
    this.setState({postUserName: '_ID:' + this.generate()})

    console.log('DrawerContent mounted')
    const {user, updateByNotification, messageReceive, convoReceiveMessage, addNotification} = this.props
    console.log('user', user)
    this.connection = CONNECTION.getConnection(user._id)
    // this.connection.on(SocketTypes.RECEIVE_GLOBAL, (data) => updateByNotification(SocketTypes.RECEIVE_GLOBAL, data))
    // this.connection.on(SocketTypes.RECEIVE_MESSAGE, (data) => {
    //   console.log('convoReceiveMessage', data)
    //   // update conversation list
    //   convoReceiveMessage(data)
    //   // update current message screenList
    //   messageReceive(data)
    //   // uopdate notification
    //   addNotification({type: notificationTypes.chat, count: 1})
    // })
  }

  onUsernameTextChange (text) {
    this.setState({username: text})
  }
  generate () {
    // return RandomString(5)
    return RandomString3({length: 5, numeric: true, letters: true})
  }
  _renderHeaederNotifIcon (title, count) {
    return (
      <TabHeading>
        <Title style={{color: 'white'}}>{title}</Title>
        {count > 0 ? <Badge style={{alignContent: 'center', justifyContent: 'center'}}><Title style={{color: 'white'}}>{count}</Title></Badge> : null}
      </TabHeading>
    )
  }

  chatScreen () {
    this.props.navigation.navigate('Chat', {
   //   conversationId: '5ae2369ee5424662ecfaaece',
      title: 'test in 5af5573ce0936b0014615dba',
   //   messages: [],
      option: convoOption.BYTYPE,
      target: {_id: '5af5573ce0936b0014615dba'},  //  {_id: '5adf2b173e894d0014c77f53'},
      type: ConvoTypes.USER

    })
  }

  render () {
    const { navigation, notification: { typeCount_A, chatCount } } = this.props
    const { colors } = global.appSetting

    const { username } = this.state
    // return (<AddTeamScreen />)
    return (
      <Container>
        {/** <Header hasTabs style={{backgroundColor: colors.header}}><CenterView><Title>REPORT TESTING APP</Title></CenterView></Header> */}
        <Header style={{ height: 40 }}>
          <Left style={{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.navigate('MyNotification')}>
              <Icon name='md-chatbubbles' /><Badge style={{alignContent: 'center', justifyContent: 'center'}}><Title style={{color: 'white'}}>{12}</Title></Badge>
            </Button>
          </Left>
          <CenterView style={{ flex: 6 }}>
            <Title>Straat.Info</Title>
          </CenterView>
          <Right style={{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='md-menu' />
            </Button>
          </Right>
        </Header>
        {/* <Tabs initialPage={0} renderTabBar={() => <ScrollableTab />}> */}
        <Tabs initialPage={0} >
          <Tab heading={this._renderHeaederNotifIcon('CHAT', 5)} >
            <Button transparent onPress={() => this.chatScreen()}>
            <Icon name='md-chatbubbles' /><Badge style={{alignContent: 'center', justifyContent: 'center'}}><Title style={{color: 'white'}}>test chat {12}</Title></Badge>
          </Button>
          </Tab>
          <Tab heading={this._renderHeaederNotifIcon('Convo', chatCount)} >
            <Conversation navigation={navigation} />
          </Tab>

          <Tab heading={this._renderHeaederNotifIcon('CONFIG', 5)} style={{alignItems: 'center'}}>
            {this.formStart()}
          </Tab>
          <Tab heading={this._renderHeaederNotifIcon('Websocket', typeCount_A)} style={{alignItems: 'center'}}>
            <TestWebSocket />
          </Tab>

          <Tab heading={this._renderHeaederNotifIcon('title', 5)} style={{backgroundColor: 'white'}}>
            <MyTeam {...this.props} />
          </Tab>

          {/* <Tab heading='Report' >
            <ReportReview />
          </Tab>

          <Tab heading='ReportTeam' >
            <ReportSelectTeamScreen />
          </Tab>
          <Tab heading='test1' >
            <Button onPress={() => global.appSetting.colors.header = 'red'}><Title>changelcoor</Title></Button>
            <Button onPress={() => navigation.navigate('ReportSelectTeamScreen')}><Title>send daw</Title></Button>
            <Spacer />
            <Button onPress={this._share}><Title>Share</Title></Button>
          </Tab>

          <Tab heading='STEP 1' style={{alignItems: 'center'}}>
            <Report1 onSubmit={() => {}} />
          </Tab>
          <Tab heading='STEP 2' style={{alignItems: 'center'}}>
            <Report2 onSubmit={() => {}} />
          </Tab>
          <Tab heading='STEP 3' style={{alignItems: 'center'}}>
            <Button style={style.button} onPress={() => this.setState({report3: !this.state.report3})}><Title>remount</Title></Button>
            {this.state.report3 && <Report3
              onCancel={() => { console.log('cancel') }}
              navigation={navigation} /> }
            {!this.state.report3 && <Report3
              onCancel={() => { console.log('cancel') }}
              navigation={navigation} /> }
          </Tab>
          <Tab heading='MAP' style={{width: '100%'}}>
            <ReportMapContainer {...this.props} />
          </Tab>

          <Tab heading='STATUS' style={{alignItems: 'center', backgroundColor: '#c6e1f2'}} >
            {this._loadTestReportData()}
          </Tab>
          <Tab heading='test' style={{alignItems: 'center'}}>
            <View><Text>cp test: {this.state.cp} : {this.state.cpValidation ? 'true' : 'false'}</Text><TextInput onChangeText={this._testCP.bind(this)} /></View>
          </Tab> */}
        </Tabs>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    user: state.user.user,
    reportsListNear: state.reports.reportsListNear,
    userPosition: state.reports.userPosition,
    reportState: state.reports,
    userState: state.user,
    notification: state.notification
  }
}

const mapDispatchToProps = dispatch => {
  return {
    mergeInReport: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    setReportAddressByCoordinate: (coordinate) => dispatch(ReportsActions.setReportAddressByCoordinate(coordinate)),
    getReportsNearbyRequest: (param) => dispatch(ReportsActions.getReportsNearbyRequest(param)),
    reportSubmit: (param) => dispatch(ReportsActions.reportSubmit(param)),
    attemptLogin: (username, password, navigation, route) => dispatch(LoginActions.loginRequest({username, password, navigation, route})),
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    userMergeState: (newState) => dispatch(UsersActions.mergeState(newState)),
    reportChangeStatus: (_report) => dispatch(ReportsActions.reportChangeStatus(_report)),
    messageReceive: (params) => dispatch(MessageActions.messageReceive(params)),
    convoReceiveMessage: (param) => dispatch(ConversationActions.convoReceiveMessage(param)),
    addNotification: (param) => dispatch(NotificationnActions.addNotification(param))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestOnlyScreen)
