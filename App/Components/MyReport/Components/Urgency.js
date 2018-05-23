import React, { Component } from 'react'
import { BackHandler, Image, View } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'

// import style from './style'
const style = {
  urgent: {
    fontSize: 100,
    position: 'absolute',
    
  }
}
export default (props) => {
  // const { isUrgent } = props
  return (
    <Text style={style.urgent}>!</Text>
  )
}
