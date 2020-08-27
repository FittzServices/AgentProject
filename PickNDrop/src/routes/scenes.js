import React from 'react';
import {Actions, Scene, Stack} from 'react-native-router-flux';
import HomeContainer from './Home/container/HomeContainer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View, TouchableOpacity, Button} from 'react-native';
import LoginCover from './Login/components/LoginCover';
import Signup from './Signup/components/Signup';
import VerifyPin from './Signup/components/VerifyPin';
import Profile from '../MyAccount/Profile';
import TrackDriverContainer from "./TrackDriver/container/TrackDriverContainer";


const renderBackButton = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View>
        <Icon
          name="user-circle"
          onPress={() => Actions.profile()}
          style={{
            color: '#FF5E3A',
            fontSize: 35,
            marginRight: 280,
            marginLeft: 20,
          }}
        />
      </View>
    </View>
  );
};

const renderNullButton = () => {
    return (
      <TouchableOpacity onPress={() => {}}>
      </TouchableOpacity>
    );
  };

const scenes = Actions.create(
  <Stack key="root">
    <Scene hideNavBar>
      <Scene key="Login" component={LoginCover} initial />
    </Scene>
    <Scene hideNavBar
      key="Signup"
      component={Signup}
      renderBackButton={() => renderNullButton()}
    />
    <Scene 
      key="home"
      component={HomeContainer}
      renderBackButton={() => renderBackButton()}
    />
    <Scene key="Verify" component={VerifyPin} />
    <Scene key="profile" component={Profile} />
    <Scene key="trackDriver" component={TrackDriverContainer} title="trackDriver"/>

  </Stack>,
);

export default scenes;
