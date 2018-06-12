import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { ScreenTypes } from '../Redux/ScreenRedux'
import { CurrentUserTypes } from './../Redux/UserRedux'
import { AccessCodeTypes } from './../Redux/AccessCodeRedux'
import { ReportsTypes } from './../Redux/ReportsRedux'
import { ConversationTypes } from './../Redux/ConversationRedux'
import { MessageTypes } from './../Redux/MessageRedux'
import { MyReportTypes } from './../Redux/MyReportRedux'
import { NotificationTypes } from './../Redux/NotificationRedux'
import { TeamTypes } from '../Redux/TeamRedux'
import { FeedbackTypes } from '../Redux/FeedbackRedux'
import { ProfileTypes } from '../Redux/ProfileRedux'
import { UserinfoTypes } from '../Redux/UserinfoRedux'
import { AddNewTeamTypes } from '../Redux/AddNewTeamRedux'

/* ------------- Sagas ------------- */

import { startup, configureApp } from './StartupSagas'
import { login, appStart } from './LoginSagas'
import { getUserAvatar } from './GithubSagas'
import { change } from './ScreenSagas'
import { confirmAccessCode, registerAccessCode } from './AccessCodeSagas'
import { registerUser, validateEmail, validateUserName, validatePostalCode, validatePhoneNumber, validateTeamName, validateTeamEmail, getTeamlist, uploadTeamPhoto, requestPassword, validateCity, validateHousenumber } from './UserSagas'
import { getNearbyReports, getReportAddress, uploadPhoto, getCategories, submitReport, changeStatus } from './ReportsSaga'
import { fetchConversation, createConversation, getConversationList } from './ConversationSaga'
import { fetchMessage, sendMessage, getMessagesByConvoId, postConvo } from './MessageSaga'
import { myReportRequest, myReportDetailRequest, myReportDeleteRequest } from './MyReportSagas'
import { notifactionRequestTypeA, notifactionRequestTypeB, notifactionRequestTypeC, updateByNotification } from './NotificationSaga'
import { sendFeedback } from './FeedbackSaga'
import { getTeamProfile, getTeamRequest, getTeamDetails, teamAcceptRequest, teamRejectRequest, addNewTeam, addNewTeamUpload, getUserTeamList, submiteditTeam } from './TeamSagas'
import { editUserProfile, uploadUserPhoto, validateUserNameProfile, validateEmailProfile, validatePhoneNumberProfile, validateCityProfile, validatePostalCodeProfile } from './ProfileSaga'
import { TeamListTypes } from '../Redux/TeamListRedux'
import { getUserinfo } from './UserinfoSagas';
import { ReportmapsearchTypes } from '../Redux/ReportmapsearchRedux';
import { getReportmapsearch } from './ReportmapsearchSagas';
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
const googleAPI = DebugConfig.useFixtures ? FixtureAPI : API.googleAPI()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([

    /**             START             */
    takeLatest(LoginTypes.APP_START, appStart, api),

    /**             LOGIN             */
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(StartupTypes.CONFIGURE_APP, configureApp),
    takeLatest(ScreenTypes.CHANGE, change),

    /**              USER              */
    takeLatest(CurrentUserTypes.FORGOT_PASSWORD_REQUEST, requestPassword, api),

    /**          ACCESS CODE           */
    takeLatest(CurrentUserTypes.SET_ACCESS_CODE, confirmAccessCode, api),
    takeLatest(AccessCodeTypes.CODE_REQUEST, registerAccessCode, api),

    /**          REGISTRATION          */
    takeLatest(CurrentUserTypes.REGISTER_REQUEST, registerUser, api),
    takeLatest(CurrentUserTypes.REGISTER_SET_USERNAME, validateUserName, api),
    takeLatest(CurrentUserTypes.REGISTER_SET_EMAIL, validateEmail, api),
    takeLatest(CurrentUserTypes.REGISTER_SET_POSTALCODE, validatePostalCode, api),
    takeLatest(CurrentUserTypes.REGISTER_SET_HOUSE_NUMBER, validateHousenumber, api),

    
    takeLatest(CurrentUserTypes.REGISTER_SET_CITY, validateCity, api),
    takeLatest(CurrentUserTypes.REGISTER_SET_PHONENUMBER, validatePhoneNumber, api),
    takeLatest(CurrentUserTypes.REGISTER_SET_TEAMNAME, validateTeamName, api),
    takeLatest(CurrentUserTypes.REGISTER_SET_TEAMEMAIL, validateTeamEmail, api),
    takeLatest(CurrentUserTypes.GET_TEAMLIST, getTeamlist, api),
    takeLatest(CurrentUserTypes.SET_TEAM_PHOTO, uploadTeamPhoto, api),

    /**          REPORTS          */
    takeLatest(ReportsTypes.GET_REPORTS_NEARBY_REQUEST, getNearbyReports, api),
    takeLatest(ReportsTypes.UPLOAD_PHOTO, uploadPhoto, api),
    takeLatest(ReportsTypes.GET_CATEGORIES, getCategories, api),
    takeLatest(ReportsTypes.REPORT_SUBMIT, submitReport, api),
    takeLatest(ReportsTypes.REPORT_CHANGE_STATUS, changeStatus, api),

    takeLatest(ReportsTypes.SET_REPORT_ADDRESS_BY_COORDINATE, getReportAddress, googleAPI),

    /**         TEAM           */

    takeLatest(TeamListTypes.TEAMLIST_GET_LIST, getUserTeamList, api),
    takeLatest(TeamTypes.GET_TEAM_DETAILS, getTeamDetails, api),
    takeLatest(TeamTypes.GET_TEAM_REQUEST, getTeamRequest, api),
    takeLatest(TeamTypes.TEAM_ACCEPT_REQUEST, teamAcceptRequest, api),
    takeLatest(TeamTypes.TEAM_REJECT_REQUEST, teamRejectRequest, api),
    takeLatest(TeamTypes.ADD_NEW_TEAM, addNewTeam, api),

    takeLatest(AddNewTeamTypes.UPLOAD_ADD_NEW_TEAM, addNewTeamUpload, api),
    takeLatest(TeamTypes.SUBMITEDIT_TEAM, submiteditTeam, api),

    /**          CONVERSATIONS          */
//    takeLatest(ConversationTypes.FETCH_CONVERSATION_REQUEST, fetchConversation, api),
//    takeLatest(ConversationTypes.CREATE_CONVERSATION, createConversation, api),
//    takeLatest(MessageTypes.FETCH_MESSAGE_REQUEST, fetchMessage, api),
//    takeLatest(MessageTypes.SEND_MESSAGE_REQUEST, sendMessage, api),
    takeLatest(MessageTypes.GET_MESSAGES_BY_CONVO_ID, getMessagesByConvoId, api),
    takeLatest(MessageTypes.CREATE_POST_CONVO, postConvo, api),
    takeLatest(ConversationTypes.GET_CONVERSATION_LIST, getConversationList, api),

    /**          MY REPORT             */
    takeLatest(MyReportTypes.MY_REPORT_REQUEST, myReportRequest, api),
    takeLatest(MyReportTypes.MY_REPORT_DETAIL_REQUEST, myReportDetailRequest, api),
    takeLatest(MyReportTypes.DELETE_MYREPORT, myReportDeleteRequest, api),

    /**          NOTIFICATION          */
    takeLatest(NotificationTypes.NOTIFICATION_REQUEST_TYPE_A, notifactionRequestTypeA, api),
    takeLatest(NotificationTypes.NOTIFICATION_REQUEST_TYPE_B, notifactionRequestTypeB, api),
    takeLatest(NotificationTypes.NOTIFICATION_REQUEST_TYPE_C, notifactionRequestTypeC, api),
    takeLatest(NotificationTypes.UPDATE_BY_NOTIFICATION, updateByNotification, api),

    takeLatest(FeedbackTypes.SEND_FEEDBACK_REQUEST, sendFeedback, api),
     /**         PROFLE                */
    takeLatest(ProfileTypes.SUBMIT_EDITPROFILE, editUserProfile, api),
    takeLatest(ProfileTypes.SETCITY_PROFILE, validateCityProfile, api),
    takeLatest(ProfileTypes.SETEMAIL_PROFILE, validateEmailProfile, api),
    takeLatest(ProfileTypes.SETPHONENUMBER_PROFILE, validatePhoneNumberProfile, api),
    takeLatest(ProfileTypes.SETPOSTALCODE_PROFILE, validatePostalCodeProfile, api),

    takeLatest(ProfileTypes.SETUSERNAME_PROFILE, validateUserNameProfile, api),

    takeLatest(ProfileTypes.UPLOAD_EDITPROFILE, uploadUserPhoto, api),

    // SEACH IN MAP
    takeLatest(ReportmapsearchTypes.REPORTMAPSEARCH_REQUEST, getReportmapsearch, api, googleAPI),

    
    // USER INFO PROFILE

    takeLatest(UserinfoTypes.USERINFO_REQUEST, getUserinfo, api),
    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
