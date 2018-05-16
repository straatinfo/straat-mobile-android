// import React from 'react'
import AlertBox from '../../Components/AlertBox'
import language from '../CutomLanguage'

export const errorAlert = (errorMessage, pressok = () => {}) => {
  AlertBox.alert(
      language.error,
      errorMessage, [{text: 'OK', onPress: () => pressok()}],
      { cancelable: false }
    )
}

export const popUpAlert = ({title, message, pressok = () => {}}) => {
  AlertBox.alert(
      title,
      message, [{text: 'OK', onPress: () => pressok()}],
      { cancelable: false }
    )
}

export const popUpAlertV2 = (title, message, pressok = () => {}) => {
  AlertBox.alert(
      title,
      message, [{text: 'OK', onPress: () => pressok()}],
      { cancelable: false }
    )
}
