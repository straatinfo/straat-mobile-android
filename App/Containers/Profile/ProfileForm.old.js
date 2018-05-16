import React, { Component } from 'react'
import { View, StatusBar, Switch, ScrollView, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ValidationComponent from 'react-native-form-validator';
import styles from './../Profile/styles'
import {
    Text,
    Container,
    Header,
    Content,
    Title,
    Button,
    Right,
    Body,
    Icon,
    Item,
    Input
} from 'native-base'

import { Images, Metrics } from './../../Themes'
import { connect } from 'react-redux'
import ProfileActions from '../../Redux/ProfileRedux';
import Lang from './../../Lib/CutomLanguage'
import AppData from './../../Lib/Common/AppData'
import HeaderInDrawer from '../../Components/HeaderInDrawer';


class ProfileForm extends ValidationComponent {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            city:'',
            country:'',
            houseNumber:'',
            streetName:'',
            email:'',
            phoneNumber:'',
            chatName:''

        };
    }
    componentDidMount(){
        this.setState({
            email: this.props.email
        })
    }

    _updateProfileDetails = () => {
        const{editUserProfile,userId} = this.props
        const userEmail ={email: this.state.email}
        const param = {userEmail, userId }
        editUserProfile(param)
    }
    render() {

        const { user, title, screen, navigation } = this.props

        return (
            <Container>
                <HeaderInDrawer title={Lang.txt_E04} navigation={navigation} />
                <View style={{ flex: 1 }}>
                    <ScrollView bounce={false}>
                        <Content >
                            <View style={styles.viewheader}>
                                <Image source={Images.uploadprofile} style={styles.profileroundimage} />

                            </View>
                            <View style={styles.viewheader1}>
                            <Text style={styles.inProfileTxtheader}>{Lang.txt_P01}</Text>
                            <Item>
                                <Input
                                    
                                    style={{ color: '#3e3f42'}}
                                    placeholder={user.fname}
                                    onChangeText ={text => this.setState({ fname: text})}
                                    value={this.state.fname}
                                    
                                />
                            </Item>
                            <Text style={styles.inProfileTxtheader}>{Lang.txt_P01}</Text>
                            <Item >
                                <Input
                                    
                                    style={{ color: '#3e3f42'}}
                                    placeholder={user.lname}
                                    onChangeText ={text => this.setState({ lname: text})}
                                    value={this.state.lname}
                                />
                            </Item>
                            </View>
                            <View style={styles.viewheader1}>
                            <Text style={styles.inProfileTxtheader}>{Lang.txt_P02}</Text>
                            <Item >
                                <Input
                                    
                                    style={{ color: '#3e3f42'}}
                                    placeholder={user.houseNumber}
                                    onChangeText ={text => this.setState({ houseNumber: text})}
                                    value={this.state.houseNumber}
                                />
                            </Item>
                            <Item >
                                <Input
                                    
                                    style={{ color: '#3e3f42'}}
                                    placeholder={user.streetName}
                                    onChangeText ={text => this.setState({ streetName: text})}
                                    value={this.state.streetName}
                                />
                            </Item>
                            <Item >
                                <Input
                                    
                                    style={{ color: '#3e3f42'}}
                                    placeholder={user.city}
                                    onChangeText ={text => this.setState({ city: text})}
                                    value={this.state.city}
                                />
                            </Item>
                            <Item disabled>
                                <Input
                                    disabled
                                    style={{ color: '#3e3f42'}}
                                    placeholder={user.country}
                                    onChangeText ={text => this.setState({ country: text})}
                                    value={this.state.country}
                                />
                            </Item>
                            </View>
                            <View style={styles.viewheader1}>
                            <Text style={styles.inProfileTxtheader}>{Lang.txt_P03}</Text>
                            <Item>
                                <Input
                                    style={{ color: '#3e3f42'}}
                                    placeholder={user.email}
                                    onChangeText ={text => this.setState({ email: text})}
                                    value={this.state.email}
                                />
                            </Item>
                            <Item >
                                <Input
                                    
                                    style={{ color: '#3e3f42'}}
                                    placeholder={user.phoneNumber}
                                    onChangeText ={text => this.setState({ phoneNumber: text})}
                                    value={this.state.phoneNumber}
                                />
                            </Item>
                            </View>
                            <View style={styles.viewheader1}>
                            <Text style={styles.inProfileTxtheader}>{Lang.txt_P04}</Text>
                            <Item disabled>
                                <Input
                                    disabled
                                    style={{ color: '#3e3f42'}}
                                    placeholder={Lang.txt_P01}
                                    onChangeText = {text => this.setState({ chatName: text})}
                                    value={user.chatName}
                                />
                            </Item>
                            </View>
                            <View style={styles.viewheader1}>
                            <Text style={styles.inProfileTxtheader}>{Lang.txt_P05}</Text>
                            <Text style={styles.inProfileTxt}>******</Text>
                            </View>

                            <View style={styles.buttonview}>
                                <TouchableOpacity onPress={() => this._updateProfileDetails()}>
                                    <LinearGradient  colors={['#ffffff','#ffffff']}style={styles.lgstyle} >
                                        <Text style={styles.buttontext}>{Lang.txt_P06.toUpperCase()}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </Content>
                    </ScrollView>
                </View>
            </Container>
        )
    }

}

const mapStateToProps = state => {
    console.log('Profile state: ', state)
    return {
        user: state.user.user,
        userId: state.user.user._id,
        fetching: state.userProfile.fetching,
        error: state.userProfile.error,
        isSuccess: state.userProfile.isSuccess,
        email: state.user.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editUserProfile: (params) => dispatch(ProfileActions.editUserRequest(params))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)