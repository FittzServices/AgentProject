import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    txtStyle: {
        borderColor: "#fff",
        borderWidth: 1,
        color:"#fff",
        height: 60,
        width: 60,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right:20,
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        backgroundColor:"#FF5E3A"
    },
    icon:{
        color:'aqua',
        fontSize: 50,
       
    },
    headerText:{
        color:'aqua',
        fontSize: 20,
        fontWeight:'bold',
        marginTop:-20
    },
    logo:{
        width: 50,
        height:50,
    },

})

export default styles