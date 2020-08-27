import React from 'react';
import {Actions, Scene, Stack} from 'react-native-router-flux';
import LoginCover from './Login/components/LoginCover';
import Signup from './SignUp/components/Signup';
import HomeContainer from './Home/containers/HomeContainer';
import {TouchableOpacity} from 'react-native';
import LaunchScreen from './LoadingScreen';
import Orders from '../components/Orders';
import Services from '../components/Services';
import Profile from '../components/Profile'
import AboutUs from '../components/AboutUs'
import Support from '../components/Support'
import Incident from '../components/Incident'

const renderNullButton = () => {
  return <TouchableOpacity onPress={() => {}}></TouchableOpacity>;
};

const scenes = Actions.create(
  <Stack key="root">
    <Scene
      hideNavBar
      key="loading"
      component={LaunchScreen}
      renderBackButton={() => renderNullButton()}
      initial
    />
    <Scene
      hideNavBar
      key="Login"
      component={LoginCover}
      renderBackButton={() => renderNullButton()}
    />
    <Scene
      hideNavBar
      key="Signup"
      component={Signup}
      renderBackButton={() => renderNullButton()}
    />
    <Scene
      hideNavBar
      key="Home"
      component={HomeContainer}
      renderBackButton={() => renderNullButton()}
    />
    <Scene
      hideNavBar
      key="Signup"
      component={Signup}
      renderBackButton={() => renderNullButton()}
    />
    <Scene key="order" component={Orders} />
    <Scene key="service" component={Services} />
    <Scene key="profile" component={Profile} />
    <Scene key="support" component={Support} />
    <Scene key="aboutUs" component={AboutUs} />
    <Scene key="incident" component={Incident} />
  </Stack>,
);

export default scenes;
