import React, {Component} from 'react';
import {Header, Left, Body, Right, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {logoutUser} from '../../routes/Login/modules/login';
import {connect} from 'react-redux';
import styles from './FooterStyles';
import {Actions} from 'react-native-router-flux';

class FooterContainer extends Component {
  handleChange = () => {
    console.log('hello');

    this.props.logoutUser();
  };

  render() {
    const logout =this.props.logoutUser
    const profile=this.props.inputLoginData
    const { active } = this.props.driverLocationMongoDB;
    console.log(active);
    const userName= {
      firstname:this.props.inputLoginData.FirstName,
    }
    const actions = [
      {
        color: 'black',
        buttonSize: 60,
        text: 'Services',
        icon: <Icon name="cog" size={45} color="aqua" />,
        name: Actions.service,
        position: 1,
      },
      {
        color: 'black',
        buttonSize: 60,
        text: 'Logout',
        icon: <Icon name="sign-out" size={50} color="red" />,
        name: this.handleChange,
        position: 2,
      },
    ];
    return (
      <View>
        <Header style={{backgroundColor: 'black'}} iosBarStyle="light-content">
          <Left>
            <FloatingAction
              style={styles.move}
              animated={true}
              buttonSize={65}
              floatingIcon={<Icon name="compass" style={styles.icon} />}
              color="black"
              position="right"
              onPressMain={() => Actions.order()}
            />
          </Left>
          <Body>
          {active==='true' &&
          <Text style={styles.headerText}>Online</Text>
          ||          
          <Text style={styles.headerText}>You're offline</Text>
          }
            
          </Body>

          <Right>
            <FloatingAction
              style={styles.move}
              animated={true}
              buttonSize={65}
              floatingIcon={<Icon name="bars" size={40} color="aqua" />}
              color="black"
              position="right"
              actions={actions}
              onPressItem={name => name({logout,userName,profile})}
            />
          </Right>
        </Header>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.home.isAuthenticated,
  loginError: state.home.loginError,
  inputLoginData: state.login.inputLoginData
});
const mapActionCreators = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionCreators)(FooterContainer);
