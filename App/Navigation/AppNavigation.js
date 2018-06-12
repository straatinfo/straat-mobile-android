import { StackNavigator }      from 'react-navigation'
import UserInfoScreen          from '../Containers/UserInfoScreen'
import styles                  from './Styles/NavigationStyles'

import AccessCodeScreen        from './../Containers/AccessCodeScreen'
import Configuration           from './../Config/AppConfig'
import ChatScreen              from '../Containers/ChatScreen'
import ForgotPasswordScreen    from '../Containers/User/ForgotPasswordScreen'
import Login                   from './../Containers/LoginScreen'
import Splash                  from './../Containers/SplashScreen'
import RegistrationForm        from './../Containers/RegistrationFormScreen'
import ReportSelectTeamScreen  from '../Containers/ReportMap/ReportSelectTeamScreen'
import ReportDetailsScreen     from '../Containers/MyReport/ReportDetailsScreen'
import TestOnly                from './../Containers/TestOnlyScreen'

import AddTeamScreen           from '../Containers/MyTeam/AddTeamScreen'
import ChangeTeamLogoScreen    from '../Containers/MyTeam/ChangeTeamLogoScreen'
import ChangeTeamProfileScreen from '../Containers/MyTeam/ChangeTeamProfileScreen'
import MyTeam                  from '../Containers/MyTeam'
import MyTeamScreen            from '../Containers/MyTeam/MyTeamScreen'
// import TeamListScreen          from '../Containers/MyTeam/TeamListScreen'

// import ReportChatScreen     from '../Containers/ReportChatScreen'
// import TeamChatScreen       from '../Containers/ChatScreen'
// import PersonalChatScreen   from '../Containers/PersonalChatScreen'
import NavigationDrawer        from './NavigationDrawer'
// import ReportMap2               from './../Containers/ReportMapScreen'

// test
import testAccessCode        from './../Components/AccessCode/RegisterAccessCode'
import NotificationTestScreen        from './../Containers/Notification/NotificationTestScreen'
import ReportMapTestScreen        from './../Containers/Test/ReportMapTest'


/**
 *
 * for debugging only
 * set true or false
 *
 */

const defaultRoute = {
  headerMode: 'none',
  navigationOptions: { headerStyle: styles.header },
  initialRouteName: !Configuration.DEBUG ? 'Splash' : 'ReportMapTest'
}

// Manifest of possible screens 
const PrimaryNav = StackNavigator({
  UserInfoScreen:      { screen: UserInfoScreen },
  AccessCodeScreen:    { screen: AccessCodeScreen },
  ForgotPassword:      { screen: ForgotPasswordScreen },
  Login:               { screen: Login },
  RegistrationForm:    { screen: RegistrationForm },
  ReportDetails:       { screen: ReportDetailsScreen },
  ReportSelectTeam:    { screen: ReportSelectTeamScreen },
  Splash:              { screen: Splash },

  AddTeam:             { screen: AddTeamScreen },
  ChangeTeamProfile:   { screen: ChangeTeamProfileScreen },
  ChangeTeamLogo:      { screen: ChangeTeamLogoScreen },
  MyTeam:              { screen: MyTeam },                   // unused screen
  MyTeamScreen:        { screen: MyTeamScreen },
//    TeamList:            { screen: TeamListScreen },
  Chat:                { screen: ChatScreen },
  NavigationDrawer:    { screen: NavigationDrawer },
  TestOnly:            { screen: TestOnly },
  
  // ReportMap2:          { screen: ReportMap2 },
  
  // ReportChat:          { screen: ReportChatScreen },  // not need now
  // TeamChat:            { screen: TeamChatScreen },    // not need now
  // PersonalChat:        { screen: PersonalChatScreen },// not need now

  testAccessCode:            { screen: testAccessCode },
  NotificationTest:            { screen: NotificationTestScreen },
  ReportMapTest:            { screen: ReportMapTestScreen },
  
  // TeamList:            { screen: TeamListScreen },

  },
  defaultRoute
)

export default PrimaryNav
