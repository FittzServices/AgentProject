import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      backgroundColor: 'white'
    },
    card:{
        flexDirection:'row',
    },
    cardContent:{
        width:200,
        height:162,
        backgroundColor: 'green',
        marginLeft:5,
        marginTop:5,
        alignContent:"center",
        alignItems:'center',
        justifyContent:'center'
    },
    cardContent2:{
        width:200,
        height:162,
        backgroundColor: 'green',
        marginLeft:5,
        marginRight:5,
        marginTop:5,
        alignContent:"center",
        alignItems:'center',
        justifyContent:'center'
    },
    icon:{
        color:'white',
    },
    text:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },
});

export default styles;
