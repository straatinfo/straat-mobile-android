import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Title, Button, Right, Icon, Left } from 'native-base'
import { BackHandler } from 'react-native'
import CenterView from './CenterView'

class HeaderInDrawer extends Component {
  componentDidMount () {
    const { nhBack } = this.props
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (!nhBack) {
        this.props.navigation.goBack()
      } else {
        return false
      }
    })
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render () {
    const { design, title, navigation } = this.props
    return (
      <Header style={{ height: 40, backgroundColor: design.header }}>
        <Left style={{flex: 1}}>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='md-arrow-back' />
          </Button>
        </Left>
        <CenterView style={{ flex: 6 }}>
          <Title>{title}</Title>
        </CenterView>
        <Right style={{flex: 1}}>
          <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
            <Icon name='md-menu' />
          </Button>
        </Right>
      </Header>
    )
  }
}

const mapStateToProps = state => {
  return {
    design: state.user.design
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderInDrawer)
