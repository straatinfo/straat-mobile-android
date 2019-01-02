import React, { Component } from 'react'
import {
  TouchableOpacity,
  Image
} from 'react-native'
import { Icon, View, Text, Content } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'

import Images from './../../../Themes/Images'
import ReportStyle from './../ReportStyle'
import styles from './Styles/ReportCreateStep1Style'

import { connect } from 'react-redux'
import ReportsActions from './../../../Redux/ReportsRedux'
import { Button } from '../..'

class ReportCreateStep1 extends Component {
  _onSubmit () {
    const { reportDetails } = this.props.reportState;
    this.props.getCategories({ _host: reportDetails._host || '5a844e1bf154bc463543b987', _reportType: '' })
  }
  render () {
    const { reportState: {reportAddress}, design, Lang } = this.props
    return (

      <Content style={ReportStyle.container}>
        <View style={styles.cancelBtnContainer}>
          <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={this.props.onCancel}>
            <Icon name='md-close' style={ReportStyle.iconStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            { Lang.txt_J05 }:
                    </Text>
          <Text style={styles.address}>
            {reportAddress || ' \n'}
          </Text>
          <Button title={Lang.txt_J33.toUpperCase()} design={design} onPress={() => { this.props.onSubmit(); this._onSubmit() }} />
          {/* <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={() => { this.props.onSubmit(); this._onSubmit() }}>
            <LinearGradient style={ReportStyle.roundButton} colors={[design.button2, design.button]}>
              <Text style={styles.buttonText}>{Lang.txt_J33.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
        <Text style={styles.subTitle}>
          {Lang.txt_J32}
        </Text>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    reportState: state.reports,
    design: state.user.design,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    getCategories: (reportsParams) => dispatch(ReportsActions.getCategories(reportsParams))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportCreateStep1)
