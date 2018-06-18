import React from 'react'
import { Image, TouchableOpacity, Keyboard } from 'react-native'
import { View, Text, Content, Input } from 'native-base'
import { Spacer, RowView, Triangle, ValidationComponent, Button } from './../../Components'
import { Images } from './../../Themes'
import Footer from '../../Components/Footer'
import FastImage from 'react-native-fast-image'
import styles from './../Login/styles'
import DebugConfig from './../../Config/DebugConfig'

/**
 *
 *  from old project
 *
 */
class Login extends ValidationComponent {
  constructor (props) {
    super(props)

    this.state = {
      username: !DebugConfig.debugMode ? '' : 'nonvolunteerleaderstraat@yopmail.com',
      password: !DebugConfig.debugMode ? '' : '12345678A',
     // username: __DEV__ ? 'userOne' : '',
     // password: __DEV__ ? 'test' : '',
      submitStatus: false
    }

  }

  username = {}
  password = {}

  login (params) {
    const { onSubmit, navigation } = this.props
    Keyboard.dismiss()
    // process login
    onSubmit(this.state.username, this.state.password, navigation.state.params)
  }
  _submitFilter () {
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      this.setState({submitStatus: true})
    } else {
      this.setState({submitStatus: false})
    }
  }
  componentDidMount () {
    const {navigation} = this.props
    if (navigation.state.params && navigation.state.params.login && navigation.state.params.login === true) {
       // check if user must auto login
      this.setState({ username: navigation.state.params.username, password: navigation.state.params.password }, this.login)
    }
  }
  render () {
    const { onNewUser, isKeyboardVisible, design, navigation, Lang } = this.props
    const { submitStatus } = this.state
    return (
      <Content>
        <View style={styles.container}>
          <View style={styles.upperboxContainer}>
            {!isKeyboardVisible && <View style={[styles.upperbox]}>
              <View style={styles.logoHolder}>
                { design.secureUrl === '' && <Image source={Images.logo} style={styles.logo} /> }
                { design.secureUrl !== '' && <FastImage source={{uri: design.secureUrl}} style={styles.logo} /> }
              </View>
            </View>}
            <View style={[styles.triangleContainer, {justifyContent: 'space-around'}]}>
              <Triangle width={90} height={30} direction={'down'} color={'white'} />
            </View>
          </View>
          <View style={styles.forms}>
            <Spacer />
            <RowView left >
              <Text style={styles.inLoginTxt}>{Lang.txt_C01c} </Text>
              <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={() => onNewUser()}>
                <Text style={[styles.inLoginTxt, {textDecorationLine: 'underline'}]}>{Lang.txt_C01d}</Text>
              </TouchableOpacity>
            </RowView>
            <View ><Text style={styles.inLoginTxt}>{Lang.txt_C01b}</Text></View>
            <View style={[styles.textInputContainer]}>
              <Input
                ref={i => this.username = i}
                onEndEditing={(e) => this._submitFilter(e.nativeEvent.text)}
                onChangeText={(text) => this.setState({username: text})}
                underlineColorAndroid='transparent'
                multiline={false}
                placeholder={Lang.txt_C02} /> 
            </View>
            <View style={styles.textInputContainer}>
              <Input
                ref={i => this.password = i}
                onEndEditing={(e) => this._submitFilter(e.nativeEvent.text)}
                secureTextEntry
                onChangeText={(text) => this.setState({password: text})}
                underlineColorAndroid='transparent'
                multiline={false}
                placeholder={Lang.txt_C03} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button disabled={!submitStatus} title={Lang.txt_C01.toUpperCase()} design={design} onPress={this.login.bind(this)} />
          </View>
          <View style={styles.spacing} />
          <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword'); Keyboard.dismiss() }}>
            <Text style={{
              fontSize: 20,
              color: '#96acc7',
              justifyContent: 'center',
              marginLeft: 30,
              marginRight: 30,
              textAlign: 'center'
            }}>
              {Lang.txt_C04}
            </Text>
          </TouchableOpacity>
          <View style={styles.spacing} />
          <View style={styles.spacing} />

          <View style={styles.spacing} />
          <View style={styles.spacing} />
        </View>
        <Footer show />
      </Content>
    )
  }
}

export default Login
