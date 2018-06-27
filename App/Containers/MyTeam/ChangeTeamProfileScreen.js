import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Container, Content, Item, Input, Text } from 'native-base'
import { connect } from 'react-redux'
import { crop } from '../../Transforms/Cloudinary'
import { getTeamLogo } from '../../Transforms/TeamHelper'
import LinearGradient from 'react-native-linear-gradient'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import Styles from './Styles'
import TeamActions from '../../Redux/TeamRedux'
import { Spacer } from './../../Components'
class ChangeTeamProfile extends Component {
  constructor (props) {
    super(props)
    const {data: {teamName, teamEmail}} = this.props.details || { data: {teamName: '', teamEmail: ''} }
    this.state = {
      teamName: teamName,
      teamEmail: teamEmail
    }
  }

  componentDidMount () {
    const { team: {teamName, teamEmail}, editfieldTeam, _profilePic } = this.props
    __DEV__ && console.log('Edit Team props ', this.props)
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
    __DEV__ && console.log('data', data)
    this.props.navigation.navigate('ChangeTeamLogo', data)
  }

  _updateTeamDetails = () => {
    const { submiteditTeam, navigation } = this.props
    submiteditTeam({ callBack: () => { navigation.goBack() } })
  }

  render () {
    const { team, editfieldTeam, navigation, Lang } = this.props
    const logo = getTeamLogo(team)
    return (
      <Container>
        <HeaderInDrawer navigation={navigation} title={Lang.txt_E03} nhBack />
        <Content>
          <View style={{ paddingRight: 16, paddingLeft: 16 }}>
            <View style={{ marginTop: 25, flexDirection: 'row' }}>
              <Text style={{ marginRight: 25, color: '#3e3f42' }}>{Lang.txt_F06}: </Text>
              <Text style={Styles.textColor}>{team._host ? team._host.hostName : ''}</Text>
            </View>
            <View>
              <View style={{ marginTop: 25, flexDirection: 'column' }}>
                <Text style={{color: '#3e3f42', marginBottom: 5}}>{Lang.txt_F07}: </Text>
                <Item
                  style={Styles.itemInput}>
                  <Input
                    style={{color: '#3e3f42'}}
                    placeholder={team.teamName}
                    onChangeText={text => { this.setState({ teamName: text }); editfieldTeam({eteamName: text}) }}
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
                    style={{ color: '#3e3f42' }}
                    onChangeText={text => {this.setState({ teamEmail: text }); editfieldTeam({eteamEmail: text}) }}
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
          <Spacer />
          <View style={Styles.buttonContainer}>
            <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={this._updateTeamDetails.bind(this)}>
              <LinearGradient colors={['#96c54a', '#639938']} style={Styles.linearGradient}>
                <Text style={Styles.buttonText}>{Lang.txt_F09.toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Spacer />
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
    details: state.teamProfile.details,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editfieldTeam: (fields) => dispatch(TeamActions.editfieldTeam(fields)),
    submiteditTeam: (params) => dispatch(TeamActions.submiteditTeam(params))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTeamProfile)
