import React, { Component } from 'react'
import { BackHandler, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, SwipeRow } from 'native-base'
import FastImage from 'react-native-fast-image'

import { GetDate, GetTime } from './../../../Lib/Helper/TimeUtils'
import Lang from './../../../Lib/CutomLanguage'
import { Fonts, Images } from './../../../Themes'
// import style from './style'
import CenterView from './../../../Components/CenterView'
import RowView from './../../../Components/RowView'
import ImageTumb from './ImageTumb'
import { cropWH, crop } from '../../../Transforms/Cloudinary'
import Urgency from './Urgency'
import { getStyleStatusInPin } from '../../../Transforms/ReportHelper'

const tempUrl = 'https://res.cloudinary.com/hvina6sjo/image/upload/v1519079967/sample/20180216_013543.jpg_Mon%20Feb%2019%202018%2022:39:25%20GMT%2B0000%20%28UTC%29.jpg'

const shadow = {
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 1.0,
  shadowRadius: 2,
  elevation: 1,
  borderRadius: 10
}
const styles = {
  item: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    ...shadow
  },
  info: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'stretch',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    color: '#475a77',
    fontSize: 22,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  date: {
    color: '#475a77',
    fontSize: 20
  },
  location: {
    color: '#475a77',
    fontSize: 15
  },
  imageHolder: {
    backgroundColor: 'transparent',
    borderRadius: 10
  },
  view: {
    paddingTop: 10,
    color: '#c6423b',
    fontSize: 20
  },
  image: {
    margin: 5,
    width: 75,
    height: 100,
    borderRadius: 10
  },
  urgent: {
    fontSize: 100,
    color: 'red',
    position: 'absolute',
    right: 5,
    fontWeight: 'bold'

  }
}

class ReportItem extends Component {
  _navigation () {
    const {reportMergeState, navigation, item} = this.props
    navigation.navigate('ReportDetails', {report: item})
    reportMergeState({reportDetails: item})
  }
  render () {
    const { item } = this.props
    return (<View style={styles.item}>
      <View style={styles.info}>
        { item.hasOwnProperty('_mainCategory') === true && item._mainCategory !== null && item._mainCategory.hasOwnProperty('name') === true && (<Text style={styles.title} >{ item._mainCategory.name }</Text>) || (<Text style={styles.title} >  </Text>)}
        {/* <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text> */}
        <Text style={styles.date}>{ GetDate(item.createdAt) } / { GetTime(item.createdAt) } </Text>
        <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={() => this._navigation()} ><Text style={[styles.view, {color: getStyleStatusInPin(item.status)}]}>{Lang.checkOutTheReport}</Text></TouchableOpacity>
      </View>
      { item.hasOwnProperty('attachments') === true && item.attachments.length > 0 && crop(100, item.attachments[0].secure_url) && <FastImage
        source={{uri: cropWH(styles.image.width, styles.image.height, item.attachments[0].secure_url), priority: FastImage.priority.normal}}
        style={styles.image} /> || <Image style = {styles.image} source={Images.empty} />}
      { item.isUrgent === true && <Text style={styles.urgent}>!</Text>}
    </View>)

    // return (
    //   <SwipeRow
    //     leftOpenValue={150}
    //     rightOpenValue={-150}
    //     left={
    //       <Button success onPress={() => alert('Add')}>
    //         <Icon active name='add' />
    //       </Button>
    //       }
    //     body={
    //       <View style={styles.item}>
    //         <View style={styles.info}>
    //           <Text style={styles.title}>{item.title}</Text>
    //           <Text style={styles.date}>{ GetDate(item.createdAt) } / { GetTime(item.createdAt) } </Text>
    //           <Text style={styles.location}>{item.location}</Text>
    //           <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={() => console.log(item)} ><Text style={styles.view}>{Lang.checkOutTheReport}</Text></TouchableOpacity>
    //         </View>
    //         { item.reportPhotos.length > 0 && <FastImage
    //           source={{uri: cropWH(styles.image.width, styles.image.height, item.reportPhotos[0].secure_url), priority: FastImage.priority.normal}}
    //           style={styles.image} />}
    //         { item.isUrgent === true && <Text style={styles.urgent}>!</Text>}
    //       </View>
    //       }
    //     right={
    //       <Button danger onPress={() => alert('Trash')}>
    //         <Icon active name='trash' />
    //       </Button>
    //       } />
    // )
  }
}

export default ReportItem
