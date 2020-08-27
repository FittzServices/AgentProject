import React from "react";
import {Text} from "react-native";
import { View} from "native-base";

import styles from "./FareStyles.js";

export const InitialFare = ({initialFare})=>{
	return (
		<View style={styles.fareContainer}>
			<Text>
				<Text style={styles.fareText}> PRICE: N</Text> <Text style={styles.amount}>{initialFare}</Text>
			</Text>
			
		</View>

	);
}

export default  InitialFare;