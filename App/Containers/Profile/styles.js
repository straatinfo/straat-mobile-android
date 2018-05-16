import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    viewheader: {
        height: 150,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    profileroundimage: {
        width: 100,
        height: 100,
        borderRadius: 150 / 2,
    },
    viewheader1: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginTop: 3,
        padding: 10
    },
    buttonview: {
        flex: 1,
        //  height: 50,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        marginBottom: 30
    },
    lgstyle: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#96acc7'
    },
    buttontext: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color : "#6e85a1",
    },
    inProfileTxtheader : {
        fontSize : 20,
        color : "#96acc7",
        marginTop: 10
    },
    inProfileTxt : {
        fontSize : 20,
        color : "#6e85a1",
        marginTop: 10
    },

})
export default styles;