import React, { Component } from 'react'
import { BackHandler, Image, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, SwipeRow } from 'native-base'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { AlertBox, CircleLoader } from './../../../Components'

import { GetDate, GetTime, GetDateEutype} from './../../../Lib/Helper/TimeUtils'

import { Fonts, Images } from './../../../Themes'
// import style from './style'
import CenterView from './../../../Components/CenterView'
import RowView from './../../../Components/RowView'
import NotificationActions from './../../../Redux/NotificationRedux'
import ImageTumb from './ImageTumb'
import MyReportActions from './../../../Redux/MyReportRedux'
import { cropWH, crop } from '../../../Transforms/Cloudinary'
import Urgency from './Urgency'
import { getStyleStatusInPin } from '../../../Transforms/ReportHelper'
import ReportChatIcon from './ReportChatIcon';
import { getCategoryName, hasCategoryName } from '../../../Transforms/CategoryHelper';
import { Spacer } from '../..';
import * as Animatable from 'react-native-animatable'
import { StatusSource } from '../../../Services/Constant';

const tempUrl = 'https://res.cloudinary.com/hvina6sjo/image/upload/v1519079967/sample/20180216_013543.jpg_Mon%20Feb%2019%202018%2022:39:25%20GMT%2B0000%20%28UTC%29.jpg'

const shadow = {
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 1.0,
  shadowRadius: 2,
  elevation: 2,
  borderRadius: 10
}
const styles = {
  itemContainer: {
    flex: 1,
    marginTop: 0,
    marginLeft: 20,
    marginRight: 0,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    ...shadow
  },
  item: {
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5
  },
  title: {
    color: '#475a77',
    fontSize: 22,
    textAlign: 'left',
    fontWeight: 'bold',
    alignSelf: 'stretch',
    overflow: 'hidden'
  },
  date: {
    color: '#475a77',
    fontSize: 19,
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
    fontWeight: 'bold',
    top: 5
  }
}

class ReportItem extends Component {
  _navigation () {
    const {reportMergeState, notificationOpen, navigation, item, statusSource} = this.props
    navigation.navigate('ReportDetails', {report: item})
    notificationOpen(item, 'REPORT')
    reportMergeState({reportDetails: item, statusSource: statusSource})
  }

  // _removeReport (report) {
  //   const { deleteMyreport, Lang } = this.props
  //   AlertBox.alert(
  //     Lang.confirmation, Lang.txt_J45,
  //     [{text: 'Delete', 
  //       onPress: () => {
  //         deleteMyreport(report._id)
  //       }}, {text: 'Cancel', onPress: () => { }}],
  //     { cancelable: true }
  //   )
  // }

  _renderBody () {
    const { item, Lang, navigation, onRemove } = this.props
    return (          
      <Animatable.View animation="bounceInLeft" easing="ease-out" duration={2000} delay={1000} style={styles.itemContainer} >
        <View style={styles.item}>
          <View style={styles.info}>
            { hasCategoryName(item._mainCategory) ? 
              <Text style={styles.title} >{ getCategoryName(item._mainCategory) }</Text> : <Text style={styles.title} >  </Text>
              }
            {/* <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>{item.location}</Text> */}
            <RowView left><Text style={styles.date}>{ GetDateEutype(item.createdAt) }</Text><Text style={[styles.date, {fontStyle: 'italic'}]}>  { GetTime(item.createdAt) } </Text></RowView>
            <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={() => this._navigation()} ><Text style={[styles.view, {color: getStyleStatusInPin(item.status)}]}>{Lang.checkOutTheReport}</Text></TouchableOpacity>
            <ReportChatIcon report={item} navigation={navigation}/>
          </View>
          { item.hasOwnProperty('attachments') === true && item.attachments.length > 0 && crop(100, item.attachments[0].secure_url) && <FastImage
            source={{uri: cropWH(styles.image.width, styles.image.height, item.attachments[0].secure_url), priority: FastImage.priority.normal}}
            style={styles.image} /> || <Image style = {styles.image} source={Images.empty} />}
          { item.isUrgent === true && <Text style={styles.urgent}>!</Text>}
        </View>
        </Animatable.View>
    )
  }
  render () {
    const { item, Lang, navigation, swiper, onRemove, hidden } = this.props
    if (!swiper) {
      if(hidden === false) {
        return (
          <SwipeRow
            leftOpenValue={100}
            disableLeftSwipe={true}
            disableRightSwipe={true}
            body = {this._renderBody()}
            left={<Spacer />}
          />
        )
      } else {
        return false;
      }
      
    }

    if(hidden === false) {
      return (
        <SwipeRow
          leftOpenValue={100}
          body = {this._renderBody()}
          left={
                  <Button danger onPress={() => onRemove(item)}>
                    <Icon active name="trash" />
                  </Button>
                }
        />
      )
    } else {
      return false;
    }
  }
}

const mapStateToProps = state => {
  return {
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    notificationOpen: (target, type) => dispatch(NotificationActions.notificationOpen({target, type}))
  
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportItem)

 