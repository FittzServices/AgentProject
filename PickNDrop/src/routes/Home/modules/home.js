import update from 'react-addons-update';
import constants from './actionConstants';
import {Dimensions, Alert} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

import request from '../../../Util/request';
import calculateFare from '../../../Util/fareCalculator';
import axios from 'axios';

import {Actions} from 'react-native-router-flux';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';

const {
  GET_CURRENT_LOCATION,
  GET_INPUT,
  GET_DISTANCE_MATRIX,
  TOGGLE_SEARCH_RESULT,
  GET_ADDRESS_SUGGESTIONS,
  GET_SELECTED_ADDRESS,
  GET_FARE,
  INITIAL_BOOK_CAR,
  BOOK_CAR,
  LOGOUT_OUT,
  GET_NEARBY_DRIVERS,
  CHANGE_CODE_ADDRESS,
  GET_INITIAL_DISTANCE_MATRIX,
  GET_INITIAL_FARE,
  CLEAR_OUT,

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

//Get User Input
export function getInputData(payload) {
  return {
    type: GET_INPUT,
    payload,
  };
}


//Toggle search result modal
export function toggleSearchResultModal(payload) {
  return {
    type: TOGGLE_SEARCH_RESULT,
    payload,
  };
}

//get address from google place
export function getAddressSuggestion() {
  return (dispatch, store) => {
    let userInput = store().home.resultTypes.pickUp
      && store().home.inputData.pickUp
    RNGooglePlaces.getAutocompletePredictions(userInput, {
      country: 'EE',
    })
      .then(results => {
        dispatch({
          type: GET_ADDRESS_SUGGESTIONS,
          payload: results,
        });
      })
      .catch(error => console.log(error.message));
  };
}

//Get selected address
export function getSelectedAddress(payload) {
  const dummyNumbers = {
    baseFare: 50,
    timeRate: 4.14,
    distanceRate: 4.97,
    surge: 1,
  };

  return (dispatch, store) => {
    RNGooglePlaces.lookUpPlaceByID(payload)
      .then(results => {
        dispatch({
          type: GET_SELECTED_ADDRESS,
          payload: results,
        });
      })
      .then(() => {
        //Get the distance and time
        const pickupLat = store().home.selectedAddress.selectedPickUp.location
          .latitude;
        const pickupLong = store().home.selectedAddress.selectedPickUp.location
          .longitude;
          const disposeSiteLat = 59.4236;
          const disposeSiteLong = 24.79172;
        if (
          store().home.selectedAddress
        ) {
          request
            .get('https://maps.googleapis.com/maps/api/distancematrix/json')
            .query({
              origins: `${pickupLat},${pickupLong}`,
              destinations: `${disposeSiteLat},${disposeSiteLong}`,
              mode: 'driving',
              key: 'AIzaSyChdu8WVhByDVdT_O0foHVz4popbcTrAig',
            })
            .finish((error, res) => {
              dispatch({
                type: GET_DISTANCE_MATRIX,
                payload: res.body,
              });
            });
        }
        setTimeout(function() {
          if (
            store().home.selectedAddress
          ) {
            const fixedFare=300
            /*const fare = calculateFare(
              dummyNumbers.baseFare,
              dummyNumbers.timeRate,
              store().home.distanceMatrix.rows[0].elements[0].duration.value,
              dummyNumbers.distanceRate,
              store().home.distanceMatrix.rows[0].elements[0].distance.value,
              dummyNumbers.surge,
            );*/
            dispatch({
              type: GET_FARE,
              payload: fixedFare,
            });
          }
        }, 1000);
      })
      .catch(error => console.log(error.message));
  };
}


//Get Initial address Matrix
export function getInitialAddresMatrix() {
  const dummyNumbers = {
    baseFare: 50,
    timeRate: 4.14,
    distanceRate: 4.97,
    surge: 1,
  };

  return (dispatch, store) => {
    const initLat = store().home.region.latitude;
    const initLong = store().home.region.longitude;
    const disposeSiteLat = 59.4236;
    const disposeSiteLong = 24.79172;

    if (store().home.region) {
      request
        .get('https://maps.googleapis.com/maps/api/distancematrix/json')
        .query({
          origins: `${initLat},${initLong}`,
          destinations: `${disposeSiteLat},${disposeSiteLong}`,
          mode: 'driving',
          key: 'AIzaSyChdu8WVhByDVdT_O0foHVz4popbcTrAig',
        })
        .finish((error, res) => {
          dispatch({
            type: GET_INITIAL_DISTANCE_MATRIX,
            payload: res.body,
          });
        });
    }
    setTimeout(function() {
      const fixedFare=300
     /* const fare = calculateFare(
        dummyNumbers.baseFare,
        dummyNumbers.timeRate,
        store().home.initialDistanceMatrix.rows[0].elements[0].duration.value,
        dummyNumbers.distanceRate,
        store().home.initialDistanceMatrix.rows[0].elements[0].distance.value,
        dummyNumbers.surge,
      );*/
      dispatch({
        type: GET_INITIAL_FARE,
        payload: fixedFare,
      });
    }, 1000);
  };
}



//Get nearby drivers
export function getNearByDrivers() {
  return (dispatch, store) => {
    request
      .get('https://pick-drop-server.herokuapp.com/api/driverLocation')
      .query({
        latitude: store().home.region.latitude,
        longitude: store().home.region.longitude,
      })
      .finish((error, res) => {
        if (res) {
          dispatch({
            type: GET_NEARBY_DRIVERS,
            payload: res.body,
          });
        }
      });
  };
}

//BOOK CAR
export function bookCar() {
  return (dispatch, store) => {
    if (store().home.nearByDrivers){
    const nearByDrivers = store().home.nearByDrivers;
    const nearByDriver =
      nearByDrivers[Math.floor(Math.random() * nearByDrivers.length)];
  if (store().home.selectedAddress.selectedPickUp){


    const payload = {
      data: {
        userName: store().login.inputLoginData.fullName,
        pickUp: {
          address: store().home.selectedAddress.selectedPickUp.address,
          name: store().home.selectedAddress.selectedPickUp.name,
          latitude: store().home.selectedAddress.selectedPickUp.location
            .latitude,
          longitude: store().home.selectedAddress.selectedPickUp.location
            .longitude,
        },
       
        fare: store().home.fare,
        status: 'pending',
        mobile:store().login.inputLoginData.phoneNumber,
      },
      nearByDriver: {
        socketId: nearByDriver.socketId,
        diverId: nearByDriver.driverId,
        latitude: nearByDriver.coordinate.coordinates[1],
        longitude: nearByDriver.coordinate.coordinates[0],
      },
    };
    if (nearByDriver.active === 'true') {
     
    request
      .post('https://pick-drop-server.herokuapp.com/api/book')
      .send(payload)
      .finish((error, res) => {
        dispatch({
          type: BOOK_CAR,
          payload: res.body,
        });
      });
      } else {
      Alert.alert('Pick N Drop',
        'Garbage Truck not available, try again later : Working Hours is between 8am to 6pm',
      );
    }
    }else {
      Alert.alert('Pick N Drop','Pick Up location is required')
    }
  }else {
  Alert.alert('Pick N Drop','Garbage Truck Not found, try again later')
  }
}
}

//IntialBooking
export function bookCarInitial() {
  return (dispatch, store) => {
    if (store().home.nearByDrivers){
    const nearByDrivers = store().home.nearByDrivers;
    const date = Date.now;
    const nearByDriver =
      nearByDrivers[Math.floor(Math.random() * nearByDrivers.length)];

    const payload = {
      data: {
        userName: store().login.inputLoginData.fullName,
        pickUp: {
          address: store().home.initialAddress,
          latitude: store().home.region.latitude,
          longitude: store().home.region.longitude,
        },
        initialFare: store().home.initialFare,
        status: 'pending',
        mobile:store().login.inputLoginData.phoneNumber,
      },
      nearByDriver: {
        socketId: nearByDriver.socketId,
        diverId: nearByDriver.driverId,
        latitude: nearByDriver.coordinate.coordinates[1],
        longitude: nearByDriver.coordinate.coordinates[0],
      },
      date: moment(date).format('dddd, MMMM Do YYYY, h:mm:ss'),
    };
if (nearByDrivers){
    if (nearByDriver.active === 'true') {
      request
        .post('https://pick-drop-server.herokuapp.com/api/book')
        .send(payload)
        .finish((error, res) => {
          dispatch({
            type: INITIAL_BOOK_CAR,
            payload: res.body,
          });
        });
    } else {
      Alert.alert('Pick N Drop',
        'Garbage Truck not available, try again later : Working Hours is between 8am to 6pm',
      );
    }
  }else{
    Alert.alert('Pick N Drop','Driver not available, please try again later')
  }
}else {
  Alert.alert('Pick N Drop','Garbage Truck Not found, try again later')
  }
  };
}



//get addres
export function changeCodeToAddress() {
  Geocoder.init('AIzaSyChdu8WVhByDVdT_O0foHVz4popbcTrAig');
  return (dispatch, store) => {
    const currentPosLat = store().home.region.latitude;
    const currentPosLong = store().home.region.longitude;

    Geocoder.from({
      latitude: currentPosLat,
      longitude: currentPosLong,
    })
      .then(json => {
        dispatch({
          type: CHANGE_CODE_ADDRESS,
          payload: json.results[0].formatted_address
        });
      })
      .catch(error => console.warn(error));
  };
}
export function  setLogoutState() {
return (dispatch, store)=>{

  console.log('logged-out');
  
    dispatch({
      type: LOGOUT_OUT,
      payload: 'Succeffully logged out',
    })
    Actions.popTo('Login')
}
}


export function  clearEntireSate() {
  return (dispatch)=>{
      dispatch({
        type: CLEAR_OUT,
        payload: 'reset state to initial state',
      })
  }
  }






//Actions handler
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


function handleGetInputData(state, action) {
  const {key, value} = action.payload;

  return update(state, {
    inputData: {
      [key]: {
        $set: value,
      },
    },
  });
}

function handleToggleSearchResult(state, action) {
  if (action.payload === 'pickUp') {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: true,
        },
      },
      predictions: {
        $set: {},
      },
    });
  }
}

function handleGetAddressSuggestions(state, action) {
  return update(state, {
    predictions: {
      $set: action.payload,
    },
  });
}

function handleGetSelectedAddress(state, action) {
  let selectedTitle = state.resultTypes.pickUp && 'selectedPickUp'
  

  return update(state, {
    selectedAddress: {
      [selectedTitle]: {
        $set: action.payload,
      },
    },
    resultTypes: {
      pickUp: {
        $set: false,
      },
    },
  });
}

function handleGetDistanceMatrix(state, action) {
  return update(state, {
    distanceMatrix: {
      $set: action.payload,
    },
  });
}

function handleGetFare(state, action) {
  return update(state, {
    fare: {
      $set: action.payload,
    },
  });
}


function handleGetInitialFare(state, action) {
  return update(state, {
    initialFare: {
      $set: action.payload,
    },
  });
}

//Handle book car
function handleBookCar(state, action) {
  return update(state, {
    booking: {
      $set: action.payload,
    },
  });
}
//Handle initialBoking
function handleInitialBookCar(state, action) {
  return update(state, {
    InitialBooking: {
      $set: action.payload,
    },
  });
}

//handle get nearby drivers
function handleGetNearbyDrivers(state, action) {
  return update(state, {
    nearByDrivers: {
      $set: action.payload,
    },
  });
}

function handleConfirmedBooking(state, action) {
  return update(state, {
    booking: {
      $set: action.payload,
    },
  });
}
function handleFinishedBooking(state, action) {
  return update(state, {
    booking: {
      $set: action.payload,
    },
  });
}

function handleChangeCodeToAddres(state, action) {
  return update(state, {
    initialAddress: {
      $set: action.payload,
    },
  });
}

function handleGetInitialDistanceMatrix(state, action) {
  return update(state, {
    initialDistanceMatrix: {
      $set: action.payload,
    },
  });
}

function handleLogout(state, action) {
  return update(state, {
    logout: {
      $set: action.payload,
    },
  });
}


function handleClearState(state, action) {
  return update(state, {
    resetState: {
      $set: action.payload,
    },
  });
}




const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_INPUT: handleGetInputData,
  TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
  GET_ADDRESS_SUGGESTIONS: handleGetAddressSuggestions,
  GET_SELECTED_ADDRESS: handleGetSelectedAddress,
  GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
  GET_FARE: handleGetFare,
  GET_INITIAL_FARE: handleGetInitialFare,
  GET_NEARBY_DRIVERS: handleGetNearbyDrivers,
  BOOKING_CONFIRMED: handleConfirmedBooking,
  FINISHED_TRIP: handleFinishedBooking,
  CHANGE_CODE_ADDRESS: handleChangeCodeToAddres,
  GET_INITIAL_DISTANCE_MATRIX: handleGetInitialDistanceMatrix,
  INITIAL_BOOK_CAR: handleInitialBookCar,
  BOOK_CAR: handleBookCar,
  LOGOUT_OUT:handleLogout,
  CLEAR_OUT:handleClearState
};

const initialState = {
  region: {},
  inputData: {},
  resultTypes: {},
  selectedAddress: {},
  userTokenError: {},
  initialAddress: {},
  logout:{},
};

export function InitialApp(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

export function HomeReducer(state, action) {
  // if(action.type===LOGOUT_OUT){
  //   state=undefined
  // }

  return InitialApp(state, action);
}
