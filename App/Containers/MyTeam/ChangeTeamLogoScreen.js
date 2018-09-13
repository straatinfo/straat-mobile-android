import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Container, Content, Text } from 'native-base'
import { connect } from 'react-redux'
import { crop } from '../../Transforms/Cloudinary'
import { getTeamLogo } from '../../Transforms/TeamHelper'
import ImagePicker from 'react-native-image-picker'
import LinearGradient from 'react-native-linear-gradient'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import Styles from './Styles'
import TeamActions from '../../Redux/TeamRedux'

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
        // console.log('Response ', response)

        if (response.didCancel) {
          // __DEV__ && console.log('User cancelled photo picker')
        } else if (response.error) {
          // __DEV__ && console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          // __DEV__ && console.log('User tapped custom button: ', response.customButton)
        } else {
          delete response.data
          // __DEV__ && console.log('response', response)
          this.setState({ teamPhoto: response.uri })
          editfieldTeam({eteamLogo: response})
        }
      })
    } catch (error) {
      // __DEV__ && console.log(error)
    }
  }

  _updateTeamDetails = () => {
    const { submiteditTeam, navigation } = this.props
    submiteditTeam({ callBack: () => { navigation.goBack() } })
  }

  render () {
    const { team, editTeam, navigation, Lang } = this.props
    const logo = getTeamLogo(team)
    const editLogo = editTeam.eteamLogo ? editTeam.eteamLogo.uri || null : null
    return (
      <Container>
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

    editTeam: state.team.editTeam,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
  //  editTeamDetails: (params) => dispatch(TeamActions.editTeamDetails(params)),
    editfieldTeam: (fields) => dispatch(TeamActions.editfieldTeam(fields)),
    submiteditTeam: (params) => dispatch(TeamActions.submiteditTeam(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTeamLogo)
