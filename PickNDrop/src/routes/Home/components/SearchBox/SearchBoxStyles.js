import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchBox:{
        top:0,
        position:"absolute",
        width:width
    },
    inputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:5,
        marginBottom:0,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7
    },
 
    secondInputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:0,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7,
    },
    inputSearch:{
        fontSize:14
    },
    label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0,
        color:'red'
    },
    icon:{
        color:'grey',
        fontSize: 30
    },
    headerText:{
        color:'aqua',
        fontSize: 20,
        fontWeight:'bold'
    },
};

export default styles;