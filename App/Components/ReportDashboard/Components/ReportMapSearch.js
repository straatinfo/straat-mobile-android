import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { Right, Button, Header, Icon, Item, Input } from 'native-base'
import { connect } from 'react-redux'

import ReportMapActions from './../../../Redux/ReportMapRedux'
import ReportmapsearchActions from './../../../Redux/ReportmapsearchRedux'
import styles from './Styles/ReportMapSearchStyle'
import { keyboardCb } from '../../../Transforms/ReportHelper';

class ReportMapSearch extends Component {
  state={
    searchText: '',
    searchLast: ''
  }

  _cancelSearch () {
    const { mergeReportmap } = this.props
    mergeReportmap({isOnSearch: false, searchListActive: false, serchItems: []})
  }

  _search () {
    const { searchText, searchLast, searching } = this.state
    keyboardCb(Keyboard, () => {
      if (searchLast !== searchText && !searching) {
        this.props.reportmapsearchRequest(searchText)
        this.props.mergeReportmap({searchListActive: true})    // hide result list
        this.setState({searchLast: searchText})
      }
    })
  }

  _openResultList () {
    this.props.mergeReportmap({searchListActive: true})
  }

  _searchBoxChange (text) {
    this.setState({searchText: text})
  }

  render () {
    const { design, language } = this.props
    return (
      <Header searchBar rounded style={{ backgroundColor: design.header }} >
        <Item style={styles.searchContainer} >
          <Input
            placeholder={language._search}
            onChangeText={this._searchBoxChange.bind(this)}
            onSubmitEditing={this._search.bind(this)}
            onTouchEnd={this._openResultList.bind(this)}
          />
          <Icon name='ios-search' onPress={this._search.bind(this)} />
        </Item>
        <Right style={styles.cancelSearchContainer}>
          <Button transparent onPress={() => this._cancelSearch()}>
            <Icon name='md-close-circle' />
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
    reportMapState: state.reportMap,
    searching: state.reportmapsearch.fetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    mergeReportmap: (newState) => dispatch(ReportMapActions.mergeReportmap(newState)),
    reportmapsearchRequest: (data) => dispatch(ReportmapsearchActions.reportmapsearchRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportMapSearch)
