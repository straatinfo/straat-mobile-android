import React from 'react'
import { DrawerNavigator } from 'react-navigation'
import DrawerContent from './../Containers/DrawerContent'
// import styles from './Styles/NavigationStyles'
import ReportMap from './../Containers/ReportMapScreen'
import MyNotification from './../Containers/Notification/NotificationScreen'
import MyTeam from './../Containers/MyTeam'
import MyProfile from './../Containers/Profile/ProfileForm'
import Setting from './../Containers/Settings/SettingForm'
import AboutUs from './../Containers/AboutUs/AboutUs'
import FeedBack from './../Containers/Feedback'
import LogOut from './../Containers/LogOutScreen'
import testOnlyScreen from './../Containers/TestOnlyScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Styles from './../Containers/Styles/DrawerContentStyles.js'
import Lang from './../Lib/CutomLanguage'
import TeamStack from '../Navigation/AppNavigation'
import MyReportScreen from './../Containers/MyReport/MyReportScreen'
import TeamListScreen          from '../Containers/MyTeam/TeamListScreen'
import { Icon as IconBase } from 'native-base'

/** dev only */
let test = {}
if (__DEV__) {
  test = {
    testOnlyScreen: {
      screen: MyProfile,
      drawerLabel: 'testOnlyScreen',
      iconName: 'home',
      iconImage: <Icon name='home' {...Styles.icon} />
    }
  }
}
// test = {}
// const routes here of drawers
export const drawerData = {
  ReportMap: {
    screen: ReportMap,
    drawerLabel: 'txt_E01',
    iconName: 'home',
    iconImage: <Icon name='home' {...Styles.icon} />
  },
  MyReport: {
    screen: MyReportScreen,
    drawerLabel: 'txt_E02', // Lang.myReports,
    iconName: 'notifications', // 'megaphone',
    iconImage: <IconBase name='megaphone' style={Styles.iconStyle} />
  },
  MyNotification: {
    visible: false,
    screen: MyNotification,
    drawerLabel: 'txt_E02',
    iconName: 'notifications',
    iconImage: <Icon name='notifications' {...Styles.icon} />
  },
  // MyTeam: {
  //   screen: MyTeam,
  //   drawerLabel: Lang.txt_E03,
  //   iconName: 'group',
  //   iconImage: <Icon name='group' {...Styles.icon} />
  // },

  TeamList: {
    screen: TeamListScreen,
    drawerLabel: 'txt_E03',
    iconName: 'group',
    iconImage: <Icon name='group' {...Styles.icon} />
  },
  
  MyProfile: {
    screen: MyProfile,
    drawerLabel: 'txt_E04',
    iconName: 'face',
    iconImage: <Icon name='face' {...Styles.icon} />
  },
  Setting: {
    screen: Setting,
    drawerLabel: 'txt_E05',
    iconName: 'settings',
    iconImage: <Icon name='settings' {...Styles.icon} />
  },
  AboutUs: {
    screen: AboutUs,
    drawerLabel: 'txt_E06',
    iconName: 'os-information-circle',
    iconImage: <Icon name='info' {...Styles.icon} />
  },
  FeedBack: {
    screen: FeedBack,
    drawerLabel: 'txt_E07',
    iconName: 'feedback',
    iconImage: <Icon name='feedback' {...Styles.icon} />
  },
  LogOut: {
    screen: LogOut,
    drawerLabel: 'txt_E08',
    iconName: 'logout',
    iconImage: <MaterialCommunityIcons name='logout' {...Styles.icon} />
  },
  ...test
}

const NavigationDrawer = DrawerNavigator(
  drawerData,
  {
    initialRouteName: 'ReportMap',
    initialRouteName: !__DEV__ ? 'ReportMap' : 'ReportMap',
    contentComponent: props => <DrawerContent {...props} itemData={drawerData} />,
    drawerPosition: 'right'
  }
)

export default NavigationDrawer

