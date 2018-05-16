import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation, TouchableHighlight} from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, List, Switch, Body} from 'native-base'

import ImagePicker from 'react-native-image-picker'

import RowView from '../../RowView'
import CenterView from '../../CenterView'
import Lang from './../../../Lib/CutomLanguage'
import GeneralDesign from './../../../Lib/GeneralDesign'
import Images from './../../../Themes/Images'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spacer from '../../Spacer'

import colors from './../../../Themes/Colors'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import ReportsActions from './../../../Redux/ReportsRedux'
import UserActions from './../../../Redux/UserRedux'
import { connect } from 'react-redux'
import { modelFindById, isInArray } from '../../../Transforms/ArrayHelper'
import { crop } from '../../../Transforms/Cloudinary'
import { colorMinus, getTeamLogo } from '../../../Transforms/TeamHelper'
import CircleLoader from '../../CircleLoader'
// import Images from './../../../Themes/Images'
class TeamSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
     // reportImages: [{uri: 'content://media/external/images/media/19486'}, {uri: 'content://media/external/images/media/19486'}] // 0 to 9

    }
  }
  addTeam (teamID) {
    const { reportMergeState, reportTeamSelected } = this.props
    if (!isInArray(teamID, reportTeamSelected)) {
      // console.log(teamID, reportTeamSelected)
      reportMergeState({reportTeamSelected: [ ...reportTeamSelected, teamID ]})
    }
  }
  removeTeam (teamID) {
    const { reportMergeState, reportTeamSelected } = this.props
    if (isInArray(teamID, reportTeamSelected)) {
      // console.log(teamID, reportTeamSelected)
      reportMergeState({reportTeamSelected: [ ...reportTeamSelected.filter((_id, i) => _id !== teamID) ]})
    }
  }

  _onSelectTeam (newState, teamID) {
    if (newState) {
      this.addTeam(teamID)
    } else {
      this.removeTeam(teamID)
    }
  }
  componentDidMount () {
    const { user: {_host, isVolunteer}, teamList } = this.props
    if (teamList.length < 5) {
      this.props.getTeamlist(_host, isVolunteer)
    }
  }

/**
 *   Team
 *
 *
 *
 *
*/

  render () {
    // const { source: reportImages } = this.props
    // const style = {
    //   container: {backgroundColor: colors.background},
    //   row: { flex: 1, backgroundColor: 'white' }
    // }
   // const { count } = this.state
    const { teamList, reportTeamSelected, fetchTeam, navigation } = this.props
    if (fetchTeam === true) {
      return (<CircleLoader color='blue' />)
    }
    return (
      <Content >
        {teamList.map((team, i) => <RowTeam team={team} active={isInArray(team._id, reportTeamSelected)} key={'key_' + i} onPress={this._onSelectTeam.bind(this)} />)}
      </Content>
    )
  }
}

const activeBG = '#f2f7fc'
/**
 *
 * @param Team
 *
 */

export const RowTeam = (props) => {
  const { active, onPress, team } = props
  const teamLogo = getTeamLogo(team)
  return (
    <TouchableOpacity
      onPress={() => onPress(!active, team._id)}
      style={[styles.row, {backgroundColor: active ? activeBG : 'transparent'} ]}>
      {/** teamLogo  */}
      <View style={styles.icon}>
        {teamLogo !== false &&
        <Image style={styles.teamIcon} source={{uri: crop(200, teamLogo)}} /> }
        {teamLogo === false &&
        <View style={styles.teamIcon} /> }
        <Text>teamLogo</Text>
        {active && <Icon style={styles.checkIcon} name='check-circle' />}
      </View>
      {/** teamInfo  */}
      <View style={styles.info}>
        <Text style={styles.title}>{team.teamName}</Text>
        <Text style={styles.description}>{team.teamEmail}</Text>
      </View>
    </TouchableOpacity>)
}

const styles = {
  row: {
    flex: 1,
    flexDirection: 'row',
    // margin: 4,
    padding: 4
  },
  checkIcon: {
    fontSize: 24,
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: 'green',
    borderRadius: 12,
    backgroundColor: 'white'
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 10

  },
  teamIcon: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  info: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#d7dcdd',
    // alignItems: 'center'
    justifyContent: 'center'
    // paddingTop: 10

  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  description: {
    fontSize: 15
  },
  picStyle2: {
    height: 200,
    width: '90%'
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#f2faff',
    zIndex: 9999,
    borderRadius: 20,
    borderColor: '#dce9f2',
    borderWidth: 1

  },
  imagesHodler: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
    margin: 2.5
  },
  imageHodler: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#c6e1f2',
    width: '100%',

    height: 210
  },
  close: {
    fontSize: 22,
    color: '#babbc1'
  },
  add: {
    fontSize: 30,
    color: '#babbc1'
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    teamList: state.user.teamList,
  //  reportState: state.reports,
    reportTeamSelected: state.reports.reportTeamSelected,
    fetchTeam: state.reports.fetchTeam
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTeamlist: (_host, isVolunteer) => dispatch(UserActions.getTeamlist({_host, isVolunteer})),
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelect)
