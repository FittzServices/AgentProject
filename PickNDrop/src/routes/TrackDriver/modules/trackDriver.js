import update from 'react-addons-update';
import constants from './actionConstants';

import {Dimensions} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';


import request from 'superagent';

//Constant
const {
  GET_CURRENT_LOCATION,
  GET_DRIVER_INFORMATION,
  GET_DRIVER_LOCATION,
  GET_DISTANCE_FROM_DRIVER,
  GET_DELIVERY_STATUS,
  DELIVERED,
} = constants;

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//Action
export function getCurrentLocation() {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: GET_CURRENT_LOCATION,
          payload: position,
        });
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
}

//Get Driver's Info

export function getDriverInfo() {
  return (dispatch, store) => {
    let id = store().home.booking.driverId;
    request
      .get('https://pick-drop-server.herokuapp.com/api/driver/' + id)
      .finish((error, res) => {
        dispatch({
          type: GET_DRIVER_INFORMATION,
          payload: res.body,
        });
      });
  };
}

//Get initial driver location
export function getDriverLocation() {
  return (dispatch, store) => {
    let id = store().home.booking.driverId;
    request
      .get('https://pick-drop-server.herokuapp.com/api/driverLocation/' + id)
      .finish((error, res) => {
        dispatch({
          type: GET_DRIVER_LOCATION,
          payload: res.body,
        });
      });
  };
}

//Get distance from driver

export function getDistanceFromDriver() {
  return (dispatch, store) => {
    if (store().trackDriver.driverLocation) {
     
        const initialLat = store().home.InitialBooking.pickUp.latitude;
        const initialLong = store().home.InitialBooking.pickUp.longitude;
        request
          .get('https://maps.googleapis.com/maps/api/distancematrix/json')
          .query({
            origins: initialLat + ',' + initialLong,
            destinations:
              store().trackDriver.driverLocation.coordinate.coordinates[1] +
              ',' +
              store().trackDriver.driverLocation.coordinate.coordinates[0],
            mode: 'driving',
            key: 'AIzaSyChdu8WVhByDVdT_O0foHVz4popbcTrAig',
          })
          .finish((error, res) => {
            dispatch({
              type: GET_DISTANCE_FROM_DRIVER,
              payload: res.body,
            });
          });
      
    }
  };
}

export function getDelivertStatus() {
  return (dispatch, store) => {
    let id = store().home.booking.status;

    dispatch({
      type: GET_DELIVERY_STATUS,
      payload: id,
    });
  };
}

export function clearAfterStateDelivered() {
    return (dispatch, store) => {
     if(store().home.booking.status ==='delivered'){
        dispatch({
            type: DELIVERED,
            payload: 'The trip has ended',
          });
     }

    };
  }

//-------------------------
//Actions handler
//-------------------------
function handleGetCurrentLocation(state, action) {
  return update(state, {
    region: {
      latitude: {
        $set: action.payload.coords.latitude,
      },
      longitude: {
        $set: action.payload.coords.longitude,
      },
      latitudeDelta: {
        $set: LATITUDE_DELTA,
      },
      longitudeDelta: {
        $set: LONGITUDE_DELTA,
      },
    },
  });
}

function handleGetDriverInfo(state, action) {
  return update(state, {
    driverInfo: {
      $set: action.payload,
    },
  });
}

function handleUpdateDriverLocation(state, action) {
  return update(state, {
    driverLocation: {
      $set: action.payload,
    },
  });
}

function handleDeliveryStatus(state, action) {
  return update(state, {
    booking: {
      $set: action.payload,
    },
  });
}

function handleGetDriverLocation(state, action) {
  return update(state, {
    driverLocation: {
      $set: action.payload,
    },
    showDriverFound: {
      $set: false,
    },
    showCarMarker: {
      $set: true,
    },
  });
}

function handleGetDistanceFromDriver(state, action) {
  return update(state, {
    distanceFromDriver: {
      $set: action.payload,
    },
  });
}
function handleDelivery(state, action) {
  return update(state, {
    delivery: {
      $set: action.payload,
    },
  });
}

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_DRIVER_INFORMATION: handleGetDriverInfo,
  UPDATE_DRIVER_LOCATION: handleUpdateDriverLocation,
  GET_DRIVER_LOCATION: handleGetDriverLocation,
  GET_DISTANCE_FROM_DRIVER: handleGetDistanceFromDriver,
  GET_DELIVERY_STATUS: handleDeliveryStatus,
  DELIVERED: handleDelivery,
};

const initialState = {
  region: {},
  showDriverFound: true,
  booking: {},
};

export function TrackDriverReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}