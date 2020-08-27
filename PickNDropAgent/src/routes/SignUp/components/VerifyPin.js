
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  StyleSheet,
  Text,
  Button,
  KeyboardAvoidingView ,
} from 'react-native';
import { View, Alert,} from "native-base"
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { Actions } from 'react-native-router-flux';
import {getSignupInputData,verifyCode} from '../modules/signup'


class VerifyPin extends Component {
  constructor(props){
    super(props);
    this.state={
        code:'',
        valid:false,
        signupId:''
    }
  }
    pinInput = React.createRef();

    _checkCode =(code)=>{

      const userData ={
        token:code,
        id: this.props.inputSignupData.id,
        newUser:this.props.inputSignupData.newUser
      }
      if(code){
        this.props.verifyCode({userData})
          if (this.props.token.error) {
            this.pinInput.current.shake()
              .then(() => this.setState({ code: '' }))
           Alert.alert('Pick N Drop',this.props.token.error)
          }
        
         
      }
     
     
    }

    UNSAFE_componentWillMount(){
      this.props.getSignupInputData()
     
    }
    




  render() {
  
    const { code, valid} = this.state;
 
 
    return (
   
      <View style={styles.container}>

        <View>
        <View style={styles.section}>
          <Text style={styles.title}>Verification code was successfully </Text>
          <Text style={styles.title}>sent to your phone number</Text>
        </View>

        <KeyboardAvoidingView behavior="padding">
        <View style={styles.section}>
          <Text style={styles.title}>Insert your verification code</Text>
          <SmoothPinCodeInput
            ref={this.pinInput}
            value={code}
            codeLength={6}
            onTextChange={code => this.setState({ code })}
            onFulfill={this._checkCode}
            onBackspace={() => console.log('No more back.')}
            />
        </View>
        
        
        </KeyboardAvoidingView>
        </View>
        
      </View> 
    
        
    );
  }
}
const mapStateToProps = (state)=>({
  inputSignupData:state.signup.inputSignupData || {},
  token:state.signup.token || {},
})
const mapActionCreators ={
  getSignupInputData,verifyCode
}

export default connect(mapStateToProps,mapActionCreators)(VerifyPin) 


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:130
    },
    section: {
      alignItems: 'center',
      margin: 16,
      marginTop:30
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },

  });