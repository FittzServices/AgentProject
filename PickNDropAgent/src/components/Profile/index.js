import React from 'react';
import {View, Text} from 'native-base';
import { StyleSheet} from 'react-native'

export const Profile = ({profile}) => {
  return (
    <View style={styles.container}>
      <View>
            <Text style={styles.title}>Profile</Text>
      </View>
      <View>
            <Text style={styles.texta}>First Name</Text>
            <Text style={styles.textp}>{profile.FirstName}</Text>
        </View>
        <View>
            <Text style={styles.texta}>Last Name</Text>
            <Text style={styles.textp}>{profile.LastName}</Text>
        </View>
        <View>
            <Text style={styles.texta}>Phone Number</Text>
            <Text style={styles.textp}>{profile.MobileNumber}</Text>
        </View>





      <Text style={{fontSize: 15, marginTop: 50, fontStyle:'italic'}}>To change this details please contact support</Text>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
      marginRight: 25,
      marginLeft:25,
      marginTop:25
    },
    title: {
      color: 'tomato',
      fontSize: 25,
      textAlign: 'left',
      fontStyle: "italic",
      fontWeight:'bold', 
      marginBottom:15
    },
    texta:{
      marginTop:20,
      marginBottom:20,
      fontSize:20,
      color: 'blue',
  },
  textp:{
      marginTop:5,
      marginBottom:5,
      fontSize:20,
  }
})
