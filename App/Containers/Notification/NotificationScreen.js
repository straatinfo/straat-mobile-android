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
  Icon,
  Tabs,
  Tab,
  TabHeading,
  Spinner,
  Badge
} from 'native-base'
import MapView from 'react-native-maps'
import ReportMapContainer from './../../Containers/ReportMap/ReportMapContainer'
import UnderMigration from './../../Components/UnderMigration'
import {drawerData} from './../../Navigation/NavigationDrawer'
import ReportsActions from './../../Redux/ReportsRedux'

import NotificationActions from './../../Redux/NotificationRedux'

import UsersActions from './../../Redux/UserRedux'
// import Images from './../Themes/Images'
import { Images, Metrics } from './../../Themes'
/**  actionsyles */
import { formatDate } from './../../Transforms/DateTransformer'
import { onloginPopUp, getApprovedTeamList } from './../../Transforms/Filters'
import CenterView from '../../Components/CenterView'
import language from '../../Lib/CutomLanguage'
import style from './../Styles/MyReportStyle'
import GlobalStyle from '../../Components/Styles/GlobalStyle'
import CircleLoader from '../../Components/CircleLoader'

// import ChatScreen from './../ChatScreen'
import Conversation from '../Conversation'
import ReportListTypeA from '../../Components/MyReport/ReportListTypeA'
import ReportListTypeB from '../../Components/MyReport/ReportListTypeB'
import ReportListTypeC from '../../Components/MyReport/ReportListTypeC'
import TestWebSocket from '../../Components/TestWebSocket';

// import Icon from 'react-native-vector-icons/Ionicons'

class ReportMapScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.isMigration = false
  }

  componentDidMount () {
    console.log(this.props)
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
  }
  _getSubHeading (titleText, count) {
    const { design } = this.props
    return (<TabHeading style={{backgroundColor: design.header}}><CenterView><Text style={style.subTitle}>{titleText}</Text></CenterView>{ count > 0 ? <Badge style={{alignContent: 'center', justifyContent: 'center'}}><Title style={{color: 'white'}}>{count}</Title></Badge> : null}</TabHeading>)
  }
  render () {
    /**
     * under migraiotn so this page must only return migration page
     *
     */
    if (this.isMigration) {
      return (<UnderMigration title={'My Reports'} {...this.props} />)
    }
    /**
     *  .map is not good for the heart
     *
     */
    const { navigation, design, user: { isVolunteer }, notificationtState: { typeCount_A, typeCount_B, typeCount_C, chatCount } } = this.props
    const notificationCount = typeCount_A + typeCount_B + typeCount_C + chatCount
    return (
      <Container>
        <Header style={[GlobalStyle.header, {backgroundColor: design.header}]} hasTabs>
          <Left style={{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.navigate('ReportMap')}>
              <Icon name='map' />
              { notificationCount.count > 0 ? <Badge style={{alignContent: 'center', justifyContent: 'center'}}><Title style={{color: 'white'}}>{notificationCount}</Title></Badge> : null }
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
        <Tabs locked={false}>
          {/* { __DEV__ && <Tab heading={this._getSubHeading('con', 0)}>
            <TestWebSocket />
          </Tab>} */}

          <Tab heading={this._getSubHeading(language.publicSpace, typeCount_A)}>
            <ReportListTypeA navigation={navigation} />
          </Tab>
          <Tab heading={this._getSubHeading(language.suspiciousSituation, typeCount_B)}>
            <ReportListTypeB navigation={navigation} />
          </Tab>
          {isVolunteer === false && <Tab heading={this._getSubHeading(language.messages, typeCount_C)}>
            <ReportListTypeC navigation={navigation} />
          </Tab>}
          <Tab heading={this._getSubHeading(language.chat, chatCount)}>
             {/* <ChatScreen navigation={navigation} noHeader />  */}
            <Conversation navigation={navigation} noHeader />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    userState: state.user,
    design: state.user.design,
    notificationtState: state.notification
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    setReportAddressByCoordinate: (coordinate) => dispatch(ReportsActions.setReportAddressByCoordinate(coordinate)),
    getReportsNearbyRequest: (param) => dispatch(ReportsActions.getReportsNearbyRequest(param)),
    userMergeState: (newState) => dispatch(UsersActions.mergeState(newState)),
    reportChangeStatus: (_report) => dispatch(ReportsActions.reportChangeStatus(_report)),

    notificationRequest: (data) => dispatch(NotificationActions.notificationRequest(data)),
    notificationMerge: (newState) => dispatch(NotificationActions.notificationMerge(newState))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportMapScreen)
