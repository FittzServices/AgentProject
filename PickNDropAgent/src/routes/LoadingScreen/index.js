import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Text,} from 'react-native';
import {View, ActionSheet} from 'native-base';
import styles from './LoadingStyles';
import {getLoginInputData,getUserToken} from '../Login/modules/login'
import { Actions } from 'react-native-router-flux';


class LaunchScreen extends Component {
    componentDidMount(){
       setTimeout(()=>{
           this.props.getUserToken()
       },1000) 

       setTimeout(()=>{
           if (this.props.token!==null){
              Actions.Home()
           }else{
            Actions.Login()
           }
       },1500)
    }

    render() {
        return (
            <View style={styles.container}>
        <View style={styles.margin}>
          <Text style={styles.headerText}>
            PICK <Text style={styles.txtStyle}>'N'</Text> DROP
          </Text>
          
        </View>
            </View>
        )
    }
}

const mapStateToProps = (state)=>({
    inputLoginData:state.login.inputData || {},
    inputError:state.login.inputError || {},
    token:state.login.token,
    isAuthenticated: state.login.isAuthenticated,
  })
  
  const mapActionCreators ={
    getLoginInputData,
    getUserToken
  }


  export default connect(mapStateToProps,mapActionCreators)(LaunchScreen) 
