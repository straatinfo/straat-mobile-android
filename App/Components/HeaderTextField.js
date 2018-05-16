import React, { PropTypes } from 'react'
import { Image, Text, View } from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
  Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, Icon} from 'native-base'
const style = {
  title: {color: 'grey', fontSize: 30, padding: 5}
}
export default (props) => {
  return <View ><Title style={style.title}>{props.title.toUpperCase()}</Title></View>
}
