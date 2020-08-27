
import React, { Component } from 'react'
import {Text, StyleSheet,TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
import { View, Button} from "native-base"
import {getLoginInputData} from '../routes/Login/modules/login'
import Icon from "react-native-vector-icons/FontAwesome"
import { Actions } from 'react-native-router-flux'
import {setLogoutState} from '../routes/Home/modules/home'

class Profile extends Component {
    UNSAFE_componentWillMount(){
        this.props.getLoginInputData()
       
      }


    render() {
     
        return (
            <View style={styles.container}>
            <Text style={styles.title}>{this.props.inputLoginData.fullName}</Text>
            <View style={styles.margin}>
            <Icon name="user-circle" size={200} color="white"/>
            </View>
            <View>
            <TouchableHighlight style={styles.wallet} onPress={()=>Actions.support()}>
            <View style={styles.txtStyle}>
            <Text style={styles.txt}>SUPPORT</Text>
            <Icon name="question-circle" size={50} color="aqua"/>
            </View>
            </TouchableHighlight>
            </View>
            <View>
            <TouchableHighlight style={styles.wallet} onPress={()=>Actions.about()}>
            <View style={styles.txtStyle}>
            <Text style={styles.txt}>ABOUT</Text>
            <Icon name="info-circle" size={50} color="aqua"/>
            </View>
            </TouchableHighlight>
            </View>
            <View>
            <TouchableHighlight style={styles.wallet} onPress={()=>this.props.setLogoutState()}>
            <View style={styles.txtStyle}>
            <Text style={styles.txt}>LOGOUT</Text>
            <Icon name="sign-out" size={50} color="aqua"/>
            </View>
            </TouchableHighlight>
            </View>
            </View>
        )
    }
}
const mapStateToProps = (state)=>({
  inputLoginData:state.login.inputLoginData || {},
  logout:state.home.logout || {},
})
const mapActionCreators ={
  getLoginInputData,
  setLogoutState
}

export default connect(mapStateToProps,mapActionCreators)(Profile) 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'aqua',
    fontSize: 30,
    width: 500,
    textAlign: 'center',
    fontStyle: "italic",
    fontWeight:'bold', 
  },
  wallet:{
    backgroundColor:'black',
    borderRadius: 40,
    width:180,
    height:80,
    marginTop:15,
    marginBottom:15
  },

  txtStyle:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:5
  },
  txt:{
    color:'aqua',
    fontSize:18,
    fontWeight:'bold',
  },
  margin:{
    marginBottom:10,
  }
})



  
  
