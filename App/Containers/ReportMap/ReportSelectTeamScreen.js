import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Picker,
  BackHandler
  } from 'react-native'
import {
  Card,
  CardItem,
  Text,
  Container,
  Header,
  Content,
  Title,
  Button,
  Right,
  Left,
  Body,
  Icon
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import TeamSelect from './../../Components/ReportDashboard/Components/TeamSelect'

import ReportsActions from './../../Redux/ReportsRedux'
import UserActions from './../../Redux/UserRedux'
import { connect } from 'react-redux'
import ReportReview from '../../Components/ReportDashboard/Components/ReportReview'
class ReportSelectTeamScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      review: false
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
  }
  _validated () {
    const { reportTeamSelected } = this.props
    //  console.log('reportTeamSelected', reportTeamSelected)
    if (reportTeamSelected && reportTeamSelected.length > 0) {
      return true
    } else {
      return false
    }
  }
  submit () {
    const { navigation, reportSubmit } = this.props
    // console.log('navigation', navigation)
    const callback = () => {
      navigation.state.params.callback()
      navigation.goBack()
    }
    reportSubmit({ callback })
   // callback()
  }
  render () {
    const { navigation, design, language } = this.props
    const { review } = this.state
    const validated = this._validated()
    return (
      <Container style={{backgroundColor: 'white'}}>
        {
          <Header style={{ height: 40, backgroundColor: design.header }}>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name='md-arrow-back' />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <Title />
            </Body>
          </Header>
        }

        {review === false && <View style={{ flex: 1 }}>
          <View><Text style={ReportStyle.title}>{language.txt_J38}</Text></View>
          <TeamSelect />
          <View style={ReportStyle.buttonHolder}>
            <TouchableOpacity disabled={!validated} underlayColor='rgba(0,0,0,0.0)'
              onPress={() => this.setState({review: true})}>
              <LinearGradient style={ReportStyle.roundButton} colors={[validated ? design.button2 : '#a6b2c1', validated ? design.button : '#7f8893']} >
                <Text style={ReportStyle.submitText}>{language.continue.toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>}
        {review === true && <ReportReview onSubmit={() => this.submit()} onBack={() => this.setState({review: false})} />}
      </Container>
    )
  }
}
const ReportStyle = {
  submitText: { fontSize: 18, fontFamily: 'Gill Sans', textAlign: 'center', margin: 10, color: '#ffffff', backgroundColor: 'transparent' },
  roundButton: { borderRadius: 8 },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  },
  buttonHolder: { width: '90%', marginHorizontal: '5%', marginVertical: 15 },
  title: {color: '#6e85a1', fontSize: 25, padding: 20}

}
const mapStateToProps = state => {
  return {
    user: state.user.user,
    teamList: state.user.teamList,
  //  reportState: state.reports,
    reportTeamSelected: state.reports.reportTeamSelected,
    design: state.user.design,
    language: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
   // getTeamlist: (_host, isVolunteer) => dispatch(UserActions.getTeamlist({_host, isVolunteer})),
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    reportSubmit: (reportParams) => dispatch(ReportsActions.reportSubmit(reportParams))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportSelectTeamScreen)
