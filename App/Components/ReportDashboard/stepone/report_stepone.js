import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import { Icon, Content } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'

import Images from './../../../Themes/Images'
import Lang from './../../../Lib/CutomLanguage'
import ReportStyle from './../ReportStyle'
import styles from './../stepone/style'

import { connect } from 'react-redux'
import ReportsActions from './../../../Redux/ReportsRedux'

class ReportStepOne extends Component {
  _onSubmit () {
    // or change this with userhost id if backend get it complete list for this categories
    //
    /**
     * free host data
     * {
          "status": 1,
          "message": "Success",
          "data": {
              "_id": "5a844ec05420ec4721f6f1fc",
              "hostName": "freeHost",
              "email": "freehost@test.com",
              "username": "freeHost",
              "postalCode": "2500 DJ",
              "_role": {
                  "_id": "5a79be1d7d1aeb41665af29e",
                  "name": "Host",
                  "code": "HOST",
                  "__v": 0,
                  "users": [],
                  "accessLevel": 2
              },
              "isPatron": false
          }
      }
     */
    //                                -- unused --
    this.props.getCategories({ _host: '5a844e1bf154bc463543b987', _reportType: '' })
  }
  render () {
    const { reportState: {reportAddress}, design } = this.props
    return (
      
      <ScrollView style={ReportStyle.container}>
        <View style={styles.cancelBtnContainer}>
          <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={this.props.onCancel}>
            <Icon name='md-close' style={ReportStyle.iconStyle} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 10, flexDirection: 'column', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20, fontFamily: 'Gill Sans', textAlign: 'left', margin: 5, color: '#96acc7', backgroundColor: 'transparent'}}>
            { Lang.txt_J05 }:
                    </Text>
          <Text style={{fontSize: 18, fontFamily: 'Gill Sans', textAlign: 'left', margin: 5, color: '#96acc7', backgroundColor: 'transparent'}}>
            {reportAddress}
          </Text>
          <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={() => { this.props.onSubmit(); this._onSubmit() }}>
            <LinearGradient style={ReportStyle.roundButton} colors={[design.button2, design.button]}>
              <Text style={styles.buttonText}>{Lang.txt_J33.toUpperCase()}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 17, fontFamily: 'Gill Sans', textAlign: 'center', margin: 10, marginBottom: 20, color: '#96acc7', backgroundColor: 'transparent'}}>
            {Lang.txt_J32}
          </Text>
      </ScrollView> 
    )
  }
}

const mapStateToProps = state => {
  return {
    reportState: state.reports,
    design: state.user.design
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    getCategories: (reportsParams) => dispatch(ReportsActions.getCategories(reportsParams))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportStepOne)
