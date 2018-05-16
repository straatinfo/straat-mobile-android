import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Container, Form, Content, Button, Item, Input, Icon, Text, Header, Body, Title, Left, Right } from 'native-base'

import Lang from '../../Lib/CutomLanguage'
import { Images } from '../../Themes'
import Styles from './Styles'
import LinearGradient from 'react-native-linear-gradient'
import AppData from '../../Lib/Common/AppData'
import Api from '../../Lib/Common/Api'
import { connect } from 'react-redux'
import TeamActions from '../../Redux/TeamRedux'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import { getTeamLogo } from '../../Transforms/TeamHelper'
import { crop } from '../../Transforms/Cloudinary'

class ChangeTeamProfile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      teamName: this.props.details.data.teamName,
      teamEmail: this.props.details.data.teamEmail
    }
  }

  componentDidMount () {
    const { user, team: {teamName, teamEmail}, editfieldTeam, _profilePic } = this.props
    console.log('Edit Team props ', this.props)
    this.setState({
      teamName: teamName,
      teamEmail: teamEmail,
      _profilePic: _profilePic
    })

    editfieldTeam({eteamName: teamName, eteamEmail: teamEmail})
  }

  _changeLogo = () => {
    const { teamName, teamEmail, teamLogo } = this.state

    const data = {
      teamEmailAddress: teamEmail,
      teamName: teamName,
      teamLogo: teamLogo
    }
    console.log('data', data)
    this.props.navigation.navigate('ChangeTeamLogo', data)
  }

  render () {
    const { details, team, editfieldTeam, navigation } = this.props
    const logo = getTeamLogo(team)
    return (
      <Container>
        {/* <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('MyTeam')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title >{Lang.txt_E03}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='ios-menu' />
            </Button>
          </Right>
        </Header> */}
        <HeaderInDrawer navigation={navigation} title={Lang.txt_E03} nhBack />
        <Content>
          <View style={{ paddingRight: 16, paddingLeft: 16 }}>
            <View style={{ marginTop: 25, flexDirection: 'row' }}>
              <Text style={{ marginRight: 25, color: '#3e3f42' }}>{Lang.txt_F06}: </Text>
              <Text style={Styles.textColor}>{team._host.hostName}</Text>
            </View>
            <View>
              <View style={{ marginTop: 25, flexDirection: 'column' }}>
                <Text style={{color: '#3e3f42', marginBottom: 5}}>{Lang.txt_F07}: </Text>
                <Item
                  style={Styles.itemInput}>
                  <Input
                    style={{color: '#3e3f42'}}
                    placeholder={team.teamName}
                    onChangeText={text => this.setState({ teamName: text })}
                    onEndEditing={(e) => { editfieldTeam({eteamName: e.nativeEvent.text}) }}
                    value={this.state.teamName} />
                </Item>
              </View>
              <View style={{ marginTop: 25, flexDirection: 'column' }}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{color: '#3e3f42', marginBottom: 5}}>{Lang.txt_F08}: </Text>
                </View>
                <Item
                  style={Styles.itemInput}>
                  <Input
                    placeholder={team.teamEmail}
                    style={{ color: '#3e3f42'}}
                    onChangeText={text => this.setState({ teamEmail: text})}
                    onEndEditing={(e) => { editfieldTeam({eteamEmail: e.nativeEvent.text}) }}
                    value={this.state.teamEmail} />
                </Item>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
            { logo && <Image source={{ uri: crop(200, logo) }} style={Styles.image} />}
          </View>

          <View style={Styles.spacing} />
          <View style={Styles.spacing} />

          <View style={Styles.buttonContainer}>
            <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={this._changeLogo}>
              <LinearGradient colors={['gray', 'gray']} style={Styles.linearGradient}>
                <Text style={Styles.buttonText}>{Lang.txt_Z06.toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.user.fetching,
    error: state.error,
    teamId: state.team.team._id,
    team: state.team.team,
    details: state.teamProfile.details
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editfieldTeam: (fields) => dispatch(TeamActions.editfieldTeam(fields))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTeamProfile)
