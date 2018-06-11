import React, { Component } from 'react'
import { ScrollView, Image, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { List, ListItem, Text, View, Content } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import FastImage from 'react-native-fast-image'
import { CONNECTION } from '../Services/AppSocket'
import { SocketTypes, notificationTypes } from '../Services/Constant'
import NotificationActions from './../Redux/NotificationRedux'
import ConversationActions from '../Redux/ConversationRedux'
import MessageActions from './../Redux/MessageRedux'

// tinatamad ako mag saga, dito kona icocode yung mga lintek na socket na yan lintek sila

class DrawerContent extends Component {
  connection = null
  componentDidMount () {
  //   const {_user, token, updateByNotification, messageReceive, convoReceiveMessage, addNotification} = this.props
  //   this.connection = CONNECTION.getConnection(_user, token)
  //   this.connection.on(SocketTypes.RECEIVE_GLOBAL, (data) => updateByNotification(SocketTypes.RECEIVE_GLOBAL, data))
  //   this.connection.on(SocketTypes.RECEIVE_MESSAGE, (data) => {
  //  //   console.log('convoReceiveMessage', data)
  //     // update conversation list
  //     convoReceiveMessage(data)
  //     // update current message screenList
  //     messageReceive(data)
  //     // uopdate notification
  //     if (data.payload.user._id !== _user) {
  //       __DEV__ && console.log('data', data)
  //       addNotification({convo: data.conversation, count: 1})

  //     }
  //   })
  }

  render () {
    const { navigation, itemData, Lang } = this.props
    const items = this.props.items
    const design = this.props.design
    return (

      <View style={[styles.container, {backgroundColor: design.background}]}>
        <View style={styles.logoHolder}>
          { design.secureUrl === '' && <Image source={Images.logo} style={styles.logo} /> }
          { design.secureUrl !== '' && <FastImage source={{uri: design.secureUrl}} style={styles.logo} /> }
        </View>
        <Content>
          <List
            dataArray={items}
            renderRow={(item) => {
              if (itemData[item.routeName].visible === undefined || itemData[item.routeName].visible === true) {
                console.log(item)
                return (
                  <ListItem style={styles.listItem} onPress={() => navigation.navigate(item.routeName)}>
                    { itemData[item.routeName].iconImage }
                    <Text style={styles.item}>{ Lang[itemData[item.key].drawerLabel] ? Lang[itemData[item.key].drawerLabel].toUpperCase() : ' ' } </Text>
                  </ListItem>
                )
              }
              return null
            }}
          />
        </Content>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    design: state.user.design,
    _user: state.user.user._id,
    token: state.user.user.token,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateByNotification: (source, data) => dispatch(NotificationActions.updateByNotification(source, data)),

    messageReceive: (params) => dispatch(MessageActions.messageReceive(params)),
    convoReceiveMessage: (param) => dispatch(ConversationActions.convoReceiveMessage(param)),
    addNotification: (param) => dispatch(NotificationActions.addNotification(param))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
