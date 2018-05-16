import React from 'react'
import { connect } from 'react-redux'
import { Image, BackHandler, Picker } from 'react-native'
import {
	Card,
	CardItem,
	Text,
	View,
	Thumbnail,
	Container,
	Header,
	Content,
	Title,
	Button,
	Left,
	Right,
	Body,
  Icon,
  Item,
  Input,
  H1,
  H3
} from 'native-base'
import HeaderInDrawer from './HeaderInDrawer'
import { CONNECTION } from '../Services/AppSocket'
// import Icon from 'react-native-vector-icons/Ionicons'

import io from 'socket.io-client'
import Spacer from './Spacer'
import { SocketTypes, ReportTypes } from '../Services/Constant'

const TYPEOPTIONS = [ReportTypes.SAFETY, ReportTypes.PUBLIC_SPACE, ReportTypes.COMMUNICATION]

class TestWebSocket extends React.Component {
  state = {
    list: [{text: 'sample test'}],
    isConnected: false,
    item: '',
    info: '',
    sID: 0,
    sC: {}
  }

  connection = {connected: false}

  componentDidMount () {
    const { user: { _id}} = this.props
    this.connection = CONNECTION.getConnection(_id)
  //  this.connection.getConnection()
    // this.connection.on('receive-global-msg', (data) => {
    //   this.addData(data)
    //   console.log('receive-global-msg', data)
    // })
    this.connection.on('send-global-msg', (data) => {
      console.log('send-global-msg', data)
      this.setState({info: data})
    })
  }

  _connected () {
    return (<CardItem>
      <Button transparent>
        <Text style={{color: 'green'}} >CONNECTED</Text>
      </Button>
    </CardItem>)
  }

  _disConnected () {
    return (<CardItem>
      <Button transparent>
        <Text style={{color: 'red'}} >DISCONNECTED</Text>
      </Button>
    </CardItem>)
  }
  addData (data) {
    this.setState({list: [...this.state.list, data]})
  }
  _renderList (title, Item, count) {
    return (
      <Card>
        <CardItem><Body><H3>{title.toUpperCase()}</H3></Body><Right><H3>{count.toString()}</H3></Right></CardItem>
        {Item.map((text, i) => <CardItem key={i} ><Text>{JSON.stringify(text)}</Text></CardItem>)}
      </Card >)
  }

  _send () {
    const { user } = this.props
    console.log('sending :', this.state.item)
    const data = {
      desicription: this.state.item,
      createdAt: '2018-03-26T00:15:11.657Z',
      _id: '5a914fb1ecea3b0014eabe0TT',
      status: 'NEW',
      isUrgent: true,
      _reportType: TYPEOPTIONS[this.state.sID],
      _reporter: {_id: user._id}

    }
    this.connection.emit('send-global-msg', {
      TYPE: SocketTypes.REPORT,
      content: data})
    this.setState({item: ''})
   // this.setState({list: [...this.state.list, this.state.item]})
  }
  _textOnChange (text) {

  }

  render () {
    const { navigation, notification: {dataReceive, typeCount_A} } = this.props
    const { list } = this.state
    console.log('otification.typeCount_A', typeCount_A)
    return (
      <Container>
        <HeaderInDrawer title='test Web Socket' navigation={navigation} />
        <Content padder>
          {/* { this.connection.connected
            ? this._connected() : this._disConnected()
          } */}
          {this._renderList('receive-global-msg', dataReceive, typeCount_A)}

          <Card >
            <CardItem>
              <Item success>
                <Input onEndEditing={(e) => { this.setState({item: e.nativeEvent.text}, console.log(e.nativeEvent)) }} placeholder='Textbox with Success Input' />
                <Icon name='checkmark-circle' />
              </Item>
            </CardItem>
            <CardItem>
              <View style={{width: '80%'}}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={this.state.sC}
                  onValueChange={(itemValue, itemIndex) => { this.setState({sC: itemValue, sID: itemIndex}) }}>
                  {/** __DEV__ && <Picker.Item value={'devId'} label={'devName'} key={'devkey'} /> */}
                  {TYPEOPTIONS.map((l, i) => <Picker.Item value={l._id} label={l.name ? l.name : ' '} key={l._id} />)}
                </Picker>
              </View>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text note>{JSON.stringify(this.state.info)}</Text>
            </CardItem>
          </Card>

          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Card>
            <Button dark full onPress={this._send.bind(this)}><Text> send </Text></Button>
          </Card>
          <Spacer />

        </Content>
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(TestWebSocket)
