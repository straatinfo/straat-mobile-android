import React, { Component } from 'react'
import { BackHandler, Image, View } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'

import { Fonts } from './../../../Themes'
// import style from './style'
import CenterView from './../../../Components/CenterView'
import RowView from './../../../Components/RowView'
import FastImage from 'react-native-fast-image'
import styles from './../../Styles/MyReportComponentStyles'

export default (props) => {
  return (
    <View>
      <FastImage
        source={{uri: props.url, priority: FastImage.priority.normal}}
        style={styles.image} />
    </View>
  )
}
      
      // <CardItem>
      // <Left>
      //   <Thumbnail source={{uri: 'Image URL'}} />
      //   <Body>
      //     <Text>NativeBase</Text>
      //     <Text note>GeekyAnts</Text>
      //   </Body>
      // </Left>
      // </CardItem>
      // <CardItem cardBody>
      // <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
      // </CardItem>
      // <CardItem>
      // <Left>
      //   <Button transparent>
      //     <Icon active name="thumbs-up" />
      //     <Text>12 Likes</Text>
      //   </Button>
      // </Left>
      // <Body>
      //   <Button transparent>
      //     <Icon active name="chatbubbles" />
      //     <Text>4 Comments</Text>
      //   </Button>
      // </Body>
      // <Right>
      //   <Text>11h ago</Text>
      // </Right>
      // </CardItem>
      // <CenterView>
      //   <Text style={TextStyles}>{Lang.txt_B04}</Text>
      //   <Spacer />
      //   <Spacer />
      //   <RowView flexNumber={0}>
      //     <CircleButton styles={{ width: 100 }} text={Lang.txt_Z02} gradient={{start: '#56b574', end: '#3a9958'}} onPress={() => this.props.parentSetState({screen: 'RegisterAccessCode'})} />
      //     <Spacer />
      //     <CircleButton styles={{ width: 100 }} text={Lang.txt_Z03} gradient={{start: '#f95b4f', end: '#f74638'}} onPress={() => BackHandler.exitApp()} />
      //   </RowView>
      //   <Spacer />
      //   <Spacer />
      // </CenterView>
    
