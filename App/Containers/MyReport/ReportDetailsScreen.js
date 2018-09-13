import React from 'react'
import { BackHandler } from 'react-native'
import { Container, Header, Title, Button, Left, Body, Icon } from 'native-base'
import { connect } from 'react-redux'
import NotificationActions from './../../Redux/NotificationRedux'
import GlobalStyle from '../../Components/Styles/GlobalStyle'
import ReportDetail from '../../Components/MyReport/Components/ReportDetail'
import ReportsActions, { ReportDefault } from './../../Redux/ReportsRedux'
import UnderMigration from './../../Components/UnderMigration'
import UsersActions from './../../Redux/UserRedux'

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
  _getTitle (report) {
    // const { Lang } = this.props
    if (report._mainCategory !== undefined && report._mainCategory !== null && report._mainCategory.name !== undefined) {
      return report._mainCategory.name
    }
    return ''
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
            <Title>{this._getTitle(report)}</Title>
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
