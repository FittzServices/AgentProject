const styles = {
    container:{
      display:'flex',
      backgroundColor:'black',
      height: '100%',
      width: '100%',
      position: 'relative',
      alignItems:'center'
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
        backgroundColor:"#FF5E3A",
        
      },
      margin:{
        marginTop:200
      },
      headerText:{
        color:'aqua',
        fontSize: 40,
        fontWeight:'bold',
        marginTop:70,
      },
};
export default styles;