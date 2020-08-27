/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  Button,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';

import {View, InputGroup, Input, Button as Btn} from 'native-base';
import {getLoginInputData, getUserToken} from '../modules/login';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './LoginStyles';
import {Actions} from 'react-native-router-flux';
import {validate} from 'validate.js';

import constraints from './constraints';

class LoginCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: '',
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.isAuthenticated) {
      Actions.Home();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.inputError) {
      this.setState({
        loginError: nextProps.inputError,
      });
    }
  }

  handleSubmit() {
    const {email} = this.state;
    const change_to_lowercase = String(email).toLocaleLowerCase;
    console.log(change_to_lowercase);
    const validationResult = validate(change_to_lowercase, constraints);
    console.log(validationResult);

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.getLoginInputData({userData});
  }

  render() {
    const {password, email} = this.state;
    console.log(this.state.loginError);
    const {loginError} = this.state;

    return (
      <ImageBackground
        source={require('../../../assets/Images/leaveBlack.jpg')}
        style={styles.container}>
        <View>
          <Text style={styles.headerText}>
            PICK <Text style={styles.txtStyle}>'N'</Text> DROP
          </Text>
          <Text style={styles.headerText2}>AGENT</Text>
        </View>
        {/* <form method='POST' action='http:localhost:5000/api/step2'> */}
        <KeyboardAvoidingView behavior="padding" enabled>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.info}>
              <Text style={styles.label}>Email</Text>
              <InputGroup style={styles.inputSearch}>
                <Icon name="envelope-square" size={30} color="red" />
                <Input
                  placeholder="email"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'email-address'}
                  returnKeyType="done"
                  autoCapitalize="none"
                  onChangeText={email => this.setState({email})}
                  value={email}
                  id="email"
                />
              </InputGroup>

              {loginError.emailnotfound && (
                <Text style={styles.err}>{loginError.emailnotfound}</Text>
              )}
              {loginError.email && (
                <Text style={styles.err}>{loginError.email}</Text>
              )}
              <Text style={styles.label}>Password</Text>
              <InputGroup style={styles.inputSearch}>
                <Icon name="key" size={30} color="red" />
                <Input
                  placeholder="password"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'name-phone-pad'}
                  returnKeyType="done"
                  secureTextEntry={true}
                  onChangeText={password => this.setState({password})}
                  value={password}
                  id="password"
                />
              </InputGroup>
              {loginError.password && (
                <Text style={styles.err}>{loginError.password}</Text>
              )}
              {loginError.passwordincorrect && (
                <Text style={styles.err}>{loginError.passwordincorrect}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={[{opacity: 0.9}, styles.button]}
            onPress={() => this.handleSubmit()}>
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

const mapStateToProps = state => ({
  inputLoginData: state.login.inputData || {},
  inputError: state.login.inputError || {},
  isAuthenticated: state.login.isAuthenticated,
  token: state.login.token,
});

const mapActionCreators = {
  getLoginInputData,
  getUserToken,
};

export default connect(mapStateToProps, mapActionCreators)(LoginCover);
