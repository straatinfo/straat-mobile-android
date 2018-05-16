import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar, Picker, BackHandler} from 'react-native'
import {
  Text,
  Container,
  Header,
  Content,
  Title,
  Button,
  Right,
  Body,
  Icon,
  Item,
  List,
  ListItem,
  Left,
  Separator,
  Switch
} from 'native-base'

import { drawerData } from './../../Navigation/NavigationDrawer'
import Lang from './../../Lib/CutomLanguage'
import ValidationComponent from 'react-native-form-validator'
import CenterView from '../../Components/CenterView'
import UserActions from './../../Redux/UserRedux'
import HeaderInDrawer from '../../Components/HeaderInDrawer';

const styles = {
  listItemText: {
    color: 'gray'
  }
}
class SettingForm extends ValidationComponent {
  constructor (props) {
    super(props)
    this.state = {
      isSwitchA: false,
      isSwitchB: false,
      isSwitchC: false,
      // radiusOptions: [{value: 1000, l: '1km'}, {value: 2000, l: '2km'}],
      radius: 0.25,
      // radiusOptions: [ {v: 0.25, l: '0.25km'}, {v: 0.5, l: '0.5km'}, {v: 0.75, l: '0.75km'}, {v: 1, l: '1km'}, {v: 1.25, l: '1.25km'}, {v: 1.5, l: '1.5km'}, {v: 1.75, l: '1.75km'}, {v: 2, l: '2km'}, {v: 2.25, l: '2.25km'}, {v: 2.5, l: '2.5km'}, {v: 2.75, l: '2.75km'}, {v: 3, l: '3km'}, {v: 3.25, l: '3.25km'}, {v: 3.5, l: '3.5km'}, {v: 3.75, l: '3.75km'}, {v: 4, l: '4km'}, {v: 4.25, l: '4.25km'}, {v: 4.5, l: '4.5km'}, {v: 4.75, l: '4.75km'}, {v: 5, l: '5km'}, {v: 5.25, l: '5.25km'}, {v: 5.5, l: '5.5km'}, {v: 5.75, l: '5.75km'}, {v: 6, l: '6km'}, {v: 6.25, l: '6.25km'}, {v: 6.5, l: '6.5km'}, {v: 6.75, l: '6.75km'}, {v: 7, l: '7km'}, {v: 7.25, l: '7.25km'}, {v: 7.5, l: '7.5km'}, {v: 7.75, l: '7.75km'}, {v: 8, l: '8km'}, {v: 8.25, l: '8.25km'}, {v: 8.5, l: '8.5km'}, {v: 8.75, l: '8.75km'}, {v: 9, l: '9km'}, {v: 9.25, l: '9.25km'}, {v: 9.5, l: '9.5km'}, {v: 9.75, l: '9.75km'}, {v: 10, l: '10km'}, {v: 10.25, l: '10.25km'}, {v: 10.5, l: '10.5km'}, {v: 10.75, l: '10.75km'}, {v: 11, l: '11km'}, {v: 11.25, l: '11.25km'}, {v: 11.5, l: '11.5km'}, {v: 11.75, l: '11.75km'}, {v: 12, l: '12km'}, {v: 12.25, l: '12.25km'}, {v: 12.5, l: '12.5km'}, {v: 12.75, l: '12.75km'}, {v: 13, l: '13km'}, {v: 13.25, l: '13.25km'}, {v: 13.5, l: '13.5km'}, {v: 13.75, l: '13.75km'}, {v: 14, l: '14km'}, {v: 14.25, l: '14.25km'}, {v: 14.5, l: '14.5km'}, {v: 14.75, l: '14.75km'}, {v: 15, l: '15km'}, {v: 15.25, l: '15.25km'}, {v: 15.5, l: '15.5km'}, {v: 15.75, l: '15.75km'}, {v: 16, l: '16km'}, {v: 16.25, l: '16.25km'}, {v: 16.5, l: '16.5km'}, {v: 16.75, l: '16.75km'}, {v: 17, l: '17km'}, {v: 17.25, l: '17.25km'}, {v: 17.5, l: '17.5km'}, {v: 17.75, l: '17.75km'}, {v: 18, l: '18km'}, {v: 18.25, l: '18.25km'}, {v: 18.5, l: '18.5km'}, {v: 18.75, l: '18.75km'}, {v: 19, l: '19km'}, {v: 19.25, l: '19.25km'}, {v: 19.5, l: '19.5km'}, {v: 19.75, l: '19.75km'}, {v: 20, l: '20km'}, {v: 20.25, l: '20.25km'}, {v: 20.5, l: '20.5km'}, {v: 20.75, l: '20.75km'}, {v: 21, l: '21km'}, {v: 21.25, l: '21.25km'}, {v: 21.5, l: '21.5km'}, {v: 21.75, l: '21.75km'}, {v: 22, l: '22km'}, {v: 22.25, l: '22.25km'}, {v: 22.5, l: '22.5km'}, {v: 22.75, l: '22.75km'}, {v: 23, l: '23km'}, {v: 23.25, l: '23.25km'}, {v: 23.5, l: '23.5km'}, {v: 23.75, l: '23.75km'}, {v: 24, l: '24km'}, {v: 24.25, l: '24.25km'}, {v: 24.5, l: '24.5km'}, {v: 24.75, l: '24.75km'} ]
      radiusOptions: [{l: '100m', v: 100}, {l: '300m', v: 300}, {l: '600m', v: 600}, {l: '1km', v: 1000}, {l: '3km', v: 3000}]
    }
  }
  settingItem (itemText, control) {
    return (
      <ListItem>
        <Body >
          <Text style={styles.listItemText}>{itemText}</Text>
        </Body>
        <Right style={{ alignItems: 'center'}}>
          <View style={{ width: 100 }}>{control}</View>
        </Right>
      </ListItem>
    )
  }
  // radiusItem () {
  //   return (
  //     <ListItem>
  //       <Body >
  //         <Text style={styles.listItemText}>{Lang.txt_S08}</Text>
  //       </Body>
  //       <Right style ={{ alignItems: 'center'}}>
  //         <View style ={{width: '100%', height: '100%'}}>{ this.radiusPicker()}</View>
  //       </Right>
  //     </ListItem>
  //   )
  // }


  radiusPicker () {
    const { radius } = this.state
    return (
      <Picker
        mode={'dropdown'}
        selectedValue={radius}
        onValueChange={(itemValue, itemIndex) => { this._onChangeRadius(itemValue, itemIndex) }}>
        {/** __DEV__ && <Picker.Item value={'devId'} label={'devName'} key={'devkey'} /> */}
        {this.state.radiusOptions.map((l, i) => { return <Picker.Item value={l.v} label={l.l} key={l.v} /> })}
      </Picker>
    )
  }
  toMeter (kelometer = 0.25) {
    return kelometer * 1000
  }
  toKMter (meter = 250) {
    return meter * 0.001
  }
  componentDidMount () {
    const { radius } = this.props
    this.setState({radius: radius})
  }
  _onChangeRadius (itemValue, itemIndex) {
    this.setState({radius: itemValue})
    // this.props.setRadius(this.toMeter(itemValue)) // convert to meters
    this.props.setRadius(itemValue)
  }

  render () {
    const { title, design, navigation } = this.props
    return (
      <Container>
        <HeaderInDrawer title={title} navigation={navigation} />
        <Content >
          <View style={{ alignContent: 'center', backgroundColor: '#FFFFFF' }} padder>
            <List>
              {/*
              as of now this will be disabled
              <Separator />
              { this.settingItem(Lang.txt_S05, <Switch value={this.state.isSwitchA} onValueChange={(value) => { console.log(value); this.setState({ isSwitchA: value }) }} />)}
              { this.settingItem(Lang.txt_S06, <Switch value={this.state.isSwitchB} onValueChange={(value) => { console.log(value); this.setState({ isSwitchB: value }) }} />)}
              { this.settingItem(Lang.txt_S07, <Switch value={this.state.isSwitchC} onValueChange={(value) => { console.log(value); this.setState({ isSwitchC: value }) }} />)}
                 */}
              <Separator />
              { this.settingItem(Lang.txt_S08, this.radiusPicker())}{/** radius */}
            </List>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    design: state.user.design,
    radius: state.user.user.radius
  }
}

const mapDispatchToProps = dispatch => {
  return {

    setRadius: (radius) => dispatch(UserActions.userChangeRadius(radius)) // as of now no live updater: none in backend
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingForm)
