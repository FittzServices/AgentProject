import React from 'react';
import {Text} from 'react-native';
import {View, InputGroup, Input, Button} from 'native-base';
import {Card} from 'react-native-elements';

import SwitchButton from '../SwitchButton';
import styles from '../SearchBox/SearchBoxStyles';

export const FirstSearchBox = ({initialAddress, ToggleButton}) => {

    
  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>CURRENT LOCATION</Text>
        <Card style={styles.inputSearch}>
        <View>
          
          <Text >UNNAMED ADDRESS</Text>
      
        </View>
        
        </Card>

        <SwitchButton ToggleButton={() => ToggleButton()} />
      </View>
    </View>
  );
};

export default FirstSearchBox;
