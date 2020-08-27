import React from "react";
import {Text} from "react-native";
import { View, Button} from "native-base";

import styles from "./FabStyles.js";
import { Actions } from "react-native-router-flux";


export const Fab = ({onPressAction})=>{


	
	return (
		
		<Button style={styles.fabContainer} onPress={()=>onPressAction()} >
		<Text style={styles.btnText}> Book </Text>
	
		</Button>
		
		

	);
}

export default  Fab