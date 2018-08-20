import React from 'react'
import { BackHandler } from 'react-native'
import { Text, Container, Header, Title, Button, Left, Right, Icon, Tabs, Tab, TabHeading, Badge } from 'native-base'
import { connect } from 'react-redux'
import Conversation from '../Conversation'
import CenterView from '../../Components/CenterView'
import NotificationActions from './../../Redux/NotificationRedux'
import GlobalStyle from '../../Components/Styles/GlobalStyle'
import style from './../Styles/MyReportStyle'
import ReportsActions from './../../Redux/ReportsRedux'
import ReportListTypeA from '../../Components/MyReport/ReportListTypeA'
import ReportListTypeB from '../../Components/MyReport/ReportListTypeB'
import ReportListTypeC from '../../Components/MyReport/ReportListTypeC'
import UnderMigration from './../../Components/UnderMigration'
import UsersActions from './../../Redux/UserRedux'

class ReportMapScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.isMigration = false
  }

  componentDidMount () {
    __DEV__ && console.log(this.props)
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
    const { language, navigation, design, user: { isVolunteer },
      countedListA, countedListB, countedListC, countedListD} = this.props
    const notificationCount = countedListA + countedListB + countedListC + countedListD
    return (
      <Container>
        <Header style={[GlobalStyle.header, {backgroundColor: design.header}]} hasTabs>
          <Left style={{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.navigate('ReportMap')}>
              <Icon name='map' />
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
        <Tabs locked={false}>
          <Tab heading={this._getSubHeading(language.publicSpace, countedListA)}>
            <ReportListTypeA navigation={navigation} />
          </Tab>
          <Tab heading={this._getSubHeading(language.suspiciousSituation, countedListB)}>
            <ReportListTypeB navigation={navigation} />
          </Tab>
          <Tab heading={this._getSubHeading(language.messages, countedListC)}>
            <ReportListTypeC navigation={navigation} />
          </Tab>
          <Tab heading={this._getSubHeading(language.chat, countedListD)}>
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
    countedListA: state.notification.countedListA.length,
    countedListB: state.notification.countedListB.length,
    countedListC: state.notification.countedListC.length,
    countedListD: state.notification.countedListD.length,
    // chatCount: state.notification.chatCount, 
    notificationtState: state.notification,
    language: state.language.Languages
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
