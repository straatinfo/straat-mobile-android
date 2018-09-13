import React from 'react'
import { BackHandler } from 'react-native'
import { Container, Header, Title, Button, Left, Right, Icon } from 'native-base'
import { connect } from 'react-redux'
import CenterView from '../../Components/CenterView'
import MyReportList from '../../Components/MyReport/MyReportList'
import NotificationActions from './../../Redux/NotificationRedux'
import GlobalStyle from '../../Components/Styles/GlobalStyle'
import ReportsActions from './../../Redux/ReportsRedux'
import UnderMigration from './../../Components/UnderMigration'
import UsersActions from './../../Redux/UserRedux'

// import Icon from 'react-native-vector-icons/Ionicons'

class ReportMapScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.isMigration = false
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
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
    const { navigation, design, Lang } = this.props
    // console.log(this.props.navigation.state.routeName)
    return (
      <Container>
        <Header style={[GlobalStyle.header, {backgroundColor: design.header}]}>
          <Left style={{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='md-arrow-back' />
            </Button>
          </Left>
          <CenterView style={{ flex: 6 }}>
            <Title>{ Lang['txt_E02'] }</Title>
          </CenterView>
          <Right style={{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='md-menu' />
            </Button>
          </Right>
        </Header>
        <MyReportList navigation={navigation} Lang={Lang} />
      </Container>
    )
  }
}
 
const mapStateToProps = state => {
  return {
    user: state.user.user,
    userState: state.user,
    design: state.user.design,
    notificationtState: state.notification,
    Lang: state.language.Languages
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
