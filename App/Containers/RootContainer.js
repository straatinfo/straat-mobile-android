import React, { Component } from 'react'
import { View, StatusBar, Text } from 'react-native'
import { Root, StyleProvider } from 'native-base'
import { connect } from 'react-redux'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import BusyIndicator from 'react-native-busy-indicator'

import renderIf from 'render-if'

// Styles
import styles from './Styles/RootContainerStyles'
import getTheme from './../Themes/native-base-theme/components'
import material from './../Themes/native-base-theme/variables/material'
import PrivateComponent from '../Components/PrivateComponent'
// import Language from '../Redux/LanguageRedux'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    this.props.configureApp()
  }

  render () {
    const { loadedLaguage, isLogged } = this.props
    return (
      <Root style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        {renderIf(loadedLaguage)(<StyleProvider style={getTheme(material)}><ReduxNavigation /></StyleProvider>)}
        {renderIf(isLogged)(<PrivateComponent />)}
        {renderIf(!loadedLaguage)(<Text />)}
        <BusyIndicator />
      </Root>
    )
  }
}

const mapStateToProps = state => {
  return {
    loadedLaguage: state.language.loadedLaguage,
    isLogged: state.user.isLogged
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  configureApp: () => dispatch(StartupActions.configureApp())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
