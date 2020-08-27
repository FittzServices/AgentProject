import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = {
    fareContainer: {
        width:width,
        height:40,
        padding:10,
        backgroundColor:"aqua"
    },
    fareText: {
        fontSize: 15
    },
    amount:{
        fontWeight:"bold",
        fontSize: 15
    }
};

export default styles;