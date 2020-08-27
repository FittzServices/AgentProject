/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';
import {View, InputGroup, Input, Button as Btn} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './SignupStyles';
import {Actions} from 'react-native-router-flux';
import data from '../../../assets/country';

import {getSignupInputData} from '../modules/signup';

const defaultFlag = data.filter(obj => obj.name === 'Nigeria')[0].flag;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '+234',
      fullName: '',
      errResponse: false,
      switch: false,
      modalVisible: false,
      flag: defaultFlag,
      modalVisible: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.props.getSignupInputData();
  }

  showModal() {
    this.setState({modalVisible: true});
  }
  hideModal() {
    this.setState({modalVisible: false});
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus();
  }

  onClickListener = () => {
    
    if (this.state.phoneNumber || this.state.phoneNumber != '') {
      if (this.state.fullName) {
        if (
          this.state.phoneNumber.length < 10 ||
          this.state.phoneNumber.length > 15
        ) {
          Alert.alert('Pick N Drop','Phone number is incorrect');
        } else {
          this.handleChange();
        }
      } else {
        Alert.alert('Pick N Drop','Full name is required');
      }
    } else {
      Alert.alert('Pick N Drop','Phone number is required');
    }
  };

  handleChange = () => {
    const userData = {
      phoneNumber: this.state.phoneNumber,
      fullName: this.state.fullName,
    };

    this.props.getSignupInputData({userData});
console.log(userData);

  };

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }

  async selectCountry(country) {
    // Get data from Countries.js
    const countryData = await data;
    try {
      // Get the country code
      const countryCode = await countryData.filter(
        obj => obj.name === country,
      )[0].dial_code;
      // Get the country flag
      const countryFlag = await countryData.filter(
        obj => obj.name === country,
      )[0].flag;
      // Update the state then hide the Modal
      this.setState({phoneNumber: countryCode, flag: countryFlag});
      await this.hideModal();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {fullName, phoneNumber} = this.state;
    const countryData = data;
    return (
      <ImageBackground
        source={require('../../../assets/Images/backgroundImage2.png')}
        style={styles.container}>
        <View>
          <Text style={styles.headerText}>
            PICK <Text style={styles.txtStyle}>'N'</Text> DROP
          </Text>
          <Text style={styles.headerText2}>WASTE MANAGEMENT</Text>
        </View>

        <Text style={styles.label2}>FullName</Text>

        <InputGroup style={styles.inputSearch}>
          <Icon name="users" size={25} color="red" />
          <Input
            placeholder="Insert your first name"
            onChangeText={fullName => this.setState({fullName})}
            value={fullName}
            id="fullName"
          />
        </InputGroup>

        <KeyboardAvoidingView behavior="padding" enabled>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.info}>
              <Text style={styles.label}>Phone Number</Text>

              <InputGroup style={styles.inputSearch}>
                <Icon name="phone" size={30} color="red" />
                <View>
                  <Text style={styles.IconS2}>{this.state.flag}</Text>
                </View>
                <Icon
                  style={styles.IconS}
                  name="caret-down"
                  onPress={() => this.showModal()}
                />
                <Input
                  placeholder="+2340000000001"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'phone-pad'}
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={false}
                  onChangeText={val => this.onChangeText('phoneNumber', val)}
                  id="phoneNumber"
                  value={phoneNumber}
                  ref="PhoneInput"
                />

                {/* Modal for country code and flag */}
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}>
                  <View style={{flex: 1}}>
                    <View style={{flex: 7, marginTop: 80}}>
                      {/* Render the list of countries */}
                      <FlatList
                        data={countryData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                          <TouchableWithoutFeedback
                            onPress={() => this.selectCountry(item.name)}>
                            <View style={styles.countryStyle}>
                              <Text style={styles.textStyle}>
                                {item.flag} {item.name} ({item.dial_code})
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        )}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => this.hideModal()}
                      style={styles.closeButtonStyle}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </InputGroup>
              <View >
              {this.props.signupError.phoneNumber && (
               
               <Text style={styles.err}>{this.props.signupError.phoneNumber}</Text>
            
           )}
              </View>
              
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <Button
          color="aqua"
          title="Already have an account?, Login"
          onPress={() => Actions.pop()}
        />
 
        <View style={styles.buttonWrapper}>
          <KeyboardAvoidingView behavior="padding">
            <Btn
              style={{
                opacity: 0.9
              }, styles.button}
              
              onPress={() => this.onClickListener()}>
              <Text style={styles.icon}>  <Icon
            name="sign-in"
            size={50}
            style={styles.icon}
            // onPress={()=>this.props.navigation.navigate('Home')}
          /></Text>
            </Btn>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  inputSignupData: state.signup.inputSignupData || {},
  signupError: state.signup.signupError || {},
});
const mapActionCreators = {
  getSignupInputData,
};

export default connect(mapStateToProps, mapActionCreators)(Signup);
