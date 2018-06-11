// How it works
// 1. Create AppSocket.js to establish the connection and retrieve the connection
// 2. In main file, import webSocket.js to establish the connection
// 3. In other component files, import AppSocket.js to retrieve the connection
import SocketIOClient from 'socket.io-client'
import AppConfig from '../Config/AppConfig'
const BASE_URL = AppConfig.ApiUrl

class SocketConnection {
  static mainSocket = null;
  static connectionId = null;
  // constructor (userId) {
  //   if (this.mainSocket) {
  //     return this.mainSocket
  //   }
  //   return this.getConnection(userId)
  // }
  newSocket (userId, token = '') {
    __DEV__ && console.log('AppSocket: Connecting...')
   // this.mainSocket = SocketIOClient(BASE_URL, {transports: ['websocket']})
   // this.mainSocket.emit('register', {_user: userId})
   // this.mainSocket.on('register', (data) => { console.log('AppSocket: Registration successful.: ', data); this.connectionId = data._connection })
   // return this.mainSocket

    this.mainSocket = SocketIOClient(BASE_URL + '?_user=' + userId + '&token=' + token, {transports: ['websocket']})
    __DEV__ && console.log(' this.mainSocket', this.mainSocket)
    return this.mainSocket
  }
  getConnection (userId, token = '') {
    if (this.mainSocket) {
      return this.mainSocket
    } else {
      return this.newSocket(userId, token)
    }
  }
}

export const CONNECTION = new SocketConnection()
