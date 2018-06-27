import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {position: 'absolute', width: '100%', height: '50%', top: 0, left: 0, zIndex: 999},
  content: {backgroundColor: 'transparent'}, // 'rgba(255, 255, 255, 0.40)'},
  listContainer: {backgroundColor: 'rgba(255, 255, 255, 0.95)', marginLeft: 0, paddingLeft: 10},
  listContentContainer: {flexDirection: 'column'},
  title: {alignSelf: 'flex-start', color: 'black', justifyContent: 'flex-start'},
  subTitle: {alignSelf: 'flex-start', color: 'black', justifyContent: 'flex-start', textAlign: 'justify'}
})
