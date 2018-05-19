import React, { Component } from 'react'
import MyTeamScreen from './MyTeam/MyTeamScreen'
import { connect } from 'react-redux'
import TeamActions from '../Redux/TeamRedux'
import TeamListScreen from './MyTeam/TeamListScreen'

class MyTeam extends Component {
  componentWillMount () {
    const { userTeams, setTeamScreenTeam } = this.props
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

   //
   //  REMOVE NOTE :
   //
  render () {
    const { userTeams, navigation } = this.props
    if (userTeams && userTeams.length > 1) {
      return (<TeamListScreen navigation={navigation} />)
    } else {
      return (<MyTeamScreen navigation={navigation} />)
    }
  }
}

const mapStateToProps = state => {
  return {
    userTeams: state.user.user.teamList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTeamScreenTeam: (team) => dispatch(TeamActions.teamMergeState({team}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam)
