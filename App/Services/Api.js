import AppConfig from './../Config/AppConfig'
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = AppConfig.ApiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: AppConfig.apiTimeout
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', { q: username })
  const getSomething = () => api.get('.json')

  const postLogin = ({ username, password }) => {
    return api.post('v1/api/auth/login', {
      loginName: username,
      password
    },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }
  /**               REPORTS                */
  const getReportsByNearby = ({ coordinate, user: { token, radius, _id }, host: { language } }) => {
    console.log("getNearby Radius", radius);
    // return api.get('v1/api/report/nearby/' + coordinate.longitude.toString() + '/' + coordinate.latitude.toString() + '/' + user.radius.toString(),
    return api.get('v1/api/report/near/' + coordinate.longitude.toString() + '/' + coordinate.latitude.toString() + '/' + radius.toString(),
      { language: 'nl', _reporter: _id },
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }
  /**               @param {params, user}          */
  const getReportsByReporter = ({ params, user: { _id, token }, host: { language } }) => {
    // return api.get('v1/api/report/reporter/' + _id,
    return api.get('v1/api/report/clean/reporter/' + _id,
    { language: 'nl' },
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }
  /**               @param {params, user}          */
  const getReportById = ({ params, user: { token }, host: { language } }) => {
    const { _id } = params
    return api.get('v1/api/report/' + _id,
      { language: 'nl' },
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const putUnfollowReport = (user, action) => {
    const { token, _id } = user;
    return api.put('v1/api/report/unfollow/'+ action._id, 
      {user_id: _id}, 
      {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
  }
  
  const postReport = ({ reportParams }) => {
    return api.post('v1/api/report/V2',
      reportParams.data,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + reportParams.token
        }
      })
  }
  const postReportTypeC = ({ reportParams }) => {
    return api.post('v1/api/report/V2?type=C',
      reportParams.data,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + reportParams.accessToken
        }
      })
  }

  const putReport = (params) => {
    return api.put('v1/api/report/status/' + params._report + '?language=' + params.user.language,
      params.data,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + params.user.token
        }
      })
  }
  
  const putIsPublic = (params) => {
    return api.put('v1/api/report/isPublic/' + params._report + '?language=' + params.user.language,
      params.data,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + params.user.token
        }
      })
  }

  /**               REPORTS NOTIFICATION                */
  // temp function
  const getReports = ({ coordinate, user }) => {
    return api.get('v1/api/report/near/' + coordinate.longitude.toString() + '/' + coordinate.latitude.toString() + '/' + user.radius.toString(),
      {},
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }
      })
  }

  const getPublicReports = ({ _reportType, user: { _id, token }, host: { language } }) => {
    return api.get('v1/api/report/public',
      {
        _reporter: _id,
        _reportType: _reportType,
        language: 'nl'
      },
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const deleteReport = ({ _report, user: { _id, token }, host: { language } }) => {
    return api.delete('v1/api/report/' + _report,
      {},
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  /**               ACCESS CODE                */
  const postConfirmAccessCode = ({ accessCode }) => {
    return api.post('v1/api/registration/validation/host', {
      code: accessCode
    },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postRequestAccessCode = ({ registrationData }) => {
    /**
     *  registration for access code
     */
    return api.post('v1/api/registration',
      registrationData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postRegisterUser = ({ registrationData }) => {
    console.log("registrationDate", registrationData)
    __DEV__ && console.log('postRegisterUser', registrationData)
    return api.post('v1/api/registration/signupV3',
      registrationData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postValidateUserEmail = ({ userEmail }) => {
    return api.post('v1/api/registration/validation',
      { email: userEmail },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postValidateUserName = ({ userName }) => {
    return api.post('v1/api/registration/validation',
      { username: userName },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postValidatePostalCode = ({ postalCode }) => {
    return api.post('v1/api/registration/validation',
      { postalCode: postalCode },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postValidateHouseNumber = ({ postalCode, houseNumber }) => {
    return api.post('v1/api/registration/validation',
      { postalCode: postalCode,
        houseNumber: houseNumber
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  /**
   * @description fetch coordinate from neo
   * @param { city }
   */
  const postValidateLocate = ({ city, coordinate, isCoor}) => {
    return api.post('v1/api/registration/validation',
      { city, coordinate, isCoor },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  /**
   * @description fetch coordinate from neo
   * @param { city }
   */
  const postValidatePhoneNumber = ({ phoneNumber }) => {
    return api.post('v1/api/registration/validation',
      { phoneNumber },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postValidateTeamName = ({ teamName }) => {
    return api.post('v1/api/registration/validation',
      { teamName: teamName },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postValidateTeamEmail = ({ teamEmail }) => {
    return api.post('v1/api/registration/validation',
      { teamEmail: teamEmail },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postAccessCode = ({ teamName }) => {
    return api.post('v1/api/registration/validation',
      { teamName: teamName },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const getTeamList = ({ filter: queryObject, user }) => {
    /**
     * @param {hostId && isVolunteer }
     * && means optional to right
     */
    console.log('teamFilter', queryObject)
    return api.post('v1/api/team',
      { queryObject },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }
  const postUploadPhoto = ({ data }) => {
    console.log('photo on API', data)
    // return api.post('v1/api/upload/public',
    return api.post('v1/api/upload/photo',
      data,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
  }
  const postProfileUploadPhoto = ({ data }) => {
    console.log('photo on API', data)
    // return api.post('v1/api/upload/public',
    return api.post('v1/api/upload/profile',
      data,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
  }
  const postUploadReportPhotos = ({ data }) => {
    return api.post('v1/api/upload/public',
      data,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
  }

  const getCategories = (reportParams) => {
    // console.log('photo on API', data)
    // un used
    return api.get('v1/api/category/app/mainCategory/withGeneral/hostId/' + reportParams._host,
      {language: 'nl'},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + reportParams.token
        }
      })
  }

  const getCategoriesGeneral = (reportParams) => {
    __DEV__ && console.log('getting general cat: ', reportParams)
    return api.get('v1/api/category/app/mainCategory/general',
      { code: 'ABC', language: 'nl' },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + reportParams.token
        }
      })
  }

  const getCategoriesByHost = (reportParams) => {
    // console.log('photo on API', data)
    return api.get('v1/api/category/mainCategory/hostId/' + reportParams._host,
      {language: 'nl'},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + reportParams.token
        }
      }
    )
  }

  // MY TEAM
  const getTeamProfile = ({ data }) => {
    console.log('team profile', data)
    return api.get('v1/api/team', data,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      })
  }

  //  CONVERSATION

  // not so long
  const getUserTeamList = ({user, target}) => {
    return api.get('v1/api/team/list/' + user._id, {},
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }
      })
  }

  const postPullConversation = ({user: {_id, token}, type, target}) => {
    return api.get('v1/api/conversation',
    {_user: _id, type, target},
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const getMessagesByConvoIdEX = ({user: { _id, token }, target}) => {
    return api.get('v1/api/conversation', {_user: _id, _id: target},
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const getMessagesByConvoId = ({user: { token }, target, keyword, _reporter}) => {
    return api.get('v2/api/message/?_conversation=' + target + '&keyword=' + keyword + '&_reporter=' + _reporter, {},
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const getConversationList = ({user: { _id, token }}) => {
    // return api.get('v2/api/conversation?type=TEAM&_user=' + _id, {},
    // return api.get('v2/api/conversation?type=PRIVATE,GROUP,TEAM&_user=' + user._id,
    return api.get('v2/api/conversation',
      {
        type: 'PRIVATE,GROUP,TEAM',
        _user: _id
      },
      // return api.get('v2/api/conversation?_user=5aab7079ce0881001442296b', {},
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const getConversation = () => {
    return api.get('v1/api/conversation', {},
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postConversation = ({user: { token }, type, param}) => {
    return api.post('v2/api/conversation?type=' + type, param,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const getMessage = (conversationId) => {
    console.log('ConversationId on API: ', conversationId)
    return api.get(`v1/api/message/conversation/${conversationId}`,
      {},
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  const sendMessage = (message) => {
    return api.post('v1/api/message',
      message,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const postForgotPassword = ({ email }) => {
    return api.post('/v1/api/user/password',
      { email },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const putFcmToken = ({user: { _id, token }, fcmToken}) => {
    return api.put('/v1/api/user/fcm',
      { fcmToken, _user: _id },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const putMapRadiusSetting = ({user: {_id, token}}, action) => {
    console.log(_id, token);
    return api.put('/v1/api/user/map-radius-setting/'+_id , 
      {radius: action.radius}, 
      {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })

  }

  const viewedNotified = (user) => {
    return api.put('/v1/api/user/change-notified-view/'+user._id,
    {},
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }
    })
  }

  // TEAM
  // used by teamsagas
  const getUserTeams = ({user: { _id, token }}) => {
    return api.get('v1/api/team/list/' + _id, {},
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const getNonVolTeams = ({user: { _id, token, _host }}) => {
    return api.get('v1/api/team/nonvol/' + _host,
    {},
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  
  // MY TEAM
  const addNewTeam = ({ user: { _id, token, _host }, data, hasPhoto }) => {
    __DEV__ && console.log('adding team', data)
    // return api.post('/v2/api/team/new/' + _id,
    if (hasPhoto) {
      return api.post('v2/api/team/?_user=' + _id + '&_host=' + _host,
      data,
      {
        method: 'POST',
        header: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token
        }
      })
    } else {
      return api.post('v2/api/team/?_user=' + _id + '&_host=' + _host,
      data,
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
    }
  }
  const getTeamDetails = (teamId, { token }) => {
    // console.log('Team ID: ', teamId)
    // return api.get(`v1/api/team/${teamId}`, {},
    return api.get(`v1/api/team/info/${teamId}`, {},
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const getTeamRequest = (teamId, { token }) => {
    return api.get(`v1/api/teamInvite/teamRequests/${teamId}`, {},
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const acceptUserRequest = (params, { token }) => {
    const { _user, _team } = params
    console.log('acceptUserRequest', params)
    return api.get('v1/api/teamInvite/acceptRequest/' + _user + '/' + _team,
    {},
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const declineTeamRequest = (params, { token }) => {
    const { _user, _team } = params
    return api.get('v1/api/teamInvite/declineRequest/' + _user + '/' + _team,
    {},
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const editTeamProfile = ({ params, user: { token }, _team }) => {
    return api.put('v1/api/team/' + _team,
      params,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token
        }
      })
  }
  const postFeedback = (params) => {
    return api.post(`v1/api/feedback/${params.userId}`,
      params.data,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const editUserProfile = ({params, user: {_id, token}}) => {
    return api.put('v1/api/user/profile/' + _id,
      params,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }

  const getUserinfo = ({data, user: {_id, token}}) => {
    const { _user } = data
    return api.get('v1/api/user/profile/' + _user,
      {},
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
  }
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,

    // login
    postLogin,

    // access code api
    postConfirmAccessCode,
    postRequestAccessCode,

    // user
    postForgotPassword,
    postProfileUploadPhoto,
    putFcmToken,
    putMapRadiusSetting,
    viewedNotified,

    // registration API
    postRegisterUser,
    postValidateUserEmail,
    postValidateUserName,
    postValidatePostalCode,
    postValidateHouseNumber,
    postValidatePhoneNumber,
    postValidateLocate,
    postValidateTeamName,
    postValidateTeamEmail,
    getTeamList,
    postUploadPhoto,
    postUploadReportPhotos,

    // report
    getCategories,               // fetch categories
    getCategoriesGeneral,        // fetch categories of freeHost
    getCategoriesByHost,         // fetch categories by his host
    getReportsByReporter,        // fechi reports Reporter
    getReportsByNearby,          // fechi reports nearby
    getReportById,               // fechi report  by report ID
    postReport,                  // creating report
    postReportTypeC,
    putReport,                   // updating report
    deleteReport,
    putUnfollowReport,
    putIsPublic,

    // conversation
    getUserTeamList,
    getConversationList,
    postPullConversation,
    getMessagesByConvoId,
    getConversation,
    postConversation,
    getMessage,
    sendMessage,
    // notification
    getReports,
    getPublicReports,
    // extras
    getSomething,

    // team
    getUserTeams,
    getTeamDetails,
    addNewTeam,
    editTeamProfile,
    acceptUserRequest,
    declineTeamRequest,
    getNonVolTeams,

    // profile
    editUserProfile,
    postFeedback,
    getTeamRequest,
    getUserinfo
  }
}

// google API

const googleAPI = (baseURL = AppConfig.url.GOOGLEAPIS) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getAddressByCoordinate = ({ coordinate }) => {
    console.log('getAddressByCoordinate', coordinate)
    return api.get('maps/api/geocode/json',
      {
        latlng: '' + coordinate.latitude + ',' + coordinate.longitude,
        key: AppConfig.keys.GOOGLE_MAP_KEY
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }

  const getSearchInMap = ({ text, coordinate, radius }) => {
    console.log('getAddressByCoordinate', coordinate)
    return api.get('maps/api/place/textsearch/json',
      {
        location: '' + coordinate.latitude + ',' + coordinate.longitude,
        query: text,
        radius: radius,
        key: AppConfig.keys.GOOGLE_MAP_KEY
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }
 
  return {
    getAddressByCoordinate,
    getSearchInMap
  }
}

// let's return back our create method as the default.
export default {
  create, googleAPI
}
