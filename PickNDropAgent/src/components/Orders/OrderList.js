import React from 'react';
import {View, Text, Button, } from 'native-base';
import{TouchableOpacity} from 'react-native'
import styles from './OrdersStyles';
import {Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import call from 'react-native-phone-call'

export const OrderList = ({
  bookingName,
  _callShowDirections,
  latitude,
  longitude,
  status,
  address,
  driverId,
  date,
  _id,
  sendDeliveredData,
  getAllBookings,
  mobile
}) => {
  const directions = {
    longitude,
    latitude,
  };
  const deliveredData = {
    _id: _id,
    status: 'delivered',
    driverId: driverId,
  };
  const handleDelivered = () => {
    sendDeliveredData(deliveredData);
    setTimeout(() => {
      getAllBookings();
    }, 1000);

    console.log(_id, 'has been delivered');
  };
  const handleCall =()=>{
    const args = {
      number:mobile, 
      prompt: false 
    }
    call(args).catch(console.error)
  
  }
  
  return (
    <View style={styles.container}>
    <Card style={styles.card}>
      <Text style={styles.name}>{address}</Text>
      <Text>REQUESTED BY</Text>
      <Text style={styles.name}>{bookingName}</Text>
       
      
      <Text>Booking Date: {date}</Text>
      {(status === 'confirmed' && (
        <Text>
          Request-Status: <Text style={styles.statYellow}>{status}</Text>
        </Text>
      )) || (
        <Text>
          Request-Status: <Text style={styles.statGreen}>{status}</Text>
        </Text>
      )}
      {(status !== 'delivered' && (
        <View>
        <TouchableOpacity onPress={()=>handleCall()}>
        <Icon name='phone' size={50} color='tomato'/>
      </TouchableOpacity>
          <Button
            style={styles.btn}
            onPress={() => {
              _callShowDirections(directions);
            }}
            color="#841584">
            <Text style={styles.txtBtn}>Start Pickup</Text>
          </Button>
          <Button onPress={() => handleDelivered()} style={styles.btn2}>
            <Text style={styles.txtBtn2}>End Request</Text>
          </Button>
        </View>
      )) ||
        null}

      {status === 'pending' && (
        <Button style={{backgroundColor: 'blue'}}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            confirm Request
          </Text>
        </Button>
      )}
      </Card>
    </View>
  );
};

export default OrderList;
