import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Container, Form, Content, Button, Item, Input, Icon, Text, Header, Left, Body, Right, Title } from 'native-base'
import ImagePicker from 'react-native-image-picker'
import Lang from '../../Lib/CutomLanguage'
import Styles from './Styles'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import TeamActions from '../../Redux/TeamRedux'
import AddNewTeamActions from '../../Redux/AddNewTeamRedux'

class AddTeam extends Component {
  constructor (props) {
    super(props)

    this.state = {
      teamName: '',
      teamEmail: '',
      teamPhoto: '',    // use in preview only : uri
      teamLogo: {}      // this will be uploaded
    }
  }

  _launchImageLibrary = () => {
    const { addNewTeamMergeState } = this.props
    try {
      const options = {
        quality: 1.0,
        storageOptions: {
          skipBackup: true
        }
      }

      ImagePicker.launchImageLibrary(options, (response) => {
        __DEV__ && console.log('Response ', response)

        if (response.didCancel) {
          __DEV__ && console.log('User cancelled photo picker')
        } else if (response.error) {
          __DEV__ && console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          __DEV__ && console.log('User tapped custom button: ', response.customButton)
        } else {
          this.setState({ teamPhoto: response.uri, teamLogo: response })
          addNewTeamMergeState({teamPhoto: response.uri})
          delete response.data
        //  uploadAddNewTeam(response)
        }
      })
    } catch (error) {
      __DEV__ && console.log(error)
    }
  }

  submit () {
    const { teamLogo } = this.state
    const { teamName, teamEmail, navigation } = this.props
    this.props.addNewTeam({ teamLogo, teamName, teamEmail, callBack: () => { navigation.goBack() } })
  }

  render () {
    const { addNewTeamMergeState, teamName, teamEmail, teamPhoto } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('MyTeam')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Title >{ Lang.txt_F13 }</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='ios-menu' />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{ flex: 1, marginTop: 25, marginLeft: 15 }}>
            <Text style={{ fontSize: 25 }}>{Lang.txt_F10}</Text>
          </View>
          <View style={{ flex: 1, paddingLeft: 16, paddingRight: 16 }}>
            <Form style={{ marginTop: 16, marginBottom: 16 }}>
              <View>
                <View>
                  <Item>
                    <Input
                      style={Styles.itemInput}
                      placeholder={Lang.txt_F07}
                      onChangeText={text => addNewTeamMergeState({ teamName: text })}
                      value={teamName} />
                  </Item>
                </View>

                <View style={{marginTop: 15}}>
                  <Item
                            >
                    <Input
                      style={Styles.itemInput}
                      placeholder={Lang.txt_F08}
                      onChangeText={text => addNewTeamMergeState({ teamEmail: text })}
                      value={teamEmail} />
                  </Item>
                </View>
              </View>

              <View style={Styles.spacing} />
              <View style={Styles.spacing} />

              <View style={Styles.buttonContainer}>
                <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={this._launchImageLibrary}>
                  <LinearGradient colors={['gray', 'gray']} style={Styles.linearGradient}>
                    <Text style={Styles.buttonText}>{Lang.txt_F11.toUpperCase()}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={Styles.spacing} />

              <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 15}}>
                {teamPhoto ? <Image source={{ uri: this.state.teamPhoto }} style={Styles.image} /> : null}
              </View>

              <View style={Styles.spacing} />
              <View style={Styles.buttonContainer}>
                <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={() => this.submit()}>
                  <LinearGradient colors={['#96c54a', '#639938']} style={Styles.linearGradient}>
                    <Text style={Styles.buttonText}>{Lang.txt_F12.toUpperCase()}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Form>
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
    teamName: state.addNewTeam.teamName,
    teamEmail: state.addNewTeam.teamEmail,
   // _profilePic: state.addNewTeam._profilePic,
    teamPhoto: state.addNewTeam.teamPhoto
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewTeamMergeState: (params) => dispatch(AddNewTeamActions.addNewTeamMergeState(params)),
    uploadAddNewTeam: (params) => dispatch(AddNewTeamActions.uploadAddNewTeam(params)),

    addNewTeam: (params) => dispatch(TeamActions.addNewTeam(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeam)
