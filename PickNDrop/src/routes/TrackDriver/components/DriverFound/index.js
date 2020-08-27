import React from "react";
import {Text, Image} from "react-native";
import { View, Button} from "native-base";

import styles from "./DriverStyles.js";

export const DriverFound = ({ driverInfo, getDriverLocation})=>{
    const { ProfilePic } = driverInfo || "";

    const ImagePic=`https://pick-drop-server.herokuapp.com/${ProfilePic}`
    
    return (
		<View style={styles.findDriverContainer}>
			<View style={styles.content}>
				<Text>Driver Found!</Text>
				<Image resizemode="contain" style={styles.driverPic} source={{uri:ImagePic}} />
				<View style={styles.driverInfo}>
					<Text style={styles.quotationMarkLeft}>""</Text>
					<View style={styles.driverBio}>
						<Text style={styles.bioText}>
							Driver's Name is: 
						</Text>
						<Text style={styles.nameText}>
							{driverInfo.FirstName} {driverInfo.LastName}
						</Text>
						
					</View>
					<Text style={styles.quotationMarkRight}>""</Text>
				</View>
				<View style={styles.vehicleDetails}>
					<Text style={styles.vehicleText}>Vehicle Plate number:</Text>
					<Text style={styles.vehicleNumber}> {driverInfo.PlateNumber}</Text>
					<Text style={styles.vehicleText}>Vehicle Plate number:</Text>
					<Text style={styles.vehicleNumber}> {driverInfo.VehicleType}</Text>
					<Button  style={styles.nextBtn} onPress={()=>getDriverLocation()}>
						<Text style={styles.nextBtnText}>Next</Text>
					</Button>
				</View>
			</View>
			
		</View>

	);
}

export default  DriverFound