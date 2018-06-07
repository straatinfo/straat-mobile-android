import React from 'react'
import { Text } from 'native-base'

export default (props) => {
  const { title } = props
  return (
    <Text style={{color: '#6e85a1', fontSize: 30}}>{title}</Text>
  )
}
