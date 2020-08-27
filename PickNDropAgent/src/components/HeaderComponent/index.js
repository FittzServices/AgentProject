import React from 'react'
import {Header, Left, Body, Right, Button} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Text, View, Image,TouchableOpacity } from 'react-native'

import styles from './HeaderComponentStyles'



export const  HeaderComponent=({ inputLoginData,ToggleButton})=> {
  const { ProfilePic } = inputLoginData || "";
  const ImagePic=`https://pick-drop-server.herokuapp.com/${ProfilePic}`


    return (
      <View>
        <Header  style={{backgroundColor: "black",height:80}} iosBarStyle="light-content">
         
          <Left>
          
          <TouchableOpacity onPress={()=>ToggleButton()}  style={styles.imageContainer}>
				<Image resizemode="contain" style={styles.driverPic} source={{uri:ImagePic}} />
			</TouchableOpacity>
          </Left>  
            
                <Text style={styles.headerText}>PICK <Text style={styles.txtStyle}>'N'</Text> DROP</Text>
            
  
          <Right>
            <Button transparent>
                <Icon name="gift" style={styles.icon}/>
            </Button>
          </Right> 
        </Header>
    
      
      
        </View>
    )
}

export default HeaderComponent