import React, { Component } from 'react'
import { View, TouchableOpacity, Modal, TextInput } from 'react-native'
import { Container, Header, Body, Text, Title, Button, Icon, Right, Content, Form, Item, Input, Left, Thumbnail, Card, CardItem, H1 } from 'native-base'
import { connect } from 'react-redux'
import ConversationActions from '../Redux/ConversationRedux'
import TeamChat from './ChatScreen'
import { Images } from '../Themes'
import SocketActions from '../Redux/SocketRedux'
import { SocketTypes } from '../Services/Constant';
import { getTeamLogo } from '../Transforms/TeamHelper'
import { crop } from '../Transforms/Cloudinary'
import CircleLoader from '../Components/CircleLoader'
import CreateConversation from './CreateConversation'
import { NavigationActions } from 'react-navigation';

import { CONNECTION } from '../Services/AppSocket'

class Conversation extends Component {
    conversationId = null
    constructor(props) {
        super(props);

        this.state = {
            isSuccess: false
        }
    }
    componentDidMount() {
        const { userId, conversationId } = this.props;
        this.connection = CONNECTION.getConnection(userId);
        this.connectionId = CONNECTION.connectionId;
        console.log('Conversation socket: ', this.connection);
        console.log('Conversation socket: ConnectionId ', this.connectionId);
        console.log('Conversation props: ', this.props);
    }
    _navigateToTeamChat = team => {
        const connectionId = this.connectionId;
        this.conversationId = team.conversations[0];
        const { navigation, setSelectedConversationId, nav } = this.props;
        console.log('Conversation params: ', team);
        if (!team.conversations[0]) {
            console.log('Creating conversation...');
            this._createConversation(team)
        }
        console.log('ConversationId: ', this.conversationId);
        console.log('enter-convo: Emitting...', SocketTypes.ENTER_CONVO);
        this.connection.emit(SocketTypes.ENTER_CONVO, {
            "_conversation": this.conversationId,
            "_connection": connectionId
        });
        this.connection.on(SocketTypes.ENTER_CONVO, data => {
            console.log('enter-convo: Emit Response: ', data);
            if (data && data.status === 1) {
                this.setState({ isSuccess: true })
            }
        });
        if (this.state.isSuccess === true) {
            console.log('Setting conversation id...', this.conversationId);
            setSelectedConversationId(this.conversationId);
            this.props.navigation.navigate('TeamChat', { title: team.teamName });
        }
    }
/*     _navigateToChat(teamName) {
        this.props.navigation.navigate('TeamChat', { title: teamName });
    } */
    _createConversation = team => {
        const { userId, conversationId } = this.props
        console.log('Team', team);
        const conversation = {
            "title": team.teamName,
            "type": "TEAM",
            "_author": userId,
            "_team": team._id
        }
        this.props.createConversation(conversation);
        if (conversationId) {
            this.conversationId = conversationId
        }
    }
    _renderTeamList = team => {
        const logo = getTeamLogo(team)
        return (
            <Card style={{ flex: 0 }} key={team._id.toString()}>
                <CardItem>
                    <Left>
                        <TouchableOpacity onPress={() => this._navigateToTeamChat(team)}>
                            {logo
                                ? <Thumbnail large source={{ uri: crop(200, logo) }} />
                                : <Thumbnail large source={Images.empty} />
                            }
                        </TouchableOpacity>
                        <Body>
                            <TouchableOpacity transparent onPress={() => this._navigateToTeamChat(team)}>
                                <H1>{team.teamName}</H1>
                                <Text note>{team.teamEmail}</Text>
                            </TouchableOpacity>
                        </Body>
                    </Left>
                </CardItem>
            </Card >)
    }
    render() {
        const { userTeams, navigation } = this.props

        return (
            <Container>
                <Content>
                    {userTeams.map(this._renderTeamList)}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    console.log('Conversation State: ', state);
    return {
        fetching: state.conversation.fetching,
        conversations: state.conversation.conversation,
        conversationId: state.conversation.conversationId,
        userId: state.user.user._id,
        connectionId: state.socket.connectionId,
        userTeams: state.user.user.teamList,
        nav: state.nav
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchConversations: (conversationId) => dispatch(ConversationActions.fetchConversationRequest(conversationId)),
        setSocketConnectionId: (connectionId) => dispatch(SocketActions.setSocketConnectionId(connectionId)),
        setSelectedConversationId: (conversationId) => dispatch(ConversationActions.setSelectedConversationId(conversationId)),
        createConversation: (conversation) => dispatch(ConversationActions.createConversation(conversation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)