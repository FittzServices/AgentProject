import React from 'react';
import {Header, View, Text, Left, Body, Right, Button} from 'native-base';
import styles from './SwitchStyles';

export const Switch = ({
  sendSwitchData,
  showSwitch,
  sendActiveData,
  driverLocationMongoDB,
  getDriverLocationMongodb,
}) => {
  const {active} = driverLocationMongoDB;
  const handleData = val => {
    const sendData = val;
    sendActiveData({sendData});
    sendSwitchData({sendData});
    getDriverLocationMongodb();
  };

  if (active && active === 'true') {
    return (
      <View>
        {(showSwitch === true && (
          <Button style={styles.container} onPress={() => handleData('false')}>
            <Text style={styles.txt}>SWITCH OFFLINE</Text>
          </Button>
        )) ||
          null}
      </View>
    );
  } else {
    return (
      <View>
        {(showSwitch === true && (
          <Button style={styles.container} onPress={() => handleData('true')}>
            <Text style={styles.txt}>GO ONLINE</Text>
          </Button>
        )) ||
          null}
      </View>
    );
  }
};

export default Switch;
