import { put, call, select } from 'redux-saga/effects'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import { showAlertBox, logStore, AppData } from '../Redux/commonRedux'
import { changeto } from '../Redux/ScreenRedux'
import { popUpAlert } from '../Lib/Helper/alertHelper'
import { onloginPopUp, getApprovedTeamList } from '../Transforms/Filters'
import { fail } from 'assert'
import { getUser } from '../Redux/UserRedux'
import { backEndConstEnum } from '../Services/Constant'
import { hasError } from '../Transforms/responseHelper'
import { SocketTypes } from '../Services/Constant'
import TeamActions, { getTeamId, putEditTeamState } from '../Redux/TeamRedux'
import AddNewTeamActions from '../Redux/AddNewTeamRedux'
import TeamListActions from '../Redux/TeamListRedux'
import { getLanguageState } from '../Redux/LanguageRedux'

import { CONNECTION } from '../Services/AppSocket'

export function * getTeamProfile (API, action) {
  try {
    console.log('Fetching team data...', action)
    console.log('Fetching team data API...', API)

    // yield call(loaderHandler.showLoader, Lang.authenticating)

    const teamDataResponse = yield call(API.getTeamDetails, action.teamId)

    if (teamDataResponse.ok && teamDataResponse.data.status === 1) {
      console.log('Fetching success', teamDataResponse.data)

      yield put(TeamActions.getDetailsSuccess(teamDataResponse.data))
    }
  } catch (error) {
    console.log('Fetching data failed', error)
    yield put(TeamActions.getDetailsFailed(error))
  }
}

export function * getTeamDetails (API, action) {
  try {
    yield put(TeamActions.teamMergeState({getTeamInfoFetching: true}))
    const user = yield select(getUser)
    const teamId = yield select(getTeamId)
        // yield call(loaderHandler.showLoader, Lang.authenticating)
    if (!teamId) {
      throw new Error('no team')
    }
    const teamDataResponse = yield call(API.getTeamDetails, teamId, user)
    __DEV__ && console.log('Fetching success teamDataResponse: ', teamDataResponse)
    if (teamDataResponse.ok && teamDataResponse.data.status === 1) {
      __DEV__ && console.log('Fetching success teamDataResponse: ', teamDataResponse)
      yield put(TeamActions.teamMergeState({team: teamDataResponse.data.data}))
      // from old
      yield put(TeamActions.getDetailsSuccess(teamDataResponse.data))
    } else {
      throw new Error(teamDataResponse.data.data.error) // success sending but error on something
    }

   // get team reques  must be removed when backend do the job
    const teamRequestResponse = yield call(API.getTeamRequest, teamId, user)

    if (teamRequestResponse.ok && teamRequestResponse.data.status === 1) {
      __DEV__ && console.log('Fetching success: teamRequestResponse: ', teamRequestResponse.data)
      yield put(TeamActions.teamMergeState({join: teamRequestResponse.data.data}))
    } else {
      throw new Error(teamRequestResponse.data.data.error) // success sending but error on something
    }
  } catch (error) {
    console.log('Fetching data failed', error)
    yield put(TeamActions.getDetailsFailed(error))
  }

  yield put(TeamActions.teamMergeState({getTeamInfoFetching: false}))
}

export const teamAcceptRequest = function * (API, { teamInvite }) {
  console.log('-- accepting request -- ')
  try {
    this.connection = CONNECTION.getConnection(teamInvite._user._id)
    yield put(TeamActions.teamMergeState({getTeamInfoFetching: true}))
    console.log('-- accepting request -- ')
    const {_user: { _id: userId }, _team: {_id: teamId }, _id: teamInviteId } = teamInvite
    const user = yield select(getUser)
    // const teamId = yield select(getTeamId)
    const acceptUserResponse = yield call(API.acceptUserRequest, {_user: userId, _team: teamId}, user)
    __DEV__ && console.log('acceptUserResponse', acceptUserResponse)

    if (acceptUserResponse.ok && acceptUserResponse.data.status === 1) {
      // yield put(TeamListActions.listtarsTeam(teamInvite))
      // yield put(TeamActions.tarsTeam(teamInvite, acceptUserResponse.data.data.teamMembers ))
      yield put(TeamActions.getTeamDetails({}))                         // reset team details
      yield put(TeamListActions.teamlistGetList({}))                    // reset teamList

      this.connection.emit(SocketTypes.APPROVE_MEMBER, {
        data: teamInvite._user
      });

    }
  } catch (error) {
    console.log(error)
    yield put(TeamActions.requestFailed(error))
  }
  yield put(TeamActions.teamMergeState({getTeamInfoFetching: false}))
}

 
export function * teamRejectRequest (API, action) {
  try {
    console.log('-- accepting request -- ')
    const _user = action.user._id
    const user = yield select(getUser)
    const teamId = yield select(getTeamId)
    const rejectUserResponse = yield call(API.declineTeamRequest, {_user, _team: teamId}, user)
    __DEV__ && console.log('rejectUserResponse', rejectUserResponse)

    if (rejectUserResponse.ok && rejectUserResponse.data.status === 1) {
     // yield put(TeamActions.requestSuccess(acceptUserResponse.data))
     // refresh list
      yield put(TeamActions.getTeamDetails({}))                         // reset team details
      yield put(TeamListActions.teamlistGetList({}))                    // reset teamList
    }
  } catch (error) {
    console.log(error)
    yield put(TeamActions.requestFailed(error))
  }
}

export function * addNewTeam (API, action) {
  const Lang = yield select(getLanguageState)
  const { params: { teamLogo, teamName, teamEmail, callBack } } = action
  __DEV__ && console.log('action: ', action)
  const user = yield select(getUser)
  let data = new FormData()
  data.append('photo', {uri: teamLogo.uri, name: teamLogo.fileName, type: teamLogo.type})
  data.append('teamName', teamName)
  data.append('teamEmail', teamEmail)
 // data.append('_host', user._host)
  data.append('isVolunteer', user.isVolunteer)
  data.append('creationMethod', backEndConstEnum.teamCreationMethod)

  try {
    __DEV__ && console.log('Fetching team data...', action)
    __DEV__ && console.log('Fetching team data API...', API)

    yield call(loaderHandler.showLoader, Lang.saving)

    const newTeamResponse = yield call(API.addNewTeam, {data: data, user})

    __DEV__ && console.log('Fetching success', newTeamResponse)
    if (newTeamResponse.ok && newTeamResponse.data.status === 1) {
      __DEV__ && console.log('Fetching success', newTeamResponse)
       // success
      yield call(popUpAlert, { title: '', message: Lang.success, pressok: callBack })
      yield put(TeamListActions.teamlistAddteam(newTeamResponse.data.data))

      yield put(TeamActions.getDetailsSuccess(newTeamResponse))
    } else if (!newTeamResponse && hasError(newTeamResponse.data)) {
      throw new Error(hasError(newTeamResponse.data))
    } else {
      throw new Error(Lang.networkError)
    }
  } catch (error) {
    console.log('Fetching data failed', error)
    yield put(TeamActions.getDetailsFailed(error))
    showAlertBox(error.message)
  }

  yield call(loaderHandler.hideLoader)
}

export function * submiteditTeam (API, action) {
  const Lang = yield select(getLanguageState)
  const { params: { callBack } } = action
  try {
    const user = yield select(getUser)
    const params = yield select(putEditTeamState)
    if (!params) {
      throw new Error('no changes')
    }
    yield call(loaderHandler.showLoader, Lang.saving)

    const editTeamResponse = yield call(API.editTeamProfile, { params: params.data, _team: params._team, user })
    __DEV__ && console.log('Fetching success', editTeamResponse)

    if (editTeamResponse.ok && editTeamResponse.data.status === 1) {
      // yield put(TeamActions.teamMergeState({team: teamDataResponse.data.data}))
      // yield put(TeamActions.getDetailsSuccess(editTeamResponse))
      yield call(popUpAlert, { title: '', message: Lang.success, pressok: callBack })
    //  yield put(TeamActions.teamMergeState({team: editTeamResponse.data.data}))
      yield put(TeamListActions.replaceTeamlist(editTeamResponse.data.data))
      yield put(TeamActions.editTeamSuccess(editTeamResponse.data.data))
      
    } else if (editTeamResponse.status === 400) {
      throw new Error(Lang.invalidCredentials)
    } else {
      throw new Error(Lang.failed)
    }
  } catch (error) {
    console.log('Fetching data failed', error)
    // yield put(TeamActions.editTeamFailure(error))
    showAlertBox(error.message)
  }
  yield call(loaderHandler.hideLoader)
}

export function * getTeamRequest (API, action) {
  try {
    console.log('Fetching request data...', action)
    console.log('Fetching request data API...', API)

        // yield call(loaderHandler.showLoader, Lang.authenticating)

    const teamRequestResponse = yield call(API.getTeamRequest, action.teamId)

    if (teamRequestResponse.ok && teamRequestResponse.data.status === 1) {
      console.log('Fetching success', teamRequestResponse.data)

      yield put(TeamActions.getRequestSuccess(teamRequestResponse.data))
    }
  } catch (error) {
    console.log('Fetching data failed', error)
    yield put(TeamActions.getRequestFailed(error))
  }
}

export function * declineUserRequest (API, action) {
  try {
    console.log('Fetching team data...', action)
    console.log('Fetching team data API...', API)

    // yield call(loaderHandler.showLoader, Lang.authenticating)
    const rejectUserResponse = yield call(API.declineTeamRequest, action.teamId)

    if (rejectUserResponse.ok && rejectUserResponse.data.status === 1) {
      console.log('Fetching success', rejectUserResponse.data)

      yield put(TeamActions.declineSuccess(rejectUserResponse.data))
    }
  } catch (error) {
    console.log('Fetching data failed', error)
    yield put(TeamActions.declineFailed(error))
  }
}

/**
 * validate input Email address of registering user
 * @param (API, { userEmail })
 * it listen to RIGISTER_SET_EMAIL
 *
 */

export function * addNewTeamUpload (API, action) {
  const language = yield select(getLanguageState)
  const { photo } = action
  let data = new FormData()
 // data.append('photo', photo)
  data.append('photo', {uri: photo.uri, name: photo.fileName, type: photo.type})

  __DEV__ && console.log(' photo: ', data)
  yield call(loaderHandler.showLoader, language.uploading + ' ' + language.txt_J16)
  try {
    // show loader

    // fetch from backend
    const result = yield call(API.postUploadPhoto, { data })
    __DEV__ && console.log('upload team photo', result)

    // status success
    if (result.ok && result.data.status === 1) {
      yield put(AddNewTeamActions.addNewTeamMergeState({_profilePic: result.data.data}))
    } else {
      throw new Error(language.uploading + ' ' + language.failed)
    }
    __DEV__ && console.log('success photo', result.data.data)
  } catch (e) {
    __DEV__ && console.log(e)
    showAlertBox(e.message)
  }
  yield call(loaderHandler.hideLoader)
}

// teamList

export function * getUserTeamList (API, action) {
  const user = yield select(getUser)
  yield put(TeamListActions.teamlistMerge({fetching: true}))
  try {
        // yield call(loaderHandler.showLoader, Lang.authenticating)

    const getTeamList = yield call(API.getUserTeams, {user: user})

    if (getTeamList.ok && getTeamList.data.status === 1) {
      console.log('Fetching success', getTeamList)

      yield put(TeamListActions.teamlistMerge({teamList: getTeamList.data.data}))
    }
  } catch (e) {
    console.log('Fetching data failed', e)
    yield put(TeamListActions.teamlistMerge({error: e.message}))
  }
  yield put(TeamListActions.teamlistMerge({fetching: false}))
}
 
// teamList vol only used by report

export function * getNonVolTeamList (API, action) {
  const user = yield select(getUser)
  yield put(TeamListActions.teamlistMerge({fetchingNon: true}))
  try {
        // yield call(loaderHandler.showLoader, Lang.authenticating) 

    const getTeamList = yield call(API.getNonVolTeams, {user: user})
    console.log('Fetching success', getTeamList)

    if (getTeamList.ok && getTeamList.data.status === 1) {

      yield put(TeamListActions.teamlistMerge({teamNonList: getTeamList.data.data}))
    }
  } catch (e) {
    console.log('Fetching data failed', e)
    yield put(TeamListActions.teamlistMerge({error: e.message}))
  }
  yield put(TeamListActions.teamlistMerge({fetchingNon: false}))
}
 