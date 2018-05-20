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
import ReportReview from '../../Components/ReportDashboard/Components/ReportReview';
class ReportReviewScreen extends React.Component {

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
    const { navigation, design } = this.props
    console.log(this.props)
    const validated = this._validated()
    return (
      <Container style={{backgroundColor: 'white'}}>
        {
          <Header style={{ height: 40 }}>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name='md-arrow-back' />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <Title> </Title>
            </Body>
          </Header>
        }
        <TeamSelect />
        <ReportReview navigation={navigation} />
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportReviewScreen)
