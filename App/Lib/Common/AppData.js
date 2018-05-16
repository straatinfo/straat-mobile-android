import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

const AppData = {

  setUserInfo: function (user) {
    AsyncStorage.setItem('userInfo', JSON.stringify(user))
  },

  setUsername: function (username) {
    AsyncStorage.setItem('username', JSON.stringify(username))
  },

  setPassword: function (password) {
    AsyncStorage.setItem('password', JSON.stringify(password))
  },

  setRadius: function (radius) {
    AsyncStorage.setItem('radius', radius)
  },

  getUserInfo: () => {
    return AsyncStorage.getItem('userInfo')
  },

  getUsername: () => {
    return AsyncStorage.getItem('username')
  },

  getPassword: () => {
    return AsyncStorage.getItem('password')
  },

  reset: () => {
    // or this install of AppData
    AppData.setUserInfo(null)
    AppData.setUsername(null)
    AppData.setPassword(null)
    AppData.setRadius(null)
  }
}

export default AppData
