import { AsyncStorage, BackHandler } from 'react-native'
import AlertBox from './../Components/AlertBox'
import language from '../Lib/CutomLanguage'
import { Design } from '../Services/Constant';

// import Lang from './../Lib/CutomLanguage'
// import { store } from './../Containers/App'

export const showAlertBox = (message, onPress = () => {}) => {
  AlertBox.alert(
        language.error,
        message, [{text: 'OK', onPress: () => onPress()}],
        { cancelable: false }
    )
}
export const showAlertBoxWithTitle = (title, message, onPress = () => {}) => {
  AlertBox.alert(
        title,
        message, [{text: 'OK', onPress: () => onPress()}],
        { cancelable: false }
    )
}

export const showSuccesstBox = (message, action = '') => {
  let pressOkAction = () => {}
  if (action === 'appClosed') {
    pressOkAction = BackHandler.exitApp
  }
  AlertBox.alert(
       language.success,
        message, [{text: 'OK', onPress: () => pressOkAction()}],
        { cancelable: false }
    )
}

export const showSuccessBox = (message, action = () => {}) => {
  AlertBox.alert(
       language.success,
        message, [{text: 'OK', onPress: () => action()}],
        { cancelable: false }
  )
}

export const logStore = () => {
  // accessing global state
  // console.log(store)
}

export const AppData = {

  setUserInfo: (user) => {
    AsyncStorage.setItem('userInfo', JSON.stringify(user))
  },

  setLogin: (user) => {
    AsyncStorage.setItem('login', JSON.stringify(user))
  },

  setUsername: (username) => {
    AsyncStorage.setItem('username', JSON.stringify(username))
  },

  setPassword: (password) => {
    AsyncStorage.setItem('password', JSON.stringify(password))
  },

  setRadius: (radius) => {
    AsyncStorage.setItem('radius', radius)
  },

  setTheme: (_activeDesign) => {
    AsyncStorage.setItem('theme', JSON.stringify(_activeDesign))
  },

  getUserInfo: () => AsyncStorage.getItem('userInfo'),

  getLogin: () => AsyncStorage.getItem('login'),

  getUsername: () => AsyncStorage.getItem('username'),

  getPassword: () => AsyncStorage.getItem('password'),

  getTheme: () => AsyncStorage.getItem('theme'),

  reset: () => {
    AsyncStorage.multiRemove(['userInfo', 'username', 'password', 'login'])
  },
  clear: () => {
    AsyncStorage.multiRemove(['theme'])
  }
}

/**
 * @description set desing
 * @param _activeDesign
 *
 */

export const setStart = () => {
  global.appSetting = Design
}
