import React from 'react';
import {View, Text, Left, Right, Button} from 'native-base';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './MapContainerStyles';


import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';
import FirstSearchBox from '../InitialSearchBox';


export const MapContainer = ({
    region,
    getInputData,
    toggleSearchResultModal,
    getAddressSuggestion,
    resultTypes,
    predictions,
    getSelectedAddress,
    selectedAddress,
  
    ToggleButton,
    carMarker,
    nearByDrivers,
    initialAddress,
    changeSearch,
}) => {
    const {selectedPickUp} = selectedAddress || {};
  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
        {initialAddress && (
          <MapView.Marker
            coordinate={region}
            title="your current location"
            pinColor="aqua"
          />
        )}
        {selectedPickUp &&
          ((
            <MapView.Marker
              coordinate={{
                latitude: selectedPickUp.location.latitude,
                longitude: selectedPickUp.location.longitude,
              }}
              pinColor="red"
            />
          ) ||
            null)}

        {nearByDrivers.active === 'true' &&
          nearByDrivers.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.coordinate.coordinates[1],
                longitude: marker.coordinate.coordinates[0],
              }}
              image={carMarker}
            />
          ))}
      </MapView>
      {(!changeSearch && (
        <FirstSearchBox
          initialAddress={initialAddress}
          ToggleButton={ToggleButton}
        />
      )) || (
        <SearchBox
          getInputData={getInputData}
          toggleSearchResultModal={toggleSearchResultModal}
          getAddressSuggestion={getAddressSuggestion}
          selectedAddress={selectedAddress}
          ToggleButton={ToggleButton}
        />
      )}
      {resultTypes.pickUp && (
        <SearchResults
          predictions={predictions}
          getSelectedAddress={getSelectedAddress}
        />
      )}
    </View>
  );
};

export default MapContainer;
