
import React from "react";
import {Text,Button as Btn} from "react-native";
import { View, Button} from "native-base";

import styles from './SwitchButtonStyles'
import { Actions } from "react-native-router-flux";

export const SwitchButton = ({ToggleButton})=>{
	
	return (
		<View >
       
		<Btn title='change location' style={styles.container} onPress={()=>ToggleButton()} />
        

		</View>
		

	);
}

export default  SwitchButton
