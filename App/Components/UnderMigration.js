import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardItem,
  Text,
  Container,
  Header,
  Content,
  Title,
  Button,
  Right,
  Body,
  Icon
} from 'native-base'
import Micon from 'react-native-vector-icons/MaterialIcons'
import Gstyle from './../Components/Styles/GlobalStyle'
import Lang from './../Lib/CutomLanguage'
export default class UnderMigration extends React.Component {
  static defaultProps = { noHeader: false }

  static propTypes = {
    title: PropTypes.string,
    screen: PropTypes.bool,
    noHeader: PropTypes.bool
  }
 
  render () {
    const { title, screen, noHeader } = this.props
    return (
      <Container>
        {
          !noHeader &&
          <Header style={{ height: 40 }}>
            <Body style={{ flex: 3 }}>
              <Title>{ title }</Title>
            </Body>
            <Right>
              { !screen && <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Icon name='ios-menu' />
                </Button>
              }{/*  natatamad pako mag edit nito nak ng teteng */}
              { screen &&
                <Button transparent onPress={() => this.props.navigation.navigate('Login')}>
                  <Icon name='ios-arrow-back' />
                </Button>
              }
            </Right>
          </Header>
        }
        <Content padder>
          <Card style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <CardItem>
              <Micon name='directions' size={150} color={Gstyle.icon.color} align={'center'} />
            </CardItem>
            <CardItem>

              <Text center allowFontScaling={false} style={{textAlign: 'center', height: 50, flex: 1}}>{title && title.toUpperCase()} {Lang.txt_Z01.toUpperCase()}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
