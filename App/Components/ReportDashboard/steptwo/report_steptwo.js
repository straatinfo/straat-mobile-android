import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import { Icon } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
// import Icon from 'react-native-vector-icons/MaterialIcons'

import Images from './../../../Themes/Images'
import styles from '../steptwo/style'
import ReportStyle from './../ReportStyle'

import { ReportTypes } from './../../../Services/Constant'
import { connect } from 'react-redux'
import ReportsActions, { resetForm } from './../../../Redux/ReportsRedux'
import RowView from '../../RowView'
import ReportTypeButton from './../Components/ReportTypeButton'
import { popUpAlertV2 } from '../../../Lib/Helper/alertHelper'

class ReportStepTwo extends Component {
  /**
   *
   * @description display function of button
   *              on spec
   *
   */

  _onHelp (title, message) {
    popUpAlertV2(title, message)
  }

  /**
   * @description set main category list base on selected report type
   * @param ReportType
   *
   */
  _onChangeReportType (reportType) {
    const { onSubmit } = this.props
    const { reportState: { reportCategoryList }, reportMergeState } = this.props
    __DEV__ && console.log('reportCategoryList', reportCategoryList)
    reportMergeState({
      ...resetForm,
      ...{
        reportType: reportType,
        reportMainCategoryList: reportCategoryList.filter((item) => item._reportType.code === reportType.code)
      }})
    onSubmit(reportType)
  }
  render () {
    const { isVolunteer } = this.props.user
    const { design, Lang } = this.props
    return (
      <View style={ReportStyle.container}>
        <View style={ReportStyle.cancelBtnContainer}>
          <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={this.props.onCancel}>
            <View style={{ flexDirection: 'row', width: 150}}>
              <Icon name='md-arrow-back' style={ReportStyle.iconStyle} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={this.props.onCancel}>
            <Icon name='md-close' style={ReportStyle.iconStyle} />
          </TouchableOpacity>
        </View>
        <View style={ReportStyle.formContent}>
          {!isVolunteer && <ReportTypeButton design={design} title={Lang.txt_J02} onPress={() => this._onChangeReportType(ReportTypes.COMMUNICATION)} onHelp={() => { this._onHelp(Lang.txt_J02, Lang.txt_J31) }} />}
          <ReportTypeButton design={design} title={Lang.txt_J03} onPress={() => this._onChangeReportType(ReportTypes.SAFETY)} onHelp={() => { this._onHelp(Lang.txt_J03, Lang.txt_J30) }} />
          <ReportTypeButton design={design} title={Lang.txt_J04} onPress={() => this._onChangeReportType(ReportTypes.PUBLIC_SPACE)} onHelp={() => { this._onHelp(Lang.txt_J04, Lang.txt_J29) }} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    reportState: state.reports,
    design: state.user.design,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportStepTwo)
