import React from "react";
import {Text} from "react-native";
import { View, Button} from "native-base";

import styles from "./FabStyles.js";


export const Fab2 = ({onPressAction,ChangeEnableButton,enableButton})=>{
function ActionButton() {
	onPressAction()
	ChangeEnableButton()


setTimeout(()=>{
	ChangeEnableButton()

},5000)
	
}

	
	return (
		
		<Button disabled={enableButton} style={styles.fabContainer} onPress={()=>ActionButton()} >
		<Text style={styles.btnText}> Book </Text>
	
		</Button>
		
		

	);
}

export default  Fab2