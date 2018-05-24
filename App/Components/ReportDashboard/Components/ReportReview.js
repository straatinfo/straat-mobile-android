import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View, ScrollView, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation, TouchableHighlight, Picker} from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, List, Switch, Text, Body} from 'native-base'

import ImagePicker from 'react-native-image-picker'

import RowView from '../../RowView'
import CenterView from '../../CenterView'
import GeneralDesign from './../../../Lib/GeneralDesign'
import Images from './../../../Themes/Images'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spacer from '../../Spacer'

import colors from './../../../Themes/Colors'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'
import ReportsActions from './../../../Redux/ReportsRedux'
import UserActions from './../../../Redux/UserRedux'
import { connect } from 'react-redux'
import { modelFindById, isInArray } from '../../../Transforms/ArrayHelper'
import { crop } from '../../../Transforms/Cloudinary'
import { colorMinus, getTeamListBySelectedIdFromTeamList } from '../../../Transforms/TeamHelper'
import CircleLoader from '../../CircleLoader'

import ReportStyle from './../ReportStyle'
import MainButton from './../../../Components/MainButton'
// import Images from './../../../Themes/Images'
class TeamSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      teams: [],
      mainCategoryName: '',
      subCategoryName: ''
     //  reportImages: [{uri: 'content://media/external/images/media/19486'}, {uri: 'content://media/external/images/media/19486'}] // 0 to 9

    }
  }
  componentDidMount () {
    const { user: {_host, isVolunteer}, reportTeamSelected, teamList, mainCategoryID, subCategoryID } = this.props
    // this.props.getTeamlist(_host, isVolunteer)

    this.setState({
      teams: getTeamListBySelectedIdFromTeamList(reportTeamSelected, teamList)
    })
  }

  reportContent (content, key = 'xyz') {
    return (<Text key={key} >{content} </Text>)
  }

  reportTitle (title = '') {
    return (
      <Text style={ReportStyle.reportTitle}>{title.toUpperCase()} </Text>)
  }

  getCategoryName (_id) {
    // const { reportMainCategoryList, reportSubCategoryList  } = this.props
    const { categoryList, reportMainCategoryList, reportSubCategoryList } = this.props
    // const categoryList = [...reportMainCategoryList, ...reportSubCategoryList]
    const catName = categoryList.find((category) => category._id === _id)
    return catName ? catName.name : ' '
  }

  getMainCategoryName (_id) {
    const { reportMainCategoryList } = this.props
    const catName = reportMainCategoryList.find((category) => category._id === _id)
    return catName ? catName.name : ' '
  }

  getSubCategoryName (_id) {
    const { reportSubCategoryList } = this.props
    const catName = reportSubCategoryList.find((category) => category._id === _id)
    return catName ? catName.name : ' '
  }
  render () {
    // const { source: reportImages } = this.props
    // const style = {
    //   container: {backgroundColor: colors.background},
    //   row: { flex: 1, backgroundColor: 'white' }
    // }
   // const { count } = this.state
    const { teamList, reportTeamSelected, navigation, onBack, onSubmit, mainCategoryID, subCategoryID, text, language } = this.props
    const { teams } = this.state
    return (
      <Content style={ReportStyle.formContent} >
        <Text style={ReportStyle.title}>{language.txt_J42}</Text>

        {this.reportTitle(language.generalInformation)}
        <View style={[ReportStyle.viewBorder, ReportStyle.viewBorderInner]} >
          {this.reportContent(this.getMainCategoryName(mainCategoryID), 'mainCategoryID')}
          {subCategoryID !== 0 && this.reportContent(this.getSubCategoryName(subCategoryID), 'subCategoryID')}
        </View>

        {this.reportTitle(language.message)}
        <View style={[ReportStyle.viewBorder, ReportStyle.viewBorderInner]} >
          {this.reportContent(text)}
        </View>

        {this.reportTitle(language.txt_J43)}
        <View style={[ReportStyle.viewBorder]}>
          <Picker
            style={{margin: 0, padding: 0}}
            mode={'dropdown'}
            selectedValue={0}
            >
            {/** __DEV__ && <Picker.Item value={'devId'} label={'devName'} key={'devkey'} /> */}
            {teams.map((l, i) => { return <Picker.Item value={i} enabled={false} label={l.teamName} key={l._id} /> })}
          </Picker>
        </View>
        <MainButton title={language.modify} onPress={onBack} />
        <MainButton title={language.sendMessage} onPress={onSubmit} />
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    // teamList: state.user.teamList,
    teamList: state.teamList.teamList,
    // reportState: state.reports,
    reportTeamSelected: state.reports.reportTeamSelected,
    categoryList: state.reports.reportCategoryList,
    mainCategoryID: state.reports.reportSelectMainCategoryID,
    reportMainCategoryList: state.reports.reportMainCategoryList,
    reportSubCategoryList: state.reports.reportSubCategoryList,
    subCategoryID: state.reports.reportSelectSubCategoryID,
    text: state.reports.reportDescription,
    fetchTeam: state.reports.fetchTeam,
    language: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTeamlist: (_host, isVolunteer) => dispatch(UserActions.getTeamlist({_host, isVolunteer})),
    reportMergeState: (newState) => dispatch(ReportsActions.reportMergeState(newState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelect)
