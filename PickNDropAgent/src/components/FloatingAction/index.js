import React, { Component } from 'react'
import {Footer, FooterTab, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './FooterComponentStyles';
import {FloatingAction} from 'react-native-floating-action';
import {logoutUser} from '../../routes/Login/modules/login'
import { connect } from "react-redux";





class FloatingActionButton extends Component {
  //Bar Item
 handleChange=()=>{
   
  this.props.logoutUser()
   
 }

 handelProfile=()=>{
  Actions.profile()
 }
 handelAbout=()=>{
  Actions.about()
 }
 handelSupport=()=>{
  Actions.support()
 }
 render() {
  const actions = [
    {
      color: 'black',
      buttonSize: 60,
      text: 'Profile',
      icon: <Icon name="user-circle" size={45} color="tomato" />,
      name: this.handelProfile,
      position: 1,
    },
    {
      color: 'black',
      buttonSize: 60,
      text: 'About Us',
      icon: <Icon name="address-card" size={40} color="white" />,
      name: this.handelAbout,
      position: 2,
    },
    {
      color: 'black',
      buttonSize: 60,
      text: 'Support',
      icon: <Icon name="truck" size={45} color="aqua" />,
      name: this.handelSupport,
      position: 3,
    },
    {
      color: 'black',
      buttonSize: 60,
      text: 'Logout',
      icon: <Icon name="sign-out" size={50} color="green" />,
      name: this.handleChange,
      position: 4,
    },
  ];

  return (
    <FloatingAction
      style={styles.container}
      animated={true}
      buttonSize={30}
      floatingIcon={<Icon name="bars" size={45} color="aqua" />}
      color="black"
      position="left"
      actions={actions}
      onPressItem={(name)=>name()}/>
  );
};
}
const mapStateToProps = state => ({
  isAuthenticated: state.home.isAuthenticated,
  loginError: state.home.loginError,
});
const mapActionCreators = {
  logoutUser
};

export default connect(mapStateToProps, mapActionCreators)(FloatingActionButton);

