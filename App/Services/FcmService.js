import { Platform, AsyncStorage, AppState } from 'react-native'

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from 'react-native-fcm'
import { Api } from './'

const userUpdateFcmToken = function (user, token) {
  if (token) {
    if (token !== user.fcmToken) {
      // update to server
      const api = Api.create()
      api.putFcmToken({user, fcmToken: token}).then(d => console.log(d)).catch(e => console.log(e))
    }
  }
  __DEV__ && console.log('userUpdateFcmToken', user, token)
}

const configure = function (navigation, user) {
  FCM.on(FCMEvent.Notification, notif => {
    console.log('Notification', notif)

    if (Platform.OS === 'ios' && notif._notificationType === NotificationType.WillPresent && !notif.local_notification) {
      // this notification is only to decide if you want to show the notification when user if in foreground.
      // usually you can ignore it. just decide to show or not.
      notif.finish(WillPresentNotificationResult.All)
      return
    }

    // if (notif.opened_from_tray) {
    //   if (notif.targetScreen === 'detail') {
    //     setTimeout(() => {
    //       navigation.navigate('Detail')
    //     }, 500)
    //   }
    //   setTimeout(() => {
    //     alert(`User tapped notification\n${JSON.stringify(notif)}`)
    //   }, 500)
    // }

    if (Platform.OS === 'ios') {
            // optional
            // iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
            // This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
            // notif._notificationType is available for iOS platfrom
      switch (notif._notificationType) {
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData) // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break
        case NotificationType.NotificationResponse:
          notif.finish()
          break
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) // other types available: WillPresentNotificationResult.None
                // this type of notificaiton will be called only when you are in foreground.
                // if it is a remote notification, don't do any app logic here. Another notification callback will be triggered with type NotificationType.Remote
          break
      }
    }
  })

  FCM.on(FCMEvent.RefreshToken, token => {
    console.log('TOKEN (refreshUnsubscribe)', {token})
    userUpdateFcmToken(user, token)
  })

  FCM.enableDirectChannel()
  FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
    console.log('direct channel connected' + data)
  })
  setTimeout(function () {
    FCM.isDirectChannelEstablished().then(d => console.log(d))
  }, 1000)

  console.log('FCM: ', FCM)
  // FCM.deleteInstanceId()
}

const start = async function (user) {
  try {
    let result = await FCM.requestPermissions({
      badge: true,
      sound: true,
      alert: true
    })
  } catch (e) {
    console.log(e)
  }

  FCM.getFCMToken().then(token => {
    console.log('TOKEN', {token})
    userUpdateFcmToken(user, token)
  })

  if (Platform.OS === 'ios') {
    FCM.getAPNSToken().then(token => {
      console.log('TOKEN', {token})
      userUpdateFcmToken(user, token)
    })
  }
}

const logout = async function (user) {
  try {
    FCM.deleteInstanceId()
    console.log(FCM)
  } catch (e) {
    console.log(e)
  }
}
export default {
  start,
  configure,
  logout
}
