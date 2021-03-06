import React from 'react'
import { connect } from 'react-redux'
import { Image, BackHandler, Dimensions, Keyboard, LayoutAnimation } from 'react-native'
import {
  Card,
  CardItem,
  Text,
  View,
  Thumbnail,
  Container,
  Header,
  Content,
  Title,
  Button,
  Left,
  Right,
  Body,
  Icon, Badge
} from 'native-base'
import MapView from 'react-native-maps'
import ReportMapContainer from './../Containers/ReportMap/ReportMapContainer'
import UnderMigration from './../Components/UnderMigration'
import {drawerData} from './../Navigation/NavigationDrawer'
import ReportsActions from './../Redux/ReportsRedux'
import UsersActions from './../Redux/UserRedux'
/**  styles */
import styles from './Styles/ReportMapStyle'
// import Images from './../Themes/Images'
import { Images, Metrics } from './../Themes'
/**  actionsyles */
import { formatDate } from './../Transforms/DateTransformer'
import { onloginPopUp, getApprovedTeamList } from './../Transforms/Filters'
import CenterView from '../Components/CenterView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// import Icon from 'react-native-vector-icons/Ionicons'

class ReportMapScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight
    }
  }
  keyboardDidShowListener = {};
  keyboardDidHideListener = {};

  componentDidMount () {
    console.log(this.props)
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
    const {userMergeState, userState, user} = this.props
    // set _teamActive
    // it need for reporting
    if (user.teamList.length > 0) {
      userMergeState({_teamActive: user.teamList[0]._id})
    } else {
      userMergeState({_teamActive: ''})
    }
  }
  
  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
    BackHandler.removeEventListener('hardwareBackPress')
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  keyboardDidShow = e => {
    console.log('old size %s', Metrics.screenHeight.toString())

    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = 20// Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize
    })
    console.log('new size %s', newSize.toString())
  }

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth - 40 }
    })
  }

  render () {
    /**
     * under migraiotn so this page must only return migration page
     *
    const pageTitle = drawerData[this.props.navigation.state.key].drawerLabel
    return (
      <UnderMigration title={pageTitle} {...this.props} />
    )
   */
    __DEV__ && console.log('this.props', this.props)
    __DEV__ && console.log(this.props.userState._teamActive)
    const { design, typeCount_A, typeCount_B, typeCount_C, chatCount } = this.props
    const notificationCount = typeCount_A + typeCount_B + typeCount_C + chatCount
    return (
      <Container>
        <Header style={{ height: 40, backgroundColor: design.header }}>
          <Left style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.navigate('MyNotification')}>
              <Icon name='md-chatbubbles' />
              { notificationCount > 0 ? <Badge style={{alignContent: 'center', justifyContent: 'center'}}><Title style={{color: 'white'}}>{notificationCount}</Title></Badge> : null }
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
        <ReportMapContainer {...this.props} />
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    user: state.user.user,
    userState: state.user,
    reportsListNear: state.reports.reportsListNear,
    userPosition: state.reports.userPosition,
    reportState: state.reports,
    design: state.user.design,
    typeCount_A: state.notification.typeCount_A,
    typeCount_B: state.notification.typeCount_B,
    typeCount_C: state.notification.typeCount_C,
    chatCount: state.notification.chatCount,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    setReportAddressByCoordinate: (coordinate) => dispatch(ReportsActions.setReportAddressByCoordinate(coordinate)),
    getReportsNearbyRequest: (param) => dispatch(ReportsActions.getReportsNearbyRequest(param)),
    userMergeState: (newState) => dispatch(UsersActions.mergeState(newState)),
    reportChangeStatus: (_report) => dispatch(ReportsActions.reportChangeStatus(_report))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportMapScreen)
