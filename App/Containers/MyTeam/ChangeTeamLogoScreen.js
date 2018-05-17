import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Container, Form, Content, Button, Item, Input, Icon, Text, Header, Body, Title, Left, Right } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import {drawerData} from './../../Navigation/NavigationDrawer'
import Lang from '../../Lib/CutomLanguage'
import { Images } from '../../Themes'
import Styles from './Styles'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import TeamActions from '../../Redux/TeamRedux'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import { getTeamLogo } from '../../Transforms/TeamHelper'
import { crop } from '../../Transforms/Cloudinary'

class ChangeTeamLogo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      teamPhoto: null
    }
  }

  _launchImageLibrary = () => {
    const { editfieldTeam } = this.props
    try {
      const options = {
        quality: 1.0,
        storageOptions: {
          skipBackup: true
        }
      }

      ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response ', response)

        if (response.didCancel) {
          console.log('User cancelled photo picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
        } else {
          delete response.data
          console.log('response', response)
          this.setState({ teamPhoto: response.uri })
          editfieldTeam({eteamLogo: response})
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  _updateTeamDetails = () => {
    const { submiteditTeam, navigation } = this.props
    submiteditTeam({ callBack: () => { navigation.goBack() } })
  }

  render () {
    const { details, team, editfieldTeam, editTeam, navigation } = this.props
    const logo = getTeamLogo(team)
    const editLogo = editTeam.eteamLogo ? editTeam.eteamLogo.uri || null : null
    return (
      <Container>
        {/* <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('ChangeTeamProfile')}>
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
          <View style={Styles.teamLogoContainer}>
            {/* <Image source={{ uri: this.state.teamPhoto }} style={Styles.image} /> */}
            { logo && <Image source={{ uri: crop(200, logo) }} style={Styles.image} />}
          </View>

          <View style={Styles.spacing} />

          <View style={Styles.buttonContainer}>
            <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={this._launchImageLibrary}>
              <LinearGradient colors={['gray', 'gray']} style={Styles.linearGradient}>
                <Text style={Styles.buttonText}>{Lang.txt_Z06.toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={Styles.previewLogoContainer}>
            { editLogo && <Image source={{ uri: editLogo }} style={Styles.image} />}
          </View>

          <View style={Styles.spacing} />

          <View style={Styles.buttonContainer}>
            <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={this._updateTeamDetails.bind(this)}>
              <LinearGradient colors={['#96c54a', '#639938']} style={Styles.linearGradient}>
                <Text style={Styles.buttonText}>{Lang.txt_F09.toUpperCase()}</Text>
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
    team: state.team.team,

    editTeam: state.team.editTeam
  }
}

const mapDispatchToProps = dispatch => {
  return {
  //  editTeamDetails: (params) => dispatch(TeamActions.editTeamDetails(params)),
    editfieldTeam: (fields) => dispatch(TeamActions.editfieldTeam(fields)),
    submiteditTeam: (params) => dispatch(TeamActions.submiteditTeam(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTeamLogo)
