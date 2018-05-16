import { StyleSheet ,Dimensions } from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        width:width,
        marginLeft:20,
        marginRight:20,
    },
    cancelBtn:{
        height:20,
        width:20,
        margin:5,
        resizeMode: 'contain',
    },
    cancelBtnContainer:{
        height:30,
        justifyContent:'space-between',
        flexDirection: 'row',
        alignItems:'stretch',
        marginLeft:20,
        marginRight:20,
        marginTop:20
    },
    iconStyle: {
      fontSize: 22,
      color: '#646568',
      margin: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    buttonContainer:{
        height: 50,
        justifyContent: 'center',
        marginLeft:0,
        marginRight:0,
    },
});

export default styles;