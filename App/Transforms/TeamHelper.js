import { isInArray } from "./ArrayHelper";

/**
 *
 * @description if team has logo
 * @param team
 *
*/
export const colorMinus = (team) => {
  return team.logoSecuredUrl ? true : false 
}

/**
 *
 * @description get team logo if has or return false if none
 * @param team
 *
*/
export const getTeamLogo = (team) => {
  if (team.logoSecuredUrl) {
    return team.logoSecuredUrl
  }
  if (team._profilePic && team._profilePic.secure_url) {
    return team._profilePic.secure_url
  }
  return false
}

/**
 *
 * @description get team with isApproved === true
 * @param teams
 *
*/
export const teamGetIsApproved = (teams) => {
  return teams.filter((team) => team.isApproved)
}

/**
 *
 * @description only filter array teams by array _id
 * @param teams
 * @returns array of teams
*/
export const getTeamListBySelectedIdFromTeamList = (listId = [], teams = []) => {
  return teams.filter((team) => isInArray(team._id, listId))
}

/**
 *
 * @description check of user is team leader of this teamlist
 * @param teamLeaders
 * @returns bolean
*/
export const checkLeaderById = (_id = '', teamLeaders = []) => {
  return teamLeaders.filter((team) => {
    if ((team._user) && ((team._user.hasOwnProperty('_id') && team._user._id === _id) || (team._user === _id))) {
      return true
    } else {
      return false
    }
  }).length > 0
}

/**
 *
 * @description check of if active team
 * @param team
 * @returns bolean
*/
export const isActiveTeam = (team) => {
  return team.isApproved ? team.isApproved : false
}
