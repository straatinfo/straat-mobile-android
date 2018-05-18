import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, Container, Content } from 'native-base'
import Lang from '../../Lib/CutomLanguage'
import HeaderInDrawer from '../../Components/HeaderInDrawer'
import Styles from './Styles'

export default class AboutUs extends Component {
  render () {
    const { title, navigation } = this.props
    return (
      <Container>
        <HeaderInDrawer title={title} navigation={navigation} />
        <Content>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center'
          }}
            >
            <Text style={{ paddingLeft: 55, paddingRight: 35, marginTop: 35, fontSize: 18 }}>{Lang.txt_Z11}</Text>

            <Text style={{ paddingLeft: 55, paddingRight: 55, marginTop: 10, fontSize: 18 }}>{Lang.txt_Z12}</Text>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center'
            }}
           >
              <View style={Styles.spacing} />
              <View style={Styles.spacing} />
              <Button block style={{ backgroundColor: 'transparent', borderColor: 'gray', borderRadius: 10, paddingLeft: 55, paddingRight: 55, marginTop: 35 }}
                onPress={() => this.props.navigation.navigate('FeedBack')}>
                <Text>{Lang.txt_Z13}</Text>
              </Button>
              <View style={Styles.spacing} />
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
