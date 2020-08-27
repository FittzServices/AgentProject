import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = {
    container: {
        borderColor: "#fff",
        borderWidth: 1,
        height: 90,
        width: 90,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 100,
        right:20,
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        backgroundColor:"black",
        
        
    },
    text:{
        fontWeight:"bold",
        fontSize: 15,
        color:'aqua',
    }
};

export default styles;