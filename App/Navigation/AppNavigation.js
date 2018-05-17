import { StackNavigator } from 'react-navigation'
import styles from './Styles/NavigationStyles'


// screens identified by the router
import Login from './../Containers/LoginScreen'
// import NavigationDrawer from './NavigationDrawer'

import Splash from './../Containers/SplashScreen'
// import RegistrationForm from './../Containers/RegistrationFormScreen'
import TestOnly from './../Containers/TestOnlyScreen'
import Configuration from './../Config/AppConfig'
import AccessCodeScreen from './../Containers/AccessCodeScreen'

// // team
// import MyTeam from '../Containers/MyTeam';
// import AddTeamScreen from '../Containers/MyTeam/AddTeamScreen'
// import ChangeTeamLogoScreen from '../Containers/MyTeam/ChangeTeamLogoScreen'
// import ChangeTeamProfileScreen from '../Containers/MyTeam/ChangeTeamProfileScreen'
// import TeamListScreen from '../Containers/MyTeam/TeamListScreen'
// import MyTeamScreen from '../Containers/MyTeam/MyTeamScreen'


// import ReportChatScreen from '../Containers/ReportChatScreen'
// import TeamChatScreen from '../Containers/ChatScreen'
// import ChatScreen from '../Containers/ChatScreen'
// import PersonalChatScreen from '../Containers/PersonalChatScreen'
// import ReportSelectTeamScreen from '../Containers/ReportMap/ReportSelectTeamScreen'
// import ReportDetailsScreen from '../Containers/MyReport/ReportDetailsScreen'
// import ForgotPasswordScreen from '../Containers/User/ForgotPasswordScreen';


/**
 *
 * for debugging only
 * set true or false
 *
 */

let defaultRoute

if (Configuration.DEBUG) {
  defaultRoute = {
    initialRouteName: 'TestOnly', // 'TestOnly',
    headerMode: 'none'
  }
} else {
  defaultRoute = {
    initialRouteName: 'TestOnly',
    headerMode: 'none'
  }
}


// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    AccessCodeScreen: { screen: AccessCodeScreen },
    Login: { screen: Login },
    Splash: { screen: Splash },
    // RegistrationForm: { screen: RegistrationForm },
    // NavigationDrawer: { screen: NavigationDrawer },
    // ReportDetails: { screen: ReportDetailsScreen },
    // ReportSelectTeam: { screen: ReportSelectTeamScreen },
    TestOnly: { screen: TestOnly },
    // ForgotPassword: { screen: ForgotPasswordScreen },
    // MyTeam: {
    //   screen: MyTeam,
    // },
    // AddTeam: {
    //   screen: AddTeamScreen,
    // },
    // TeamList: {
    //   screen: TeamListScreen,
    // },
    // ChangeTeamProfile: {
    //   screen: ChangeTeamProfileScreen
    // },
    // ChangeTeamLogo: {
    //   screen: ChangeTeamLogoScreen,
    // },
    // MyTeamScreen: {
    //   screen: MyTeamScreen,
    // },
    // ReportChat: {
    //   screen: ReportChatScreen,
    // },
    // TeamChat: {
    //   screen: TeamChatScreen
    // },
    // Chat: {
    //   screen: ChatScreen
    // },
    // PersonalChat: {
    //   screen: PersonalChatScreen,
    // }
  },
  defaultRoute
, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
