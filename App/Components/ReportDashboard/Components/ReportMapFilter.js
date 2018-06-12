import React, { Component } from 'react'
import { View, Right, Button, Icon, Header } from 'native-base'
import { connect } from 'react-redux'

import ReportMapActions from './../../../Redux/ReportMapRedux'
import styles from './Styles/ReportMapFilterStyle'
import ReportMapTypeSelect from './ReportMapTypeSelect'
import { getReportTypesFilterSelect } from '../../../Transforms/ReportHelper'

class ReportMapFilter extends Component {
  state = {
    filters: []
  }
  componentDidMount () {
    const { language } = this.props
    this.setState({ filters: getReportTypesFilterSelect(language) })
  }

  _pickFilter (itemValue, itemIndex) {
    const { mergeReportmap } = this.props
    mergeReportmap({mapFilterCode: itemValue})
  }
  render () {
    const { design, mergeReportmap, language, mapFilterCode } = this.props
    return (
      <Header searchBar rounded style={{ backgroundColor: design.header }} >
        <View style={{flex: 6}}>
          <ReportMapTypeSelect language={language} onChange={this._pickFilter.bind(this)} filters={this.state.filters} selected={mapFilterCode} />
        </View>
        <Right style={{flex: 1}}>
          <Button transparent onPress={() => mergeReportmap({isOnSearch: true})}>
            <Icon name='ios-search' />
          </Button>
        </Right>
      </Header>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.language.Languages,
    design: state.user.design,
    // reportMapState: state.reportMap,

    mapFilterCode: state.reportMap.mapFilterCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    mergeReportmap: (newState) => dispatch(ReportMapActions.mergeReportmap(newState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportMapFilter)
