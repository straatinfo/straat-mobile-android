import React from 'react'
import { BackHandler } from 'react-native'
import { Container, Header, Title, Button, Left, Body, Icon, Text } from 'native-base'
import { connect } from 'react-redux'

import { pushNotifications } from './../../Services'
import { FixtureApi } from './../../Services/index'
import NotificationActions from './../../Redux/NotificationRedux'
import { SocketTypes } from './../../Services/Constant'

class NotificationTestScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  noti () {
   // pushNotifications.localNotification({title: 'jaylord na pogi', message: 'Notification Message'})

    const { updateByNotification } = this.props
    const data = FixtureApi.geReports().data[0]
    updateByNotification(SocketTypes.RECEIVE_GLOBAL, {data: {TYPE: 'REPORT', content: data}})
  }

  componentDidMount () {
  }

  render () {
    return (
      <Container>
        <Button transparent onPress={() => this.noti()}>
          <Text>NotificationTestScreen</Text>
        </Button>

      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateByNotification: (source, data) => dispatch(NotificationActions.updateByNotification(source, data))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationTestScreen)
