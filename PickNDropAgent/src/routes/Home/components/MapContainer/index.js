import React from 'react';
import {View, Image} from 'native-base';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import ConfirmButton from '../../../../components/ConfirmButton';
import Switch from '../../../../components/Switch';
import styles from './MapContainerStyles';

export const MapContainer = ({
  region,
  carMarker,
  sendActiveData,
  sendSwitchData,
  getDriverLocationMongodb,
  driverLocationMongoDB,
  requestInfo,
  confirmDriverRequest,
  pushShowRequestToInitial,
  showInfo,
  showSwitch,
}) => {
  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
        {region &&
          ((
            <MapView.Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              image={carMarker}
            />
          ) ||
            null)}
      </MapView>
      {(requestInfo.status === 'pending' && showInfo === true && (
        <ConfirmButton
          confirmDriverRequest={confirmDriverRequest}
          requestInfo={requestInfo}
          pushShowRequestToInitial={pushShowRequestToInitial}
          showInfo={showInfo}
          status={requestInfo.status}
        />
      )) || (
        <Switch
          showSwitch={showSwitch}
          sendActiveData={sendActiveData}
          sendSwitchData={sendSwitchData}
          getDriverLocationMongodb={getDriverLocationMongodb}
          driverLocationMongoDB={driverLocationMongoDB}
        />
      )}
    </View>
  );
};

export default MapContainer;
