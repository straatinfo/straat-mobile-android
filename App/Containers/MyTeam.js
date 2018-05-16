import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Lang from '../Lib/CutomLanguage'
import AppData from '../Lib/Common/AppData'
import TeamList from '../Containers/TeamList'
import MyTeamScreen from './MyTeam/MyTeamScreen'
import { connect } from 'react-redux'
import TeamActions from '../Redux/TeamRedux'
import TeamListScreen from './MyTeam/TeamListScreen'

class MyTeam extends Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   teamCount: 0,
    //   // hasActiveTeam: false
    // }
  }
  componentWillMount () {
    const { userTeams, setTeamScreenTeam } = this.props
    // const { team } = this.props
    // console.log('My Team props ', this.props)
    // if (team.length === 1) {
    //   this.props.setCurrentTeam(team[0]._team._id)
    // }
    // if (teamList.length > 1) {
    // }

    // this.setState({teamCount: teamList.length })
    if (userTeams.length === 1) {
      setTeamScreenTeam(userTeams[0])
    }
  }
  /**
   * @description
   *  start(MyTeamScreen) -> team selection                    |   -> teamDetailScreen
   *                         if team is none(not active team)  |        onLoad: fetch team Details
   *                            then empty                     |          leader actions:
   *                         if team is only one               |            accept request
   *                            then set this team, Next()     |            decline request
   *                                                                        edit team
   *                                                                    invite
   *                                                                    create team ( not sure)
   */

  render () {
    const { userTeams, navigation } = this.props
    // console.log('userTeams props', this.props)

    // test
  //  return (<TeamListScreen navigation={navigation} />)

    if (userTeams && userTeams.length > 1) {
      return (<TeamListScreen navigation={navigation} />)
    } else {
      // this.props.setTeamScreenTeam(userTeams[0]._id)
      return (<MyTeamScreen navigation={navigation} />)
    }
  }
}

const mapStateToProps = state => {
  return {
  //  team: state.user.user.teamLeaders,
    userTeams: state.user.user.teamList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTeamScreenTeam: (team) => dispatch(TeamActions.teamMergeState({team}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam)
