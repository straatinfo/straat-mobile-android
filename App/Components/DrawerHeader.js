import React from 'react'
import {
    Header,
    Title,
    Button,
    Right,
    Body,
    Icon
  } from 'native-base'

export default (props) => {
  const { title } = props
  return (
    <Header style={{ height: 40 }}>
      <Body style={{ flex: 3 }}>
        <Title>{ title }</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
          <Icon name='ios-menu' />
        </Button>
      </Right>
    </Header>)
}
