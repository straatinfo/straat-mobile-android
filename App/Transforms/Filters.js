import Lang from './../Lib/CutomLanguage'
const messageLoginPopup = (access, message) => {
  return { access, message }
}

export const onloginPopUp = ({ userData }) => {
  // user in isVoluteer can access even not in  any team
  // while user in non Volunteer can't access when admin of team or created team not approved
  if (userData.isVolunteer === true) {
    // volunteer here
    if (userData.teamLeaders.length > 0 || userData.teamMembers.length > 0 || (userData.teams && userData.teams.length > 0)) {
      return messageLoginPopup(true, null)
    } else {
      return messageLoginPopup(true, Lang.txt_C06)
    }
  } else {
    // not volunteer here
    if ((userData.teamLeaders.length > 0 && getApprovedTeamMulti(userData.teamLeaders).length > 0) || (userData.teamMembers.length > 0 && getApprovedTeamMulti(userData.teamMembers).length > 0) || (userData.teams && userData.teams.length > 0 && getApprovedTeam(userData.teams).length > 0)) {
      // console.log('getApprovedTeam(userData.teamLeaders))', getApprovedTeam(userData.teamLeaders))
      if (userData.setting.isNotified) {
        return messageLoginPopup(true, Lang.txt_C09)  
      }

      return messageLoginPopup(true, null)
    } else {
      // check if user has just join and created a team if so then block him else that means he join a team but its pending
      __DEV__ && console.log('userData.teamLeaders', userData.teamLeaders)
      __DEV__ && console.log('getApprovedTeamMulti(userData.teamLeaders, true)', getApprovedTeamMulti(userData.teamLeaders, true))
      if (userData.teamLeaders.length > 0 && getApprovedTeamMulti(userData.teamLeaders, false).length > 0 && !userData.setting.isNotified) {
        return messageLoginPopup(false, Lang.txt_D46)
      } else if (userData.setting.isNotified) {
        return messageLoginPopup(true, Lang.txt_C09)
      } else {
        return messageLoginPopup(true, Lang.txt_C06)
      }
    }
  }
}

export const getApprovedTeamMulti = (teams, approved = true) => {
  /**
   * @param teams, multi means team that came from multi dimensional relationship
   */
  // console.log('teams', teams)
  return teams !== undefined && teams.length > 0 ? teams.filter((team) => team._team.isApproved === approved).map((team) => team._team) : []
}

export const getApprovedTeam = (teams, not = false) => {
  /**
   * @param teams, not ( not if you want to collect only not approved then set this to false)
   */
  // console.log('teams', teams)
  return teams !== undefined && teams.length > 0 ? teams.filter((team) => team.isApproved) : []
}

/** get approved teams */
export const getApprovedTeamList = (user) => {
  return [...getApprovedTeamMulti(user.teamMembers), ...getApprovedTeam(user.teams)]
}

/**
 * @description check if object is empty
 * @param
*/
export const isEmpty = (obj) => {
  if (typeof (obj) !== 'object') {
    if (obj) {
      return false
    }
    return true
  }

  for (let x in obj) {
    return false
  }

  return true
}
