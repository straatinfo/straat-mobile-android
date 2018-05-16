import React, { Component } from 'react'
import { View, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Text, Container, Header, Content, Title, Button, Right, Body, Icon, ListItem, List, Left, Thumbnail, Card, CardItem, H1, H2} from 'native-base'

import UnderMigration from './../../Components/UnderMigration'
import Styles from './Styles'

import { connect } from 'react-redux'
import TeamListActions from '../../Redux/TeamListRedux'
import TeamActions from '../../Redux/TeamRedux'
import { getTeamLogo } from '../../Transforms/TeamHelper'
import { crop } from '../../Transforms/Cloudinary'
import { Images } from '../../Themes'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import language from '../../Lib/CutomLanguage'
import CircleLoader from './../../Components/CircleLoader'

class TeamList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userTeams: []
    }
  }

//   componentWillMount () {
//     const { userTeams } = this.props
//     const userTeam = userTeams[0]
//     const testTeam = [1, 2, 3, 4, 5].map((item, i) => { return {...userTeam, _id: 'a' + i + userTeam._id} })
//     this.setState({userTeams: [userTeam, ...testTeam]})
//   }

  _navigateToTeam = (teamId) => {
    console.log('Navigate to Team ', teamId)
    this.props.setCurrentTeam(teamId)
    this.props.navigation.navigate('MyTeamScreen')
  }
  componentDidMount () {
    console.log(this.state.userTeams)
    this.props.teamlistGetList({})
  }

  _renderTeamList1 (team) {
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail source={{ uri: crop(80, getTeamLogo(team)) }} />
        </Left>
        <Body>
          <H2>{team.teamName}</H2>
          <Text note>{team.teamEmail}</Text>
          <Text note>{team.teamEmail}</Text>
        </Body>
      </ListItem>)
  }
  _onClickTeam (team) {
    const {setTeamScreenTeam, navigation, setCurrentTeam} = this.props
    setTeamScreenTeam(team)
    navigation.navigate('MyTeamScreen')

    // for old
    setCurrentTeam(team._id)
    console.log(team)
  }
  _renderTeamList (team, onPess) {
    const logo = getTeamLogo(team)
    return (
      <Card style={{flex: 0}} key={team._id}>
        <CardItem>
          <Left>
            <TouchableOpacity onPress={() => this._onClickTeam(team)}>
              {logo
              ? <Thumbnail large source={{ uri: crop(200, logo) }} />
              : <Thumbnail large source={Images.empty} />
              }
            </TouchableOpacity>
            <Body>
              <TouchableOpacity transparent onPress={() => this._onClickTeam(team)}>
                <H1>{team.teamName}</H1>
                <Text note>{team.teamEmail}</Text>
              </TouchableOpacity>
            </Body>
          </Left>
        </CardItem>
      </Card >)
  }

  render () {
    const { userTeams, navigation, fetching } = this.props
    if (fetching) {
      return (<CircleLoader color='blue' />)
    }
    console.log()
    return (
      <Container>
        <HeaderInDrawer navigation={navigation} title={language.txt_E03} />
        <Content>
          { userTeams.map(this._renderTeamList.bind(this)) }
        </Content>
      </Container>

    )
  }
}

const mapStateToProps = state => {
  return {
   // userTeams: state.user.user.teamList,
    fetching: state.teamList.fetching,
    userTeams: state.teamList.teamList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTeamScreenTeam: (team) => dispatch(TeamActions.teamMergeState({team})),
    setCurrentTeam: (teamId) => dispatch(TeamListActions.setTeamId(teamId)),
    teamlistGetList: (params) => dispatch(TeamListActions.teamlistGetList(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TeamList)
