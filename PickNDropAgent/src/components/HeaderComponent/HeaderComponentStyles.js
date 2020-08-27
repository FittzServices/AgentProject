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
        fontSize: 40
    },
    headerText:{
        color:'aqua',
        fontSize: 20,
        fontWeight:'bold',
    },
    logo:{
        width: 50,
        height:50,
    },
    imageContainer:{
        width:50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft:20
    },
    imageContainerZoom:{
      
        alignItems: "center",
        justifyContent: "center",
    },
    driverPic: {
        borderColor: "aqua",
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    driverPicZoom: {
        borderColor: "aqua",
        borderWidth: 1,
        height: 300,
        width: 300,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }

})

export default styles