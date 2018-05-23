import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import TabContentTitle from './../Components/TabContentTitle'
import styles from '../steptwo/style'
import Spacer from '../../Spacer'
import Footer from '../../Footer'

class RegistrationStepTwo extends Component {
  render () {
    const { design, Lang } = this.props
    return (
      <View style={styles.container}>
        <TabContentTitle title={Lang.txt_D23} />
        <View style={styles.verticalSpacing} />
        <TouchableOpacity style={styles.buttonContainer} underlayColor='rgba(0,0,0,0.0)' onPress={() => this.props.onVolunteerSubmit(true)}>
          <LinearGradient colors={[design.button2, design.button]} style={styles.linearGradient}>
            <Text style={styles.buttonText}>{Lang.txt_J19}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.verticalSpacing} />
        <TouchableOpacity style={styles.buttonContainer} underlayColor='rgba(0,0,0,0.0)' onPress={() => this.props.onVolunteerSubmit(false)}>
          <LinearGradient colors={[design.button2, design.button]} style={styles.linearGradient}>
            <Text style={styles.buttonText}>{Lang.txt_J20}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.verticalSpacing} />
        <View style={styles.verticalSpacing} />
        <View>
          <Text>
            {Lang.txt_D34}
          </Text>
        </View>
        <Spacer /><Spacer /><Spacer />
        <Spacer />
        <Footer show />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    design: state.user.design,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationStepTwo)
