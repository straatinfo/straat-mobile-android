import React, { Component } from 'react'
import {
View,
ScrollView,
Text,
TextInput,
TouchableOpacity,
Image,
Picker
} from 'react-native'
import { Icon } from 'native-base'

// import Picker from 'react-native-picker'
import LinearGradient from 'react-native-linear-gradient'
import { CheckBox } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/MaterialIcons'

import Spacer from './../../../Components/Spacer'
import ReportStyle from './../ReportStyle'
import Images from './../../../Themes/Images'
import styles from '../stepthree/style'
import ImageContainer from './../Components/ImageContainer'

import { connect } from 'react-redux'
import ReportsActions from './../../../Redux/ReportsRedux'
import { showAlertBox, showAlertBoxWithTitle } from '../../../Redux/commonRedux'
import HorizontalSelection from '../Components/HorizontalSelection'
import { ReportTypes } from '../../../Services/Constant'
import { sortCategories } from '../../../Transforms/ReportHelper';

/**
 *  maybe i should rework this module later, this module works by pass dev
 *  @ArC
 *
 */

class ReportStepThree extends Component {
  constructor () {
    super()
    this.state = {
      reportMainCategoryList: 0,
      reportSubCategoryList: 0,
      submitButtonState: false,
      personCounter: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
      vehicleCounter: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
    }
  }

  componentDidMount () {
    // alert(JSON.stringify(this.props.data));
    this.enableButton()
  }

  _changeMainCategory (selectedMainCategoryId, itemIndex) {
    if (itemIndex === 0) {
      return null
    }

    /** rember that there is default value for this selection and that is the title so item must -1 to get real index in array */
    __DEV__ && console.log('selectedMainCategoryId', selectedMainCategoryId)
    __DEV__ && console.log('selected itemIndex', itemIndex)
    const { reportMergeState, reportState: { reportMainCategoryList, reportSubCategoryList } } = this.props
    const subCatList = reportMainCategoryList.find((item) => item._id === selectedMainCategoryId).subCategories.filter((item) => item)
    reportMergeState({
      reportSelectMainCategoryID: selectedMainCategoryId,
      reportSelectSubCategoryID: 0,    // reset selection for sub category
      reportSubCategoryList: sortCategories(subCatList)})
      // this.props.onMainCategoryUpdate(catObj)
    this.enableButton()
    this.validate()
  }

  _changeSubCategory (selectedSubCategoryId, itemIndex) {
    if (itemIndex === 0) {
      return null
    }
    this.props.reportMergeState({ reportSelectSubCategoryID: selectedSubCategoryId })
      // this.props.onSubCategoryUpdate(subCatObj)
    this.enableButton()
    this.validate()
  }

  _reportUploadImagesAdd (newImage, _next = () => {}) {
    const { reportMergeState, reportState, uploadPhoto } = this.props
    console.log(newImage)
    // reportMergeState({reportUploadImages: [...reportState.reportUploadImages, newImage]})
    uploadPhoto(newImage)
    this.enableButton()
    _next()
  }

  _reportUploadImagesRemove (index, _next = () => {}) {
    const { reportMergeState, reportState: { reportUploadImages, reportListImages } } = this.props
    // const images = reportUploadImages.filter((img, i) => { return i !== index })
    reportMergeState({
      reportUploadImages: reportUploadImages.filter((img, i) => { return i !== index }),
      reportListImages: reportListImages.filter((img, i) => { return i !== index })
    })
    _next()
    this.enableButton()
  }

  _onPressIsUrgent (isUrgentNewValue) {
    const { reportState: { reportIsUrgent, reportType }, language } = this.props
    const isUrgent = !reportIsUrgent

    if (ReportTypes.SAFETY.code === reportType.code && isUrgent) {
      showAlertBoxWithTitle('  ', language.txt_J44)
    }

    this.props.reportMergeState({reportIsUrgent: isUrgent})
    this.enableButton()
  }

  _onChangeDescription (reportDescription) {
    this.props.reportMergeState({reportDescription: reportDescription})
    this.enableButton()
  }

  validateMainCategory () {
    // if has main then it required
    const {reportState: {reportMainCategoryList, reportSelectMainCategoryID}} = this.props
    if (reportMainCategoryList.length > 0) {
      if (reportSelectMainCategoryID) { return true } else { return false }
    } else { return true }
  }

  validateSubCategory () {
    // if has main then it required
    const {reportState: {reportSubCategoryList, reportSelectSubCategoryID}} = this.props
    if (reportSubCategoryList.length > 0) {
      if (reportSelectSubCategoryID) { return true } else { return false }
    } else { return true }
  }

  validate () {
    if (this.validateMainCategory() && this.validateSubCategory()) {
      return true
    } else {
      return false
    }
    // this.setState({submitButtonState: buttonState})
    // buttonState
  }
  enableButton () {
    this.props.reportMergeState({submitButton: this.validate()})
    // this.render()
  }
  _onSubmit () {
    const {_activeTeam} = this.props.user
    // requird team so we will validated here if it has some team
    if (!(_activeTeam && _activeTeam._id)) {
      showAlertBox('Required Team')
      return true
    }

   // submit report
    if (this.validate()) {
      console.log('submit')
      this.props.reportSubmit({ callback: () => this.props.onCancel() })
    }
  }
  _onSlectPersonInvolve (value) {
    this.props.reportMergeState({reportIsPersonInvoled: value})
  }
  _onSlectVehicleInvolve (value) {
    this.props.reportMergeState({reportIsVehicleInvoled: value})
  }
  _onChangePersonInvoleCount (itemValue, itemIndex) {
    this.props.reportMergeState({reportPersonInvoledCount: itemValue})
  }
  _onChangeVehicleInvoleCount (itemValue, itemIndex) {
    this.props.reportMergeState({reportVehicleInvoledCount: itemValue})
  }
  _onChangePersonInvolveDescription (text) {
    this.props.reportMergeState({reportPersonInvoledDesc: text})
  }
  _onChangeVehicleInvolveDescription (text) {
    this.props.reportMergeState({reportVehicleInvoledDesc: text})
  }
  render () {
    const { reportState: {
      reportIsUrgent, reportDescription, reportMainCategoryList, submitButton, reportIsPersonInvoled, reportIsVehicleInvoled, reportType,
      reportPersonInvoledCount, reportVehicleInvoledCount, reportPersonInvoledDesc, reportVehicleInvoledDesc,
      reportSubCategoryList, reportSelectMainCategoryID, reportSelectSubCategoryID, reportAddress }, navigation, design, language } = this.props
    const validated = this.validate()
    return (
      <View style={ReportStyle.container}>
        <View style={ReportStyle.cancelBtnContainer}>
          <TouchableOpacity style={{flex: 9, flexDirection: 'row'}} underlayColor='rgba(0,0,0,0.0)' onPress={this.props.onCancel}>
            <Icon name='md-arrow-back' style={ReportStyle.iconStyle} />
            <View style={{flex: 7, width: '100%', display: 'flex'}}>
              {ReportTypes.COMMUNICATION.code !== reportType.code && <Text style={{paddingVertical: 5, textAlignVertical: 'center', flex: 1}}>{reportAddress}</Text>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} underlayColor='rgba(0,0,0,0.0)' onPress={this.props.onCancel}>
            <Icon name='md-close' style={ReportStyle.iconStyle} />
          </TouchableOpacity>
        </View>
        <View style={ReportStyle.formContent}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}>
            {/** select mainCategory */}
            { reportMainCategoryList.length > 0 && <View><View style={styles.viewBorder}>
              <Picker
                mode={'dropdown'}
                selectedValue={reportSelectMainCategoryID}
                onValueChange={(itemValue, itemIndex) => { this._changeMainCategory(itemValue, itemIndex) }}>
                <Picker.Item value={0} label={language.selectMainCategory} enabled={false} key={'default'} />
                {/** __DEV__ && <Picker.Item value={'devId'} label={'devName'} key={'devkey'} /> */}
                {reportMainCategoryList.map((l, i) => { return <Picker.Item value={l._id} label={l.name ? l.name : ' '} key={l._id} /> })}
              </Picker>
            </View></View>}
            {/** select subCategory */}
            { reportSubCategoryList.length > 0 && <View><View style={styles.viewBorder}>
              <Picker
                mode={'dropdown'}
                selectedValue={reportSelectSubCategoryID}
                onValueChange={(itemValue, itemIndex) => { this._changeSubCategory(itemValue, itemIndex) }}>
                <Picker.Item value={0} label={language.selectSubCategory} enabled={false} key={'default'} />
                {/** __DEV__ && <Picker.Item value={'devId'} label={'devName'} key={'devkey'} /> */}
                {reportSubCategoryList.map((l, i) => { return <Picker.Item value={l._id} label={l.name ? l.name : ' '} key={l._id} /> })}
              </Picker>
            </View></View>}
            <View style={styles.viewBorder}>
              <CheckBox
                checkedColor={'red'}
                title={language.txt_J26}
                checked={reportIsUrgent}
                onPress={() => this._onPressIsUrgent()}
              /></View>
            {/** report reportDescription */}
            <TextInput
              style={[styles.viewBorder, { height: 100 }]}
              autoGrow
              multiline
              underlineColorAndroid='transparent'
              returnKeyType='next'
              placeholder={'  ' + language.txt_J34}
              value={reportDescription}
              onChangeText={(text) => this._onChangeDescription(text)}
              onEndEditing={(e) => this.enableButton()}
              />
            {/** ------------  person invloved --------------------- */}
            {ReportTypes.SAFETY.code === reportType.code && <View>
              <View style={styles.viewBorder}>
                <HorizontalSelection
                  title={language.txt_J36}
                  options={[ {label: language.yes, value: true}, {label: language.No, value: false} ]}
                  selected={reportIsPersonInvoled}
                  onSelect={(value) => { this._onSlectPersonInvolve(value) }} />
              </View>
              {reportIsPersonInvoled === true && <View>
                <View style={styles.viewBorder}>
                  <Picker
                    mode={'dropdown'}
                    selectedValue={reportPersonInvoledCount}
                    onValueChange={(itemValue, itemIndex) => { this._onChangePersonInvoleCount(itemValue, itemIndex) }}>
                    <Picker.Item value={0} label={language.count} enabled={false} key={'default'} />
                    {/** __DEV__ && <Picker.Item value={'devId'} label={'devName'} key={'devkey'} /> */}
                    {this.state.personCounter.map((l, i) => { return <Picker.Item value={l} label={l.toString()} key={l} /> })}
                  </Picker>
                </View>
                <TextInput
                  style={[styles.viewBorder, { height: 100 }]}
                  autoGrow
                  multiline
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  placeholder={'' + language.txt_J39}
                  value={reportPersonInvoledDesc}
                  onChangeText={(text) => this._onChangePersonInvolveDescription(text)}
                  // onEndEditing={(e) => this.enableButton()}
                />
              </View>}
            </View>}
            {/** ------------  Vehicle invloved --------------------- */}
            {ReportTypes.SAFETY.code === reportType.code && <View>
              <View style={styles.viewBorder}>
                <HorizontalSelection
                  title={language.txt_J37}
                  options={[ {label: language.yes, value: true}, {label: language.No, value: false} ]}
                  selected={reportIsVehicleInvoled}
                  onSelect={(value) => { this._onSlectVehicleInvolve(value) }} />
              </View>
              {reportIsVehicleInvoled === true && <View>
                <View style={styles.viewBorder}>
                  <Picker
                    mode={'dropdown'}
                    selectedValue={reportVehicleInvoledCount}
                    onValueChange={(itemValue, itemIndex) => { this._onChangeVehicleInvoleCount(itemValue, itemIndex) }}>
                    <Picker.Item value={0} label={language.count} enabled={false} key={'default'} />
                    {/** __DEV__ && <Picker.Item value={'devId'} label={'devName'} key={'devkey'} /> */}
                    {this.state.vehicleCounter.map((l, i) => { return <Picker.Item value={l} label={l.toString()} key={l} /> })}
                  </Picker>
                </View>
                <TextInput
                  style={[styles.viewBorder, { height: 100 }]}
                  autoGrow
                  multiline
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  placeholder={'' + language.txt_J40}
                  value={reportVehicleInvoledDesc}
                  onChangeText={(text) => this._onChangeVehicleInvolveDescription(text)}
                 // onEndEditing={(e) => this.enableButton()}
                />
              </View>}
            </View>}
            {/** ------------  photos gallery --------------------- */}
            <Text>{'  ' + language.txt_J35}:</Text>
            <ImageContainer
              source={this.props.reportState.reportUploadImages}
              addItem={this._reportUploadImagesAdd.bind(this)}
              removeItem={this._reportUploadImagesRemove.bind(this)} />
            <Spacer />
            {ReportTypes.COMMUNICATION.code !== reportType.code && <TouchableOpacity disabled={!validated} underlayColor='rgba(0,0,0,0.0)' onPress={() => this._onSubmit()}>
              <LinearGradient style={ReportStyle.roundButton} colors={[validated ? design.button2 : '#a6b2c1', validated ? design.button : '#7f8893']} >
                <Text style={ReportStyle.submitText}>{language.txt_J25.toUpperCase()}</Text>
              </LinearGradient>
              </TouchableOpacity>}
            {ReportTypes.COMMUNICATION.code === reportType.code && <TouchableOpacity disabled={!validated} underlayColor='rgba(0,0,0,0.0)'
              onPress={() => navigation.navigate('ReportSelectTeam', { callback: () => this.props.onCancel() })}>
              <LinearGradient style={ReportStyle.roundButton} colors={[validated ? design.button2 : '#a6b2c1', validated ? design.button : '#7f8893']} >
                <Text style={ReportStyle.submitText}>{language.continue.toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>}
            {/** beacuse when showing keyboard will hide the text input, this is my hot fix @ArC */}
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
          </ScrollView>
        </View>

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    reportState: state.reports,
    user: state.user.user,
    design: state.user.design,
    language: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState)),
    uploadPhoto: (photo) => dispatch(ReportsActions.uploadPhoto(photo)),
    reportSubmit: (reportParams) => dispatch(ReportsActions.reportSubmit(reportParams))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportStepThree)
