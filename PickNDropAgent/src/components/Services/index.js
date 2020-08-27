import React from 'react';
import {View, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import styles from './ServicesStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

export const Services = ({logout, userName, profile}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => Actions.profile({profile})}
          style={styles.cardContent}>
          <Icon name="user-circle" style={styles.icon} size={100} />
          <Text style={styles.text}>{userName.firstname}'s Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardContent2}>
          <Icon
            onPress={() => Actions.order()}
            name="compass"
            style={styles.icon}
            size={100}
          />
          <Text style={styles.text}>Bookings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => Actions.incident()}
          style={styles.cardContent}>
          <Icon name="exclamation-triangle" style={styles.icon} size={100} />
          <Text style={styles.text}>Incident</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Actions.support()}
          style={styles.cardContent2}>
          <Icon name="cogs" style={styles.icon} size={100} />
          <Text style={styles.text}>Support</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity style={styles.cardContent}>
          <Icon name="paste" style={styles.icon} size={100} />
          <Text style={styles.text}>Policies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Actions.aboutUs()}
          style={styles.cardContent2}>
          <Icon name="building" style={styles.icon} size={100} />
          <Text style={styles.text}>About Us</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={styles.cardContent}>
          <Icon name="map-marker" style={styles.icon} size={100} />
          <Text style={styles.text}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()} style={styles.cardContent2}>
          <Icon name="sign-out" style={styles.icon} size={100} />
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Services;
