import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import { Text, Container, Content, Button, Right, Body, Icon, Left, List, ListItem, Thumbnail, H1, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { crop } from '../../Transforms/Cloudinary'
import { Images, Colors } from '../../Themes'
import { getTeamLogo, checkLeaderById, isActiveTeam } from '../../Transforms/TeamHelper'
import { GetFullName, GetChatName } from '../../Transforms/NameUtils'
import { SocketTypes, ConvoTypes, convoOption } from '../../Services/Constant'
import ButtonIcon from './../../Components/ButtonIcon'
import CircleLoader from '../../Components/CircleLoader'
import ConversationActions from '../../Redux/ConversationRedux'
import MainButton from '../../Components/MainButton'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import SocketActions from '../../Redux/SocketRedux'
import Spacer from '../../Components/Spacer'
import Styles from './Styles'
import TeamActions from '../../Redux/TeamRedux'
import Triangle from 'react-native-triangle'

class MyTeamScreen extends Component {
  conversationId = null
  constructor (props) {
    super(props)
    this.state = {
      isSuccess: false
    }
  }

  componentWillMount () {
    const { getTeamDetails } = this.props
    getTeamDetails()
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack()
      return true
    })
  }
  _getTeamData () {
    const { teamId } = this.props
    this.props.getTeamDetails(teamId)
    this._leaderOptions()
  }

  chatScreen (user) {
    __DEV__ && console.log('user', user)
    this.props.navigation.navigate('Chat', {
      //  conversationId: '5ae2369ee5424662ecfaaece',
      title: user.username,
      //  messages: [],
      option: convoOption.BYTYPE,
      target: {_id: user._id},  //  {_id: '5adf2b173e894d0014c77f53'},
      type: ConvoTypes.USER

    })
  }

  _navigateToPersonalChat = user => {
    const connectionId = this.connectionId
    this.conversationId = user.conversations[0]
    const { setSelectedConversationId } = this.props
    __DEV__ && console.log('personal conversation params: ', user)
    if (!user.convesations[0]) {
      __DEV__ && console.log('Creating personal conversation...')
      this._createConversation(user)
    }
    __DEV__ && console.log('PM ConversationId: ', this.conversationId)
    __DEV__ && console.log('entering-convo: Emitting...', SocketTypes.ENTER_CONVO)
    this.connectionId.emit(SocketTypes.ENTER_CONVO, {
      '_conversation': this.conversationId,
      '_connection': connectionId
    })
    this.connectionId.on(SocketTypes.ENTER_CONVO, data => {
      __DEV__ && console.log('entering-convo: Emit Response: ', data)
      if (data && data.status === 1) {
        this.setState({ isSuccess: true })
      }
    })
    if (this.state.isSuccess === true) {
      __DEV__ && console.log('Setting conversation id...', this.conversationId)
      setSelectedConversationId(this.conversationId)
      this.props.navigation.navigate('PersonalChat', { title: GetChatName(user._user) })
    }
  }
/*   _navigateToPersonalChat(user) {
    this.props.navigation.navigate('PersonalChat', { title: GetFullName(user._user) });
  } */

  _createConversation = user => {
    const { userId, conversationId } = this.props
    __DEV__ && console.log('Personal Message')
    const conversation = {
      'title': GetChatName(user._user),
      'type': 'PRIVATE',
      '_author': userId,
      '_user': user._id
    }
    this.props.createConversation(conversation)
    if (conversationId) {
      this.conversationId = conversationId
    }
  }
  _newRequests () {
    const { teamId } = this.props
    this.props.getTeamRequest(teamId)
  }

  _acceptRequest () {
    const { userId, teamId } = this.props
    this.props.setRequest(userId, teamId)
  }

  _declineRequest () {
    const { userId, teamId } = this.props
    this.props.declineRequest(userId, teamId)
  }

  _renderNewRequest = () => {
    const { requests } = this.props
    return (
      <View>
        <List>
          <ListItem>
            <View style={Styles.requestList}>
              <Grid>
                <Col style={{ width: 280 }}>
                  <Text style={Styles.textColor}>{requests.fname} {requests.lname}</Text>
                </Col>
                <Col>
                  <Row>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                      <Button
                        style={Styles.buttonLeft} onPress={this._declineRequest}>
                        <Text style={Styles.textColor}>✖</Text>
                      </Button>
                      <Button style={Styles.buttonRight} onPress={this._acceptRequest}>
                        <Text style={Styles.textColor}>✔</Text>
                      </Button>
                    </View>
                  </Row>
                </Col>
              </Grid>
            </View>
          </ListItem>
        </List>
      </View>
    )
  }

  _renderTopContent () {
    const { team } = this.props
    const logo = getTeamLogo(team)
    return (
      <Card >
        <CardItem>
          <Left>
            {logo
              ? <Thumbnail large source={{ uri: crop(200, logo) }} />
              : <Thumbnail large source={Images.empty} />
              }
            <Body>
              <H1>{team.teamName}</H1>
              <Text note>{team._host ? team._host.hostName : ''}</Text>
              <Text note>{team.teamEmail}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card >
    )
  }
  _renderGroupButton (isTeamLeader) {
    // show if user is leader member of this team
    const { navigation: { navigate }, Lang } = this.props
    if (!isTeamLeader) {
      return (<Spacer />)
    }
    return (
      <Row style={{justifyContent: 'space-between'}}>
        <Button transparent onPress={() => navigate('AddTeam')}><Text style={{color: 'gray'}}>{Lang.txt_F01}</Text></Button>
        <Button transparent onPress={() => navigate('ChangeTeamProfile')}><Text style={{color: 'gray'}}>{Lang.txt_F02}</Text></Button>
      </Row>
    )
  }
  _renderMemberRequestLst (isTeamLeader) {
    const { requests, Lang, fetching } = this.props
    const teamAcceptRequest = this.teamAcceptRequest.bind(this)
    const teamRejectRequest = this.teamRejectRequest.bind(this)

    if (requests.length === 0) {
      return null
    }

    if (!isTeamLeader) {
      return null
    }
    if (fetching) {
      return (<CircleLoader color='blue' />)
    }
    return (
      <List>
        <ListItem itemDivider>
          <Text note>{Lang.txt_F03.toUpperCase()}</Text>{/**  REQUEST */}
        </ListItem>
        { requests.map((teamInvite) => (
          <ListItem key={teamInvite._user._id}>
            <Body>
              <Text>{GetChatName(teamInvite._user)}</Text>
            </Body>
            <Right>
              <Row>
                <ButtonIcon iconName='remove' onPress={() => teamRejectRequest(teamInvite)} />
                <ButtonIcon iconName='add' onPress={() => teamAcceptRequest(teamInvite)} />
              </Row>
            </Right>
          </ListItem>
          )) }
      </List>
    )
  }
  _renderTeamMemberList () {
    const { team: { teamMembers }, userId, Lang } = this.props
    __DEV__ && console.log('team members', this.props)
    if (!(teamMembers && teamMembers.length > 1)) {
      return null
    }
    return (
      <List>
        <ListItem itemDivider>
          <Text note>{Lang.txt_F05.toUpperCase()}</Text>{/**  MEMBERS */}
        </ListItem>
        { teamMembers.map((user) => {
          if (typeof (user) !== 'object' || userId === user._user._id) { // this will not include itselft to map
            return null
          }
          return (

            <ListItem key={user._user._id}>
              <Body>
                <Text>{GetChatName(user._user)}</Text>
              </Body>
              <Right>
                <Icon name='chatbubbles' onPress={() => this.chatScreen(user._user)} />
              </Right>
            </ListItem>
          )
        }) }
      </List>)
  }
  teamAcceptRequest (teamInvite) {
    const { acceptRequest } = this.props
    acceptRequest(teamInvite)
  }
  teamRejectRequest (user) {
    const { rejectRequest } = this.props
    rejectRequest(user)
  }

  render () {
    const { team: { teamLeaders }, userId } = this.props
    const { team, fetching, navigation, Lang } = this.props
    if (fetching) {
      return (<CircleLoader color='blue' />)
    }
    const isTeamLeader = checkLeaderById(userId, teamLeaders)
    const ifActiveTeam = isActiveTeam(team)
    __DEV__ && console.log('team', team)
    return (
      <Container style={{ backgroundColor: Colors.background }}>
        <HeaderInDrawer navigation={navigation} title={Lang.txt_E03} nhBack />
        <Content>
          <View style={Styles.topHeader}>
            { this._renderTopContent() }
            { this._renderGroupButton(isTeamLeader) }
          </View>
          <View style={[Styles.triangleContainer, { justifyContent: 'space-around' }]}>
            <Triangle width={90} height={30} direction={'down'} color={'white'} />
          </View>
          <Spacer />
          <Spacer />

          { this._renderMemberRequestLst(isTeamLeader) }
          { this._renderTeamMemberList() }
          <Spacer />
        </Content>
        { ifActiveTeam === true ? <MainButton title={Lang.txt_F04} onPress={() => console.log('invite clicked')} styles={{width: '90%', flex: 0, alignSelf: 'center'}} /> : null }
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    // fetching: state.user.fetching,
    // error: state.error,
    teamId: state.team.team._id,
    currentMembers: state.user.user.teamMembers,
    userId: state.user.user._id,
    user: state.user,
    teams: state.user.user.teamLeaders,
    team: state.team.team,
    requests: state.team.join,
    fetching: state.team.getTeamInfoFetching,
    error: state.team.error,
    conversations: state.user.conversations,
    conversationId: state.conversation.conversationId,
    connectionId: state.socket.connectionId,
    nav: state.nav,
    Lang: state.language.Languages

  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTeamDetails: (teamId) => dispatch(TeamActions.getTeamDetails(teamId)),
    getTeamRequest: (teamId) => dispatch(TeamActions.getTeamRequest(teamId)),
    acceptRequest: (teamInvite) => dispatch(TeamActions.teamAcceptRequest(teamInvite)),
    rejectRequest: (user) => dispatch(TeamActions.teamRejectRequest(user)),
    declineRequest: (userId, teamId) => dispatch(TeamActions.declineRequest(userId, teamId)),
    fetchConversations: (conversationId) => dispatch(ConversationActions.fetchConversationRequest(conversationId)),
    setSocketConnectionId: (connectionId) => dispatch(SocketActions.setSocketConnectionId(connectionId)),
    setSelectedConversationId: (conversationId) => dispatch(ConversationActions.setSelectedConversationId(conversationId)),
    createConversation: (conversation) => dispatch(ConversationActions.createConversation(conversation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTeamScreen)
