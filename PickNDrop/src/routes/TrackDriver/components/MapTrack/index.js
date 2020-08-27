import React from 'react'
import {View} from 'native-base'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'


import styles from './MapTrackStyles'

export const MapTrack =({
    region,
    driverLocation,
    showCarMarker,
    selectedAddress,
    carMarker,
    InitialBooking
    })=> {

    const {selectedPickUp }= selectedAddress || {}
        return (
            <View style={styles.container}>
        
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={region}
                >
                {selectedPickUp &&
                    <MapView.Marker
                        coordinate={{latitude:selectedPickUp.location.latitude, longitude:selectedPickUp.location.longitude}}
                        pinColor='red'
                        
                    />
                    ||
                    <MapView.Marker
                        coordinate={{latitude:InitialBooking.pickUp.latitude, longitude:InitialBooking.pickUp.longitude}}
                        pinColor='red'
                        
                    />
                }
             
                {showCarMarker &&
                    <MapView.Marker
                        coordinate={{latitude:driverLocation.coordinate.coordinates[1], longitude:driverLocation.coordinate.coordinates[0]}}
                        image={carMarker}
                        
                    />
                }
                  
                </MapView>
                
            </View>
        )
    }

export default MapTrack
