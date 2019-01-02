import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, Container, Content, Body, List, ListItem, Left, Thumbnail, Card, CardItem, H1, H2, Right, Badge, Title } from 'native-base'
import { connect } from 'react-redux'
import { crop } from '../../Transforms/Cloudinary'
import { Images } from '../../Themes'
import { getTeamLogo } from '../../Transforms/TeamHelper'
import CircleLoader from './../../Components/CircleLoader'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import TeamActions from '../../Redux/TeamRedux'
import TeamListActions from '../../Redux/TeamListRedux'

class TeamList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userTeams: []
    }
  }
  _navigateToTeam = (teamId) => {
    // __DEV__ && console.log('Navigate to Team ', teamId)
    this.props.setCurrentTeam(teamId)
    this.props.navigation.navigate('MyTeamScreen')
  }
  componentDidMount () {
    // __DEV__ && console.log(this.state.userTeams)
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
        <Right>
        <Badge><Title style={{color: 'red'}}> 10 </Title></Badge>
          { (team.teamInvites && team.teamInvites.length > 0) ? <Badge><Title style={{color: 'white'}}> { team.teamInvites.length } </Title></Badge> : null }
        </Right>
      </ListItem>)
  }
  _onClickTeam (team) {
    const {setTeamScreenTeam, navigation, setCurrentTeam} = this.props
    setTeamScreenTeam(team)
    navigation.navigate('MyTeamScreen')

    // for old
    setCurrentTeam(team._id)
    // __DEV__ && console.log(team)
  }
  _renderTeamList (team, onPess) {
    const logo = getTeamLogo(team)
    return (

            <ListItem avatar key={team._id}>
              <Left>
                <TouchableOpacity onPress={() => this._onClickTeam(team)}>
                {logo
                ? <Thumbnail   source={{ uri: crop(200, logo) }} />
                : <Thumbnail   source={Images.empty} />
                }
              </TouchableOpacity>
              </Left>
              <Body>
                <TouchableOpacity transparent onPress={() => this._onClickTeam(team)}>
                  <H1>{team.teamName}</H1>
                  <Text note>{team.teamEmail}</Text>
                </TouchableOpacity>
              </Body>
              <Right>
          { (team.teamInvites && team.teamInvites.length > 0) ? <Badge><Title style={{color: 'white'}}> { team.teamInvites.length } </Title></Badge> : null }
        
              </Right>
            </ListItem>
         

      // <Card style={{flex: 0}} key={team._id}> 
      //   <CardItem>
           
      //       <Body>
      //       <TouchableOpacity onPress={() => this._onClickTeam(team)}>
      //         {logo
      //         ? <Thumbnail large source={{ uri: crop(200, logo) }} />
      //         : <Thumbnail large source={Images.empty} />
      //         }
      //       </TouchableOpacity>
            
      //         <TouchableOpacity transparent onPress={() => this._onClickTeam(team)}>
      //           <H1>{team.teamName}</H1>
      //           <Text note>{team.teamEmail}</Text>
      //         </TouchableOpacity>
      //       </Body>
      //    <Right>
      //   <Badge><Title > 10 </Title></Badge>
      //     { (team.teamInvites && team.teamInvites.length > 0) ? <Badge><Title style={{color: 'white'}}> { team.teamInvites.length } </Title></Badge> : null }
      //   </Right>
      //   </CardItem>
      // </Card >
      )
  }

  render () {
    const { userTeams, navigation, fetching, language } = this.props
    if (fetching) {
      return (<CircleLoader color='blue' />)
    }
    return (
      <Container>
        <HeaderInDrawer navigation={navigation} title={language.txt_E03} />
        <Content>
      <List>
          { userTeams.map(this._renderTeamList.bind(this)) }
          </List>
        </Content>
      </Container>

    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.teamList.fetching,
    userTeams: state.teamList.teamList,
    language: state.language.Languages
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
 