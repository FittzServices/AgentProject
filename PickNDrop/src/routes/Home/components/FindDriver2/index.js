import React from "react";
import {Text} from "react-native";
import { View, Button} from "native-base";

import styles from "./FindDriverStyles";
import Icon from "react-native-vector-icons/FontAwesome"
import { Actions } from "react-native-router-flux";

const Spinner = require('react-native-spinkit');


export const FindDriver2 = ({ initialAddress })=>{
   

        return (
            <View style={styles.findDriverContainer}>
    
            <Spinner style= {styles.spinner} isVisible size={150} type="Pulse" color='white' />
    
            <View style={styles.content}>
                <Text style={styles.text}> Processing your request</Text>
                <Icon style={styles.locationIcon} name="map-marker" />
                <View style={styles.pickup}>
                    <Text>{initialAddress}</Text>
                  
                </View>
                <Icon style={styles.toArrow} name="arrow-down" />
            <View style={styles.dropoff}>
                <Text>Disposal Site</Text>
               
            </View>

                <View>
                    <Text style={styles.termsText}>By booking you confirm that you accept out T & C</Text>
                    <Button style={styles.cancelBtn} onPress={()=>Actions.popTo('PinkNDrop')}> 
                        <Text style={styles.cancelBtnText} >Cancel</Text>
                    </Button>
                </View>
    
            </View>
    
            </View>
    
        );
    
}

export default  FindDriver2