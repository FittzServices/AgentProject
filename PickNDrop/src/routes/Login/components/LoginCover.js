
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React from 'react'

import {
  Text,
  Button,
  TouchableHighlight,
  KeyboardAvoidingView ,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';
import { View, InputGroup, Input} from "native-base"
import {connect} from 'react-redux'

import Icon from "react-native-vector-icons/FontAwesome"
import styles from './LoginStyles'
import data from '../../../assets/country'
import {Actions} from 'react-native-router-flux'


import {getLoginInputData,
  } from '../modules/login'


const defaultFlag = data.filter(
  obj => obj.name === 'Nigeria'
  )[0].flag


  

 class LoginCover extends React.Component {
  state = {
    flag: defaultFlag,
    modalVisible: false,
    phoneNumber: '+234',
    loginToken:''
  }
UNSAFE_componentWillMount(){
  this.props.getLoginInputData()
 
}

  showModal() {
    this.setState({ modalVisible: true })
  }
  hideModal() {
    this.setState({ modalVisible: false })
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus()
  }

  async selectCountry(country) {
    // Get data from Countries.js  
    const countryData = await data
    try {
      // Get the country code
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      // Get the country flag
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag
      // Update the state then hide the Modal
      this.setState({ phoneNumber: countryCode, flag: countryFlag })
      await this.hideModal()
    }
    catch (err) {
      console.log(err)
    }
  }


  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }



  handleLogin(){
    if(this.state.phoneNumber || this.state.phoneNumber !=''){
      
        if(this.state.phoneNumber.length < 10 ||this.state.phoneNumber.length >15){
         Alert.alert('Pick N Drop','Phone number is incorrect')
         
        }else{
          this.handleChangeNow();
        }
          
    }else{
      Alert.alert('Pick N Drop','Phone number is required field is required') 

    }
  }

  handleChangeNow(){
    const userData= {
      phoneNumber:this.state.phoneNumber
    }

    this.props.getLoginInputData({userData})
  }
    

  

  render() {
    const countryData = data
    
    return (
    
     <ImageBackground 
     source={require('../../../assets/Images/backgroundImage1.jpeg')}
     style={styles.container}>
    
      
          
      <View>
      
      <Text style={styles.headerText}>PICK <Text style={styles.txtStyle}>'N'</Text> DROP</Text>
      <Text style={styles.headerText2}>WASTE MANAGEMENT</Text>
      </View>
          {/* <form method='POST' action='http:localhost:5000/api/step2'> */}
          <KeyboardAvoidingView  behavior="padding" enabled>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style ={styles.info}>
             <Text style={styles.label}>Phone Number</Text>
                <InputGroup style={styles.inputSearch}>
                    <Icon name="phone" size={30} color="red"/>
                    <View ><Text style ={styles.IconS2}>{this.state.flag}</Text></View>
                    <Icon  style ={styles.IconS} name="caret-down" 
                      onPress={() => this.showModal()}
                    />
                    <Input
                        placeholder='+2340000000001'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'phone-pad'}
                        returnKeyType='done'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={false}
                        value={this.state.phoneNumber}
                        ref='PhoneInput'
                        onChangeText={(val) => this.onChangeText('phoneNumber', val)}
                        
                      />
 
                      {/* Modal for country code and flag */}
<Modal
  animationType="slide"
  transparent={false}
  visible={this.state.modalVisible}>
  <View style={{ flex: 1 }}>
    <View style={{ flex: 7, marginTop: 80 }}>
      {/* Render the list of countries */}
      <FlatList
        data={countryData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          ({ item }) =>
            <TouchableWithoutFeedback onPress={() =>this.selectCountry(item.name)}>
              <View style={styles.countryStyle}>
                <Text style={styles.textStyle}>
                  {item.flag} {item.name} ({item.dial_code})
                </Text>
              </View>
            </TouchableWithoutFeedback>
        }
      />
    </View>
    <TouchableOpacity
      onPress={() => this.hideModal()}
      style={styles.closeButtonStyle}>
      <Text style={styles.textStyle}>
        Cancel
      </Text>
    </TouchableOpacity>
  </View>
</Modal>
                </InputGroup>
                <Text style={styles.err}> {}</Text>
                </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
              
                <Button color='aqua'
                  title='Create an account'
                onPress={()=>Actions.Signup()}/>

        <View style={styles.buttonWrapper}>

        
        <TouchableHighlight style={[{ opacity: 0.9}, styles.button]}
         onPress= {() => this.handleLogin()}>
          <Icon
            name="sign-in"
            size={50}
            style={styles.icon}
            // onPress={()=>this.props.navigation.navigate('Home')}
          />
    
        </TouchableHighlight>
       
        </View>
       
        
     </ImageBackground>
     
   
    );
  }
}


const mapStateToProps = (state)=>({
  inputLoginData:state.login.inputLoginData || {},
  inputError:state.login.inputError || {},
})
const mapActionCreators ={
  getLoginInputData,

}

export default connect(mapStateToProps,mapActionCreators)(LoginCover) 
