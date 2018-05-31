import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CircleLoader } from '../Components'
import { crop } from '../Transforms/Cloudinary'
import { Images } from '../Themes'
import { getTeamLogo } from '../Transforms/TeamHelper'
import { ScrollView, View, Image } from 'react-native'
import { Text, Container, Content, Item, Input } from 'native-base'
import UserinfoActions from './../Redux/UserinfoRedux'
import HeaderInDrawer from '../Components/HeaderInDrawer'
import styles from './Styles/UserInfoScreenStyle'

class UserInfoScreen extends Component {
  componentDidMount () {
    const { fetchData, navigation } = this.props
      // fetchData(user._id)
    const { user } = navigation.state.params
    if (user && user._id) {
      fetchData({_user: user._id})
    }
  }

  getValue (index) {
    const { info } = this.props
    if (!info) {
      return ''
    }
    if (info[index]) {
      return info[index]
    }
    return ''
  }

  render () {
    const { navigation, info, Lang, fetching } = this.props
    const logo = getTeamLogo(info)
    const getValue = this.getValue.bind(this)

    if (fetching) {
      return (<CircleLoader color='blue' />)
    }

    return (
      <Container>
        <HeaderInDrawer title={Lang.txt_E04} navigation={navigation} />
        <View style={{ flex: 1 }}>
          <ScrollView bounce={false}>
            <Content >
              <View style={styles.viewheader}>
                {logo ? <Image source={{uri: crop(200, logo)}} style={styles.profileroundimage} /> : <Image source={Images.empty} style={styles.profileroundimage} />}
              </View>
              <View style={styles.viewheader1}>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_D09}</Text>
                <Item>
                  <Input

                    style={{color: '#3e3f42'}}
                    value={getValue('fname')}
                                />
                </Item>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_D10}</Text>
                <Item >
                  <Input

                    style={{color: '#3e3f42'}}
                    value={getValue('lname')}
                                />
                </Item>
              </View>
              <View style={styles.viewheader1}>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_P02}</Text>
                <Item >
                  <Input
                    keyboardType='numeric'
                    style={{color: '#3e3f42'}}
                    value={getValue('houseNumber')}
                                />
                </Item>
                <Item >
                  <Input

                    style={{color: '#3e3f42'}}
                    value={getValue('streetName')} />
                </Item>
                <Item >
                  <Input

                    style={{color: '#3e3f42'}}
                    value={getValue('postalCode')} />
                </Item>
                <Item >
                  <Input

                    style={{color: '#3e3f42'}}
                    value={getValue('city')} />
                </Item>
              </View>
              <View style={styles.viewheader1}>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_P03}</Text>
                <Item>
                  <Input
                    style={{color: '#3e3f42'}}
                    value={getValue('email')} />
                </Item>
                <Item >
                  <Input

                    style={{color: '#3e3f42'}}
                    value={getValue('phoneNumber')} />
                </Item>
              </View>
              <View style={styles.viewheader1}>
                <Text style={styles.inProfileTxtheader}>{Lang.txt_P04}</Text>
                <Item disabled>
                  <Input

                    style={{color: '#3e3f42'}}
                    value={getValue('username')} />
                </Item>
              </View>

              {/* <View style={styles.buttonview}>
                <TouchableOpacity onPress={() => this._updateProfileDetails()}>
                  <LinearGradient colors={['#ffffff', '#ffffff']}style={styles.lgstyle} >
                    <Text style={styles.buttontext}>{Lang.txt_P06.toUpperCase()}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View> */}
            </Content>
          </ScrollView>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.userinfo.fetching,
    info: state.userinfo.payload,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (data) => dispatch(UserinfoActions.userinfoRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoScreen)
