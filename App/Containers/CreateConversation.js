import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, Modal, TouchableOpacity, Image, Keyboard, LayoutAnimation, BackHandler } from 'react-native'
import {
    Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
    Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, Icon, Center
} from 'native-base'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import Lang from '../Lib/CutomLanguage'
import { Fonts, Colors } from '../Themes'
import style from '../Components/AccessCode/style'
import CenterView from '../Components/CenterView'
import RowView from '../Components/RowView'
import CircleButton from '../Components/CircleButton'
import Spacer from '../Components/Spacer'
import ConversationActions from "../Redux/ConversationRedux";

import { CONNECTION } from '../Services/AppSocket'

class CreateConversation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            conversationTitle: ''
        }
    }
    componentDidMount() {
        const { userId } = this.props;
        this.connection = CONNECTION.getConnection(userId);
        this.connectionId = CONNECTION.connectionId;
    }
    _onProceed = () => {
        /* const { team } = this.props.navigation.state.params;
        const { conversationTitle } = this.state;
        const { userId } = this.props; */

        // const conversation = {
        //     "title": conversationTitle,
        //     "type": "TEAM",
        //     "_author": userId,
        //     "_team": team[0]._id
        // }
        // this.props.createConversation(conversation);
        // this.connection.emit(SocketTypes.ENTER_CONVO, {
        //     "_conversation": team.conversations[0],
        //     "_connection": connectionId
        // });
        // this.connection.on(SocketTypes.ENTER_CONVO, data => {
        //     console.log('enter-convo: Emit Response: ', data);
        //     if (data && data.status === 1) {
        //         console.log('Setting conversation id...', team.conversations[0]);
        //         this.props.setSelectedConversationId(team.conversations[0]);
        //         this.props.navigation.navigate('TeamChat');
        //     }
        // });
    }
    render() {
        const TextStyles = {
            fontSize: Fonts.size.h5,
            textAlign: 'center'
        }

        return (
                <CenterView>
                    <View stlye={{ flex: 0 }}>
                        <Text style={TextStyles}>{Lang.txt_CONVERSATION_TITLE}</Text>
                        <Spacer />
                        <Item regular>
                            <Input onChangeText={(value) => this.setState({ conversationTitle: value })} />
                        </Item>
                        <Spacer />
                        <RowView flexNumber={0}>
                            <CircleButton styles={{ width: 100 }} text={Lang.txt_Z04} gradient={{ start: '#f95b4f', end: '#f74638' }} onPress={() => this.props.navigation.goBack()} />
                            <Spacer />
                            <CircleButton styles={{ width: 100 }} text={Lang.txt_A01} gradient={{ start: '#339fd6', end: '#2088bc' }} onPress={() => this._onProceed} />
                        </RowView>
                        <Spacer />
                        <Spacer />
                    </View>
                </CenterView>
        )
    }
}
const mapStateToProps = state => {
    return {
        userId: state.user.user._id
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createConversation: (conversation) => dispatch(ConversationActions.createConversation(conversation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateConversation)