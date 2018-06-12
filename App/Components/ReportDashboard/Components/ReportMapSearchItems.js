import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import { Right, Icon, Content, Left, List, ListItem, Title, Subtitle } from 'native-base'
import { connect } from 'react-redux'
import { CircleLoader } from '../..'
import ReportMapActions from './../../../Redux/ReportMapRedux'
import * as Animatable from 'react-native-animatable'
import styles from './Styles/ReportMapSearchItemsStyle'

class ReportMapSearchItems extends Component {
  _cancelSearch () {
    const { mergeReportmap } = this.props
    mergeReportmap({isOnSearch: false})
  }
  _search () {
    const { mergeReportmap } = this.props
    mergeReportmap({isOnSearch: false})
  }
  _renderListItems (item, index) {
    return (
      <ListItem style={styles.listContainer} selected={item._id === this.props.searchSelectedID} onPress={() => this._clickItem(item, index)} key={item._id}>
        <Left style={styles.listContentContainer}>
          <Animatable.View animation='slideInLeft' >
            <Title style={styles.title}>{item.title}</Title>
            <Subtitle style={styles.subTitle}>{item.subTitle}</Subtitle>
          </Animatable.View>
        </Left>
        <Right>
          <Icon name='arrow-forward' />
        </Right>
      </ListItem>
    )
  }
  _clickItem (item, index) {
    const { mergeReportmap, searchSelectedID, mapNavigate } = this.props
    const { _id } = item
    if (searchSelectedID !== _id) {
      __DEV__ && console.log(item)
      mapNavigate(item.location)
      mergeReportmap({searchSelectedID: _id, searchListActive: false})
    }
  }

  render () {
    const { serchItems, searchListActive, fetching } = this.props
    const renderListItem = this._renderListItems.bind(this)
    if (!searchListActive) {
      return null
    }
    if (fetching) {
      return (<Content style={styles.container}><CircleLoader /></Content>)
    }
    if (serchItems.length === 0) {
      return null
    }

    return (
      <Content style={[styles.container, styles.content]}>
        <List>
          {serchItems.map(renderListItem)}
        </List>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    serchItems: state.reportMap.serchItems,
    searchSelectedID: state.reportMap.searchSelectedID,
    searchListActive: state.reportMap.searchListActive,
    fetching: state.reportmapsearch.fetching

  }
}

const mapDispatchToProps = dispatch => {
  return {
    mergeReportmap: (newState) => dispatch(ReportMapActions.mergeReportmap(newState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportMapSearchItems)
