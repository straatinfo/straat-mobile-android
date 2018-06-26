import React, { Component } from 'react'
import {
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { Text, View } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import renderIf from 'render-if'
import ImageLoad from 'react-native-image-placeholder'
import BusyIndicator from 'react-native-busy-indicator'

import { connect } from 'react-redux'
import ReportsActions from './../../../Redux/ReportsRedux'

import { GetDate, GetTime, GetDateEutype } from './../../../Lib/Helper/TimeUtils'
import { GetFullName, GetChatName } from './../../../Transforms/NameUtils'
import { FontSizes, WidthSizes } from './../../../Lib/Common/Constants'
import { ReportStatus, ReportTypes } from '../../../Services/Constant'
import { Report } from '../../../Services/ReportDefaults'
import AlertBox from '../../AlertBox'
import ReportImageHolders from '../../ReportImageHolders'
import { ToPublicButton } from '../..';
import { hasMember } from '../../../Transforms/ReportHelper';

const { width } = Dimensions.get('window')
const fixColorBorder = '#aaa'
const fixColor = '#4f555e'

/**
 *  plan to separate file this later
 *
 */
class Status extends Component {
  /**
   * parse input report status to commponent
   */
  constructor () {
    super()
    this.state = {}
  }
  render () {
    const { status, Lang } = this.props
    const btnStyle = StyleSheet.create({
      changeStatusCon: {
        backgroundColor: '#09bcad',
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 5,
        borderRadius: 5
      },
      changeStatusbtnTxt: {
        color: '#fff',
        fontSize: 14
      }
    })
    /**
     *  0 for new color red
     *  1 for finished color green
     *  partial
     */
    let color = 'red'
    let infoText = ''
    let buttonShow = false

    if (ReportStatus.new === status || status === 'Unresolved') {
      color = 'red'
      infoText = Lang.new
      buttonShow = true
    } else if (status === ReportStatus.inProgress) {
      color = 'yellow'
      infoText = Lang.inProgress
      buttonShow = true
    } else if (status === ReportStatus.done) {
      color = 'green'
      infoText = Lang.done
      buttonShow = false
    } else if (status === ReportStatus.expired) {
      color = 'black'
      infoText = Lang.expired
      buttonShow = false
    }

    return (
      <View style={[ styles.w50, styles.statusValue ]} >
        <Icon name='lens' size={16} color={color} />
        <Text style={[ styles.f16 ]}>{ infoText }</Text>{/** report status value */ }
        {renderIf(buttonShow)(
          <TouchableOpacity style={btnStyle.changeStatusCon} underlayColor='rgba(0,0,0,0.0)' onPress={() => { this.props.onChangeStatus(this.props.reacordID) }}>
            <Text style={[ btnStyle.changeStatusbtnTxt]} >{Lang.txt_J13}</Text>
          </TouchableOpacity>
          )}
      </View>
    )
  }
}

class ViewReportFromMap extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  changeStatus (reportID) {
    const { statusSource } = this.props
    this.props.reportChangeStatus({ newData: {status: ReportStatus.done, reportId: reportID}, _report: reportID, statusSource: statusSource, field: 'STATUS' })
    // console.log('changeStatus', reportID )
  }

  confirmChangeStatus (reportID) {
    const { Lang } = this.props
    AlertBox.alert(' ',
      Lang.txt_J18, [ {text: Lang.txt_J19, onPress: () => this.changeStatus(reportID)}, {text: Lang.txt_J20, onPress: () => console.log(reportID)} ],
      { cancelable: false }
    )
  }

  changeVisible (reportID) {
    const { statusSource } = this.props
    this.props.reportChangeStatus({ newData: {isPublic: true, reportId: reportID}, _report: reportID, statusSource: statusSource, field: 'ISPUBLIC' })
    // console.log('changeStatus', reportID )
  }

  confirmChangeVisible (reportID) {
    const { Lang } = this.props
    AlertBox.alert(' ',
      Lang.txt_J18, [ {text: Lang.txt_J19, onPress: () => this.changeVisible(reportID)}, {text: Lang.txt_J20, onPress: () => console.log(reportID)} ],
      { cancelable: false }
    )
  }

  componentDidMount () {
  }
  render () {
    // default value and eee
    const { reportDetails, screen, teamList, Lang } = this.props
    const report = { ...Report, ...reportDetails }
    return (
      <View style={styles.container}>
        { screen !== true && <View style={styles.cancelBtnContainer}>
          <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' />
          <TouchableOpacity underlayColor='rgba(0,0,0,0.0)' onPress={this.props.onCancel}>
            <Icon name='close' size={20} color={fixColor} />
          </TouchableOpacity>
        </View> }
        <ScrollView bounces scrollEventThrottle={16}>
          <View style={styles.listContainer}>
            <View style={[ styles.rowContainer, styles.twoCol ]} >{ /** report address conatainer */ }
              <View >
                <Icon name='place' size={50} color={fixColor} />
              </View>

              <View style={[ styles.address ]} >
                <Text style={[ styles.address, styles.f14 ]} >{ report.location }</Text>
              </View>
            </View>

            <View style={[ styles.rowContainer ]} >{ /** report datetime conatainer */ }

              <View style={[ styles.lineContainer ]} >{ /** report date container */ }
                <View style={[ styles.twoCol ]} >
                  <View style={[ styles.w40 ]}>{ /** report date titles */ }
                    <Text style={[ styles.f16 ]}> { Lang.txt_J07 }</Text>
                  </View>
                  <View style={[ styles.w50 ]}>
                    <Text style={[ styles.f16 ]}>{GetDateEutype(report.createdAt)} </Text>{ /** report date value */ }
                  </View>
                </View>
              </View>

              <View style={[ styles.lineContainer ]} >{ /** report time container */ }
                <View style={[ styles.twoCol ]} >
                  <View style={[ styles.w40 ]}>{ /** report time titles */ }
                    <Text style={[ styles.f16 ]}> { Lang.txt_J08 }</Text>
                  </View>
                  <View style={[ styles.w50 ]}>
                    <Text style={[ styles.f16 ]}>{GetTime(report.createdAt)}</Text>{ /** report time value */ }
                  </View>
                </View>
              </View>

              <View style={[ styles.lineContainer ]} >{ /** report status container */ }
                <View style={[ styles.twoCol ]} >
                  <View style={[ styles.w40 ]}>{ /** report status titles */ }
                    <Text style={[ styles.f16 ]}> { Lang.txt_J09 }</Text>
                  </View>
                  <View style={[ styles.w50, styles.statusValue ]}>
                    <Status status={report.status} onChangeStatus={() => this.confirmChangeStatus(report._id)} reacordID={report._id} Lang={Lang} />{ /** report status value */ }
                  </View>
                </View>
              </View>
              
              {renderIf(report._team && report._team._id && report.isPublic === false && report._reportType.code === ReportTypes.SAFETY.code && hasMember(report._team._id, teamList))(
                <View style={[ styles.lineContainer ]} >
                  <View style={[ styles.twoCol ]} >
                    <View style={[ styles.w40 ]}>
                      <Text style={[ styles.f16 ]}> </Text>
                    </View>
                    <View style={[ styles.w50, styles.statusValue ]}>
                      <ToPublicButton Lang={Lang} isPublic={report.isPublic} onPress={() => this.confirmChangeVisible(report._id)} />
                    </View>
                  </View>
                </View>
              )}
              
            </View>{ /** report datetime conatainer --END */ }
            { report._mainCategory !== undefined && report._mainCategory !== null && report._mainCategory.name !== undefined && <View style={[ styles.rowContainer ]} >{ /** report category */ }
              <View style={[ styles.rowTitleContainer ]} >
                <Text style={[ styles.titleCategory, styles.f16 ]} > { Lang.txt_J10}</Text>
              </View>

              <View style={[ styles.twoCol ]} >
                <View style={[ styles.w40 ]} >
                  <Text style={[ styles.f12 ]} >{ /** notification type no entry */ }</Text>
                </View>

                <View style={[ styles.w50 ]} >
                  <Text style={[ styles.f14 ]} >{ report._mainCategory.name }</Text>
                  {report._subCategory !== undefined && report._subCategory !== null && report._subCategory.name !== undefined && <Text style={[ styles.f14 ]} >{ report._subCategory.name } </Text>}
                </View>
              </View>
              </View>}{ /** report category -- END */ }

            <View style={[ styles.rowContainer ]} >{ /** report note/ message */ }
              <View style={[ styles.rowTitleContainer ]} >
                <Text style={[ styles.titleCategory, styles.f16 ]} >{ Lang.txt_J15}</Text>
                <Text style={[ styles.f14 ]}>{report.description}</Text>
              </View>
            </View>{ /** report note/ message -- END */ }

            {report.isPeopleInvolved === true && <View style={[ styles.rowContainer ]} >{ /** person involved  */ }
              <View style={[ styles.rowTitleContainer ]} >
                <Text style={[ styles.titleCategory, styles.f16 ]} >{Lang.personInvoled} : {report.peopleInvolvedCount}</Text>
                <Text style={[ styles.f14 ]}>{Lang.description} : {report.peopleInvolvedDescription}</Text>
              </View>
            </View>}{ /** person involved -- END */ }

            {report.isVehicleInvolved === true && <View style={[ styles.rowContainer ]} >{ /** vehicle involved  */ }
              <View style={[ styles.rowTitleContainer ]} >
                <Text style={[ styles.titleCategory, styles.f16 ]} >{Lang.vehicleInvoled} : {report.vehicleInvolvedCount}</Text>
                <Text style={[ styles.f14 ]}>{Lang.description} : {report.vehicleInvolvedDescription}</Text>
              </View>
            </View>}{ /** vehicle involved -- END */ }

            {renderIf(report.attachments.length > 0)(
              <View style={[ styles.rowContainer ]} >{ /** report  parse images container */ }
                <View style={[ styles.rowTitleContainer ]} >
                  <Text style={[ styles.titleCategory, styles.f16 ]} >{ Lang.txt_J16}</Text>
                </View>
                <ReportImageHolders listImages={report.attachments} />{ /** report parse images */ }
              </View>
            )}{ /** report  parse images container -- END */ }

            <View style={[ styles.rowContainer ]} >{ /** report report by */ }
              <View style={[ styles.rowTitleContainer ]} >
                <Text style={[ styles.titleCategory, styles.f16 ]} >{ Lang.txt_J17}:</Text>
                <Text style={[ styles.f14 ]}>{ GetChatName(report._reporter) }</Text>
              </View>
            </View>{ /** report report by-- END */ }

          </View>{/** listContainer --END */}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...FontSizes,
  ...WidthSizes,
  container: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    margin: 0,
    padding: 10,
    borderTopWidth: 1,
    borderColor: fixColorBorder
  },
  listContainer: {
    margin: 10
  },
  lineContainer: {
    paddingTop: 5
  },
  statusValue: {
    flexDirection: 'row',
    alignContent: 'center'
  },
  icon: {
    height: 40,
    width: 40
  },
  twoCol: {
    flex: 1,
    flexDirection: 'row'
  },
  rowContainer: {
    paddingBottom: 15,
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    borderBottomWidth: 1,
    borderColor: '#aaa'
  },
  cancelBtn: {

  },
  address: {
    flex: 1,
    padding: 5
  },
  columna: { borderWidth: 1,
    borderColor: 'red'
  },
  cancelBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  }
})

const mapStateToProps = state => {
  return {
    reportDetails: state.reports.reportDetails,
    Lang: state.language.Languages,
    teamList: state.user.user.teamList,
    statusSource: state.reports.statusSource
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportChangeStatus: (report) => dispatch(ReportsActions.reportChangeStatus(report))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewReportFromMap)

/**
 * somethings
 *   <Image source={require('../../../../Resources/blue-cross.png')} style={styles.cancelBtn}/>
 * <TimeFormater format='YYYY/MM/DD' dateToFormat={JSON.parse(created_at)} />
 *  <Image style={styles.icon} source={require('../../../../Resources/marker_icon.png')} /> Image
 *
 */
