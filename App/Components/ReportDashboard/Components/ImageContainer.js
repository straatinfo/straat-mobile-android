import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation, TouchableHighlight} from 'react-native'
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Spinner, Title, Container,
   Card, CardItem, ListItem, Right, Radio, Left, Content, Segment, Header, Tabs, Tab, TabHeading, List, Switch, Body} from 'native-base'
import ImagePicker from 'react-native-image-picker'

import RowView from '../../RowView'
import CenterView from '../../CenterView'
import Lang from './../../../Lib/CutomLanguage'
import GeneralDesign from './../../../Lib/GeneralDesign'
import Images from './../../../Themes/Images'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spacer from '../../Spacer'

import colors from './../../../Themes/Colors'
import loaderHandler from 'react-native-busy-indicator/LoaderHandler'

export default class CreateTeam extends Component {
  constructor (props) {
    super(props)
    this.state = {
     // reportImages: [{uri: 'content://media/external/images/media/19486'}, {uri: 'content://media/external/images/media/19486'}] // 0 to 9
    }
  }

  static defaultProps = {source: []}

  static propTypes = {
    style: PropTypes.object,
    onClose: PropTypes.func,
    source: PropTypes.array
  }

  _addImage () {
    console.log('add images');
    const { addItem } = this.props
    const options = {
      title: 'Maak een keuze',
      cancelButtonTitle: 'Annuleer',
      takePhotoButtonTitle: 'Maak een nieuwe foto...',
      chooseFromLibraryButtonTitle: 'Kies een bestaande foto...',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    loaderHandler.showLoader(Lang.txt_A03) // NOT NEED becouse of reduz saga
    ImagePicker.showImagePicker(options, (response) => {
      console.log(options);
      if (response.didCancel || response.error || response.customButton) {
        loaderHandler.hideLoader()
      } else {
        // __DEV__ && console.log(response)
        delete (response.data)
        addItem(response)
      }
    })
  }

  _removeItem (image, index) {
    const { removeItem } = this.props
    removeItem(index)
  }

  _renderImagesItem (image, index) {
    return <ReportImageBox addItem={this._addImage.bind(this)} removeItem={this._removeItem.bind(this)} imageIndex={index} image={image} key={index} />
  }

  render () {
    const { source: reportImages } = this.props
    const style = {
      container: {backgroundColor: colors.background},
      row: { flex: 1, backgroundColor: 'white' }
    }
    const blackSlot = {uri: ''}
    let imageRowA = [...reportImages.slice(0, 3)]
    let imageRowB = [...reportImages.slice(3, 6)]
    let imageRowC = [...reportImages.slice(6, 9)]
    // add blanck -> on spec
    if (reportImages.length < 3) {
      let blanckSpace = 3 - imageRowA.length
      for (let i = 0; i < blanckSpace; i++) {
        imageRowA.push(blackSlot)
      }
    } else if (reportImages.length > 2 && reportImages.length < 6) {
      let blanckSpace = 3 - imageRowB.length
      for (let i = 0; i < blanckSpace; i++) {
        imageRowB.push(blackSlot)
      }
    } else if (reportImages.length > 5 && reportImages.length < 9) {
      let blanckSpace = 3 - imageRowC.length
      for (let i = 0; i < blanckSpace; i++) {
        imageRowC.push(blackSlot)
      }
    }

    return (
      <View style={style.container}>
        {[imageRowA, imageRowB, imageRowC].map((images, index) => {
          return images.length > 0 && <RowView style={style.row} key={'key-' + index}>
              { images.map((image, i) => this._renderImagesItem(image, i)) }
            </RowView>
        })}
      </View>
    )
  }
}

const imageStyle = {
  picStyle2: {
    height: 200,
    width: '90%'
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#f2faff',
    zIndex: 9999,
    borderRadius: 20,
    borderColor: '#dce9f2',
    borderWidth: 1

  },
  imagesHodler: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
    margin: 2.5
  },
  imageHodler: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#c6e1f2',
    width: '100%',

    height: 210
  },
  close: {
    fontSize: 22,
    color: '#babbc1'
  },
  add: {
    fontSize: 30,
    color: '#babbc1'
  }
}

const ReportImageBox = (props) => {
  if (props.image && props.image.uri) {
    return (
      <View style={imageStyle.imagesHodler}>
        <View style={imageStyle.imageHodler} >
          <Image style={imageStyle.picStyle2} source={{uri: props.image.uri}} />
          <TouchableOpacity style={imageStyle.closeButton} onPress={() => props.removeItem(props.image, props.imageIndex)}><Icon style={imageStyle.close} name={'close'} /></TouchableOpacity>
        </View>
      </View>
    )
  } else {
    // return blank slot
    return (
      <View style={imageStyle.imagesHodler}>
        <TouchableOpacity style={imageStyle.imageHodler} onPress={() => { props.addItem() }}><Icon style={imageStyle.add} name={'add'} /></TouchableOpacity>
      </View>
    )
  }
}
