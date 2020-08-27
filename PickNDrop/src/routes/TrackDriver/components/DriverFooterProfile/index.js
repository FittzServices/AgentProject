import React from "react";
import {Text, Image} from "react-native";
import { View, Button} from "native-base";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/FontAwesome";
import call from 'react-native-phone-call';
import styles from "./DriverFooterStyles.js";

export const DriverFooterProfile = ({ driverInfo, getDriverLocation})=>{
	const { ProfilePic, rating,driverPhone } = driverInfo || "";
function handleCall() {
	const args={
		number: driverPhone,
		prompt:false
	}

	call(args)
	.catch(console.error)
}
	
	const ImagePic=`https://pick-drop-server.herokuapp.com${ProfilePic}`
	return (
		<View style={styles.footerContainer}>
			<View style={styles.imageContainer}>
				<Image resizemode="contain" style={styles.driverPic} source={{uri:ImagePic}} />
			</View>
			<View style={styles.ratingContainer}>
				<StarRating
					starSize={20}
					disabled={true}
					maxStars={5}
					rating={rating}
					starColor="red"
				/>
			</View>
			<View  style={styles.iconContainer}/>
			<View style={styles.iconContainer}>
				<Icon name="phone" size={30} style={styles.icon}/>
			</View>
			<View style={styles.iconContainer}>
				<Icon name="comment-o" size={30} style={styles.icon} />
			</View>
		</View>

	);
}

export default DriverFooterProfile;