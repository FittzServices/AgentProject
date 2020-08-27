import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper:{
    display:'flex'
  },
    container:{
      height: '100%',
      width: '100%',
      position: 'relative',
      alignItems:'center'
     
    },
    countryStyle:{
      marginLeft:30,
      justifyContent: "center",
      alignItems:'center'
    },
   
    textStyle:{
      padding:10,
      fontSize:25,
      color:'blue',
    },
    closeButtonStyle:{
      marginBottom:20,
      marginTop:20,
      alignItems:'center',
    },
    heading:{
        color:'white',
        fontSize:2.5,
        paddingBottom:10,
       
    },
 
    label:{
      fontSize:20,
      fontStyle: "italic",
      marginLeft:50,
      marginBottom:10,
      marginTop:10,
      color:'aqua',
      fontWeight:'bold',
      backgroundColor:'rgba(0,0,0,.6)',
      width:300
  },
  inputSearch:{
    backgroundColor:'white',
    marginRight:50,
    marginLeft:50
  },
  
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
  headerText:{
    color:'aqua',
    fontSize: 40,
    fontWeight:'bold',
    marginTop:60,
  },
  headerText2:{
    color:'aqua',
    fontSize: 20,
    fontWeight:'bold',
    marginBottom:90,
    marginTop:10,
    marginLeft:90,
  },
  buttonWrapper: {
    alignItems: "flex-end",
    left: 110,
    top: 50,
    paddingTop: 0
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    width: 80,
    height: 80,
    backgroundColor: '#FF5E3A'
  },
  icon: {
    marginRight: -2,
    marginTop: -2,
    color:'aqua'
  },
  IconS:{
    fontSize:23,
    color:"red", 
    marginLeft:5
  },
  IconS2:{
    fontSize:30,
    color:"red", 
    marginLeft:5
  },
  info:{
    width:400,
  
  },
  err:{
    color:'yellow',
    marginLeft:100,
    fontSize:18,
    fontWeight:'bold'
  },
  });
  export default styles;