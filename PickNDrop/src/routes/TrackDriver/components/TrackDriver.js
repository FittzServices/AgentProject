import React from 'react'
import { View, Text } from 'react-native'
import { Container } from 'native-base'
import HeaderComponent from '../../../components/HeaderComponents'
import {Actions} from 'react-native-router-flux';
import MapTrack from './MapTrack'
import DriverFound from './DriverFound'
import DriverFooterProfile from './DriverFooterProfile'
import DriverOnTheWayFooter from './DriverOnTheWayFooter'



const carMarker = require("../../../assets/carMarker.png")

class TrackDriver extends React.Component {

UNSAFE_componentWillMount(){
    this.props.getCurrentLocation();
    this.props.getDriverInfo()

   
}
// componentDidUpdate(prevProps, prevState) {
  
//     if (this.props.booking.status === 'delivered') {
//         Actions.Login();
//         this.props.clearAfterStateDelivered();
        
//       } 
//   }

UNSAFE_componentWillReceiveProps(nextProps){
    if(this.props.driverLocation && nextProps.driverLocation !== this.props.driverLocation){
        this.props.getDistanceFromDriver()
    }
}


    render() {


    

        return( 
            
            <Container>
            <View style={{flex:1}}>
                <HeaderComponent/>
                {
                    this.props.region && 
                    <MapTrack
                        region={this.props.region}
                        selectedAddress={this.props.selectedAddress}
                        InitialBooking={this.props.InitialBooking}
                        driverLocation={this.props.driverLocation}
                        showCarMarker={this.props.showCarMarker}
                        carMarker={carMarker}
                    />
                }
                {
                    this.props.distanceFromDriver.rows &&
                    <DriverOnTheWayFooter
                    driverInfo={this.props.driverInfo}
                    distanceFromDriver={this.props.distanceFromDriver}
                />

                }
              

                <DriverFooterProfile
                    driverInfo={this.props.driverInfo}
                />
                {
                    this.props.showDriverFound &&

                    <DriverFound
                        driverInfo={this.props.driverInfo}
                        getDriverLocation={this.props.getDriverLocation}
                    />
                }
                </View>
            </Container>
        )
    }
}

export default TrackDriver