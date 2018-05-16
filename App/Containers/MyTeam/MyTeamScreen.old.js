import React, { Component, PropTypes } from 'react'
import { View, StatusBar, ScrollView, Image, TouchableOpacity, BackHandler } from 'react-native'
import { Text, Container, Header, Content, Title, Button, Right, Body, Icon, Left, FlatList, List, ListItem, Thumbnail, H1, H2, H4, Card, CardItem } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import Triangle from 'react-native-triangle'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import Styles from './Styles'
import Lang from '../../Lib/CutomLanguage'
import Api from '../../Lib/Common/Api'
import TeamActions from '../../Redux/TeamRedux'
import RequestActions from '../../Redux/UserRequestRedux'
import { getTeamRequest } from '../../Sagas/TeamSagas'
import { crop } from '../../Transforms/Cloudinary'
import { getTeamLogo, checkLeaderById, isActiveTeam } from '../../Transforms/TeamHelper'
import CircleLoader from '../../Components/CircleLoader'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import colors, { Images, Colors } from '../../Themes'
import Spacer from '../../Components/Spacer'
import { GetFullName } from '../../Transforms/NameUtils'
import ButtonIcon from './../../Components/ButtonIcon'
import MainButton from '../../Components/MainButton'
import Conversation from '.././Conversation'
import { CONNECTION } from '../../Services/AppSocket'
import ConversationActions from '../../Redux/ConversationRedux'
import SocketActions from '../../Redux/SocketRedux'
import { SocketTypes, ConvoTypes, convoOption } from '../../Services/Constant'

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
    const { userId, conversationId } = this.props
    this.connection = CONNECTION.getConnection(userId)
    this.connectionId = CONNECTION.connectionId
    console.log('Conversation socket: ', this.connection)
    console.log('Conversation socket: ConnectionId ', this.connectionId)
    console.log('Conversation props: ', this.props)

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
    const { navigation, setSelectedConversationId, nav } = this.props
    console.log('personal conversation params: ', user)
    if (!user.convesations[0]) {
      console.log('Creating personal conversation...')
      this._createConversation(user)
    }
    console.log('PM ConversationId: ', this.conversationId)
    console.log('entering-convo: Emitting...', SocketTypes.ENTER_CONVO)
    this.connectionId.emit(SocketTypes.ENTER_CONVO, {
      '_conversation': this.conversationId,
      '_connection': connectionId
    })
    this.connectionId.on(SocketTypes.ENTER_CONVO, data => {
      console.log('entering-convo: Emit Response: ', data)
      if (data && data.status === 1) {
        this.setState({ isSuccess: true })
      }
    })
    if (this.state.isSuccess === true) {
      console.log('Setting conversation id...', this.conversationId)
      setSelectedConversationId(this.conversationId)
      this.props.navigation.navigate('PersonalChat', { title: GetFullName(user._user) })
    }
  }
/*   _navigateToPersonalChat(user) {
    this.props.navigation.navigate('PersonalChat', { title: GetFullName(user._user) });
  } */

  _createConversation = user => {
    const { userId, conversationId } = this.props
    console.log('Personal Message')
    const conversation = {
      'title': GetFullName(user._user),
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
    const { navigation: { navigate } } = this.props
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
    const { requests } = this.props
    const teamAcceptRequest = this.teamAcceptRequest.bind(this)
    const teamRejectRequest = this.teamRejectRequest.bind(this)

    if (requests.length === 0) {
      return null
    }

    if (!isTeamLeader) {
      return null
    }

    return (
      <List>
        <ListItem itemDivider>
          <Text note>{Lang.txt_F03.toUpperCase()}</Text>{/**  REQUEST */}
        </ListItem>
        { requests.map((user) => (
          <ListItem key={user._user._id}>
            <Body>
              <Text>{GetFullName(user._user)}</Text>
            </Body>
            <Right>
              <Row>
                <ButtonIcon iconName='remove' onPress={() => teamRejectRequest(user._user)} />
                <ButtonIcon iconName='add' onPress={() => teamAcceptRequest(user._user)} />
              </Row>
            </Right>
          </ListItem>
          )) }
      </List>
    )
  }
  _renderTeamMemberList () {
    const { team: { teamMembers } } = this.props
    console.log('team members', this.props)
    if (!(teamMembers.length > 1)) {
      return null
    }
    return (
      <List>
        <ListItem itemDivider>
          <Text note>{Lang.txt_F05.toUpperCase()}</Text>{/**  MEMBERS */}
        </ListItem>
        { teamMembers.map((user) => {
          if (typeof (user) !== 'object') {
            return null
          }
          return (

            <ListItem key={user._user._id}>
              <Body>
                <Text>{GetFullName(user._user)}</Text>
              </Body>
              <Right>
                <Icon name='chatbubbles' onPress={() => this._navigateToPersonalChat(user)} />
              </Right>
            </ListItem>
          )
        }) }
      </List>)
  }
  teamAcceptRequest (user) {
    const { acceptRequest } = this.props
    acceptRequest(user)
  }
  teamRejectRequest (user) {
    const { rejectRequest } = this.props
    rejectRequest(user)
  }

  render () {
    const { team: { teamLeaders }, userId } = this.props
    // console.log('details', this.props.requests.length);
    const { currentMembers, team, requests, fetching, navigation } = this.props
    if (fetching) {
      return (<CircleLoader color='blue' />)
    }
    const isTeamLeader = checkLeaderById(userId, teamLeaders)
    const ifActiveTeam = isActiveTeam(team)
    console.log('team', team)
    return (
      <Container style={{backgroundColor: Colors.background }}>
        <HeaderInDrawer navigation={navigation} title={Lang.txt_E03} />
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
  console.log('My Team Screen state: ', state)
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
    nav: state.nav

  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTeamDetails: (teamId) => dispatch(TeamActions.getTeamDetails(teamId)),
    getTeamRequest: (teamId) => dispatch(TeamActions.getTeamRequest(teamId)),
    acceptRequest: (user) => dispatch(TeamActions.teamAcceptRequest(user)),
    rejectRequest: (user) => dispatch(TeamActions.teamRejectRequest(user)),
    declineRequest: (userId, teamId) => dispatch(TeamActions.declineRequest(userId, teamId)),
    fetchConversations: (conversationId) => dispatch(ConversationActions.fetchConversationRequest(conversationId)),
    setSocketConnectionId: (connectionId) => dispatch(SocketActions.setSocketConnectionId(connectionId)),
    setSelectedConversationId: (conversationId) => dispatch(ConversationActions.setSelectedConversationId(conversationId)),
    createConversation: (conversation) => dispatch(ConversationActions.createConversation(conversation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTeamScreen)
