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
  Spinner
} from 'native-base'
import MapView from 'react-native-maps'
import ReportMapContainer from './../../Containers/ReportMap/ReportMapContainer'
import UnderMigration from './../../Components/UnderMigration'
import {drawerData} from './../../Navigation/NavigationDrawer'
import ReportsActions, { ReportDefault } from './../../Redux/ReportsRedux'

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
import Details from './../../Components/ReportDashboard/view_report_from_map'
import ReportDetail from '../../Components/MyReport/Components/ReportDetail';
// import Icon from 'react-native-vector-icons/Ionicons'

class ReportDetailsScreen extends React.Component {
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
    console.log(this.props)
    const { report } = this.props.navigation.state.params || { report: ReportDefault }
    const { design } = this.props
    return (
      <Container>
        <Header style={[GlobalStyle.header, {backgroundColor: design.header}]} hasTabs>
          <Left style={{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='md-arrow-back' />
            </Button>
          </Left>
          <Body style={{ flex: 6 }}>
            <Title>{report.title}</Title>
          </Body>
        </Header>
        <ReportDetail screen report={report} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailsScreen)
