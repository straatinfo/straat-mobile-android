import React, { Component } from 'react'
import { View, StatusBar, Text } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import BusyIndicator from 'react-native-busy-indicator'

import { Root } from 'native-base'

// Styles
import styles from './Styles/RootContainerStyles'

// import Language from '../Redux/LanguageRedux'
import renderIf from 'render-if'

class RootContainer extends Component {

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    this.props.configureApp()
  }

  render () {
    const { loadedLaguage } = this.props
    return (
      <Root style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        {renderIf(loadedLaguage)(<ReduxNavigation />)}
        {renderIf(!loadedLaguage)(<Text>Loading</Text>)}
        <BusyIndicator />
      </Root>
    )
  }
}

const mapStateToProps = state => {
  return {
    loadedLaguage: state.language.loadedLaguage
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  configureApp: () => dispatch(StartupActions.configureApp())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
