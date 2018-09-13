import React from 'react'
import { connect } from 'react-redux'
import { View, Picker } from 'react-native'
import {
  Text,
  Container,
  Content,
  Right,
  Body,
  List,
  ListItem,
  Separator
} from 'native-base'

import ValidationComponent from 'react-native-form-validator'
import UserActions from './../../Redux/UserRedux'
import HeaderInDrawer from '../../Components/HeaderInDrawer'

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
      radius: 0.25,
      radiusOptions: [{l: '100m', v: 100}, {l: '300m', v: 300}, {l: '600m', v: 600}, {l: '1km', v: 1000}, {l: '3km', v: 3000}]
    }
  }

  settingItem (itemText, control) {
    return (
      <ListItem>
        <Body >
          <Text style={styles.listItemText}>{itemText}</Text>
        </Body>
        <Right style={{ alignItems: 'center' }}>
          <View style={{ width: 100 }}>{control}</View>
        </Right>
      </ListItem>
    )
  }

  radiusPicker () {
    const { radius } = this.props
    return (
      <Picker
        mode={'dropdown'}
        selectedValue={parseInt(radius)}
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
    const { title, navigation, Lang } = this.props
    return (
      <Container>
        <HeaderInDrawer title={title} navigation={navigation} />
        <Content >
          <View style={{ alignContent: 'center', backgroundColor: '#FFFFFF' }} padder>
            <List>
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
    radius: state.user.user.radius,
    Lang: state.language.Languages
  }
}

const mapDispatchToProps = dispatch => {
  return {

    setRadius: (radius) => dispatch(UserActions.userChangeRadius(radius)) // as of now no live updater: none in backend
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingForm)