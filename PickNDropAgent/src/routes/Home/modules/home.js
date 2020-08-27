import update from 'react-addons-update';
import constants from './actionConstants';
import {socket} from '../../../store/createStore'
import {Dimensions, Alert} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import axios from 'axios'
const isEmpty = require('is-empty');
//Constant
const {
    GET_CURRENT_LOCATION,
    SWITCH_TOGGLE,
    GET_SWITCH,
    SEND_CURRENT_DAT,
    UPDATE_LOCATION,
    GET_REQUEST_INFO,
    GET_ALL,
    CONFIRM_REQUEST,
    SEND_DELIVERED,
    GET_LOCATION_DATA,
    SEND_ACTIVE,
    SHOW_REQUEST,
    SEND_EMAIL
}= constants


const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;



//=================
//Action
//=================

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

  export const sendActiveData = userData => (dispatch,store) => {
    const locationId=store().login.inputLoginData.locationId
    
    const activeData=userData.sendData
    if(userData){
     axios.put(`https://pick-drop-server.herokuapp.com/api/updateActive/${locationId}`,{
      activeData})
            .then((res)=>{
                 
              dispatch({
                type:SEND_ACTIVE,
                payload:res.data
              })        
              }).catch(error=>{console.log(error);
              })
    }
  }
  export const singleDataSwitch=()=>(dispatch,store)=>{

    const driverId=store().login.inputLoginData.id
  if(driverId){
  axios.get(`https://pick-drop-server.herokuapp.com/api/switches/${driverId}`)
  .then((res)=>{
               
    dispatch({
      type:GET_SWITCH,
      payload:res.data
    })        
    }).catch(error=>{console.log(error);
    })
  }
}

export const sendSwitchData = userData => (dispatch,store) => {
  const activeId= store().home.switchData._id
  const activateData=userData.sendData
  if(userData){
   axios.put(`https://pick-drop-server.herokuapp.com/api/switchUpdate/${activeId}`,{
    activateData})
          .then((res)=>{
               
            dispatch({
              type:SWITCH_TOGGLE,
              payload:'Togle switch sent'
            })        
            }).catch(error=>{console.log(error);
            })
  }
}
export const sendIncidentEmail = userData => (dispatch) => {
  console.log(userData);
  
  if(userData){
   axios.post(`https://pick-drop-server.herokuapp.com/api/driverIncident`,{
    userData})
          .then((res)=>{
               
            dispatch({
              type:SEND_EMAIL,
              payload:res.data
            })        
            }).catch(error=>{
              console.log(error);
              
            })
  }
}

  export function  sendDriverCurrentData() {
   
    return (dispatch, store) => {
      
        const  driverCurrentData={
          locationId:store().login.inputLoginData.locationId,
          socketId:socket.id,
      }
        
      
        if (store().home.region!==''){
            axios.put(`https://pick-drop-server.herokuapp.com/api/driverLocationSocket/${driverCurrentData.locationId}`,{
                driverCurrentData
            })
            .then((res)=>{
                if(res){
              dispatch({
                type:SEND_CURRENT_DAT,
                payload:'successfully updated the socket '
            })
            console.log("success");
        }
            }, error=>{
              console.log(error);
              
            })
          }
    }
  
  }


  export function  sendUpdatedCurrentLocation() {
  
    return (dispatch, store) => {

      const  driverCurrentData={
            locationId:store().login.inputLoginData.locationId,
            latitude:store().home.region.latitude,
            longitude:store().home.region.longitude,
            socketId:store().home.socketId
        }

        if (driverCurrentData.socketId !==''){
            axios.put(`https://pick-drop-server.herokuapp.com/api/driverLocation/${driverCurrentData.locationId}`,{
                driverCurrentData
            })
            .then((res)=>{
                if (res !== "") {
              dispatch({
                type:UPDATE_LOCATION,
                payload:'Driver location has been updated'
            })
                console.log("Driver Location updated ");
            }

            }, error=>{
              console.log(error);
              
            })
          }
    }
  }


//When emited by user on random nearby driver
  export function emittedByNearByDriver() {
    return (dispatch) => {
    const driverRequest = socket.id + 'driverRequest';
    console.log(driverRequest);
    
   socket.on(driverRequest, function(passengerData){
     if (passengerData){
         console.log("passenger looking for a driver", passengerData);
         dispatch(setShowRequest(true))
         dispatch({
           type:GET_REQUEST_INFO,
           payload:passengerData
         })
        
      
      }
    })
  }
}
export function confirmDriverRequest() {
  return (dispatch, store) => {
   const bookingID=store().home.requestInfo._id
       const dataToSend = {
           "driverId":store().login.inputLoginData.id,
           "id": bookingID,
           "status": 'confirmed',  
       };
      console.log(dataToSend.driverId);
        

       axios.put(`https://pick-drop-server.herokuapp.com/api/bookings/${bookingID}`,{
                dataToSend})
          .then((res)=>{
               
                dispatch({
                  type:CONFIRM_REQUEST,
                  payload:'confirmation successfull'
                  })
                
            }).catch(error=>{console.log(error);
            })
          
    
    }
}

// export function confirmPendingRequest(payload) {
//   return (dispatch, store) => {
//    const bookingID=payload
//        const dataToSend = {
//            "driverId":store().home.driver.id,
//            "id": bookingID,
//            "status": 'confirmed',  
//        };
//       console.log(dataToSend.driverId);
        

//        axios.put(`https://pick-drop-server.herokuapp.com/api/bookings/${bookingID}`,{
//                 dataToSend})
//           .then((res)=>{
               
//                 dispatch({
//                   type:CONFIRM_PENDING_REQUEST,
//                   payload:'confirmation successfull'
//                   })
                
//             }).catch(error=>{console.log(error);
//             })
          
    
//     }
// }


    
export function getAllBookings(){
  return (dispatch,store) => {
    const driverId=store().login.inputLoginData.id
    axios.get(`https://pick-drop-server.herokuapp.com/api/getById/${driverId}`)
    .then(res=>{
      dispatch({
        type:GET_ALL,
        payload:res.data
      })
     
    }).catch(error=>{
      console.log(error);
      
    })
  }
}
export function getDriverLocationMongodb(){
  
  return (dispatch, store) => {
    const locationId=store().login.inputLoginData.locationId
    
    axios.get(`https://pick-drop-server.herokuapp.com/api/getDriverLocation/${locationId}`)
    .then(res=>{
      dispatch({
        type:GET_LOCATION_DATA,
        payload:res.data
      })
     
    })
    .catch(error=>{
      console.log(error);
      
    })
  }
}



export const sendDeliveredData=(deliveredData)=>{
    return (dispatch) => {
     
          axios.put(`https://pick-drop-server.herokuapp.com/api/bookings-finish/${deliveredData._id}`,{
            deliveredData})
            .then((res)=>{
        
                  
                    dispatch({
                      type:SEND_DELIVERED,
                      payload:Alert.alert('Pick N Drop','Waste picked-up successfull')
                      })
          
               }).catch(error=>{console.log(error)})
       }
  }

export const pushShowRequestToInitial=()=>{
    return (dispatch) => {
        dispatch(setShowRequest(false))  
    }

}
  export const setShowRequest = (bool) => {
    return {
      type: SHOW_REQUEST,
      payload:bool
    };
  };
  //===================
//Actions handler
//===================
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
      socketId:{
        $set:socket.id
    }
    });
  }
  function handleGetSingleData(state, action){
    return update(state, {
      switchData:{
            $set: action.payload
        }   
    })
  }
  function handleSendSwitchData(state, action){
    return update(state, {
      toggle:{
            $set: action.payload
        }   
    })
  }
  function handSendCurrentDriverData (state, action) {
    return update(state, {
        updatedSocket:{
            $set:action.payload
        },
       
    })
}

function handSendUpdatedCurrentLocation (state, action) {
    return update(state, {
        updatedLocation:{
            $set:action.payload
        },
       
    })
}

function handEmitDriverRequest (state, action) {
  return update(state, {
      requestInfo:{
          $set:action.payload
      },
     
  })
}
function handelShowRequest (state, action) {
    return update(state, {
        showInfo:{
          $set:action.payload
      },
       
    })
  }

function handleGetAllBookins (state, action) {
  return update(state, {
      allBookings:{
          $set:action.payload
      },
     
  })
}


function handleConfrimDriverRequest (state, action) {
  return update(state, {
      confirmRequest:{
          $set:action.payload
      },
     
  })
}

function handlePendingDriverRequest (state, action) {
  return update(state, {
      pendingRequest:{
          $set:action.payload
      },
     
  })
}

function handleSendDeliveryData (state, action) {
  return update(state, {
      confirmDelivery:{
          $set:action.payload
      },
     
  })
}
function handleGetDriverLocationMongodb (state, action) {
  return update(state, {
    driverLocationMongoDB:{
          $set:action.payload
      },
     
  })
}

function handleSendActiveData (state, action) {
  return update(state, {
    activeResponse:{
          $set:action.payload
      },
     
  })
}
function handleSendIncidentEmail (state, action) {
  return update(state, {
    report:{
          $set:action.payload
      },
     
  })
}



  const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    GET_SWITCH:handleGetSingleData,
    SWITCH_TOGGLE:handleSendSwitchData,
    SEND_CURRENT_DAT:handSendCurrentDriverData,
    UPDATE_LOCATION:handSendUpdatedCurrentLocation,
    GET_REQUEST_INFO:handEmitDriverRequest,
    GET_ALL:handleGetAllBookins,
    CONFIRM_REQUEST:handleConfrimDriverRequest,
    CONFIRM_PENDING_REQUEST:handlePendingDriverRequest,
    SEND_DELIVERED:handleSendDeliveryData,
    GET_LOCATION_DATA:handleGetDriverLocationMongodb,
    SEND_ACTIVE:handleSendActiveData,
    SHOW_REQUEST:handelShowRequest,
    SEND_EMAIL:handleSendIncidentEmail
  }

  const initialState = {
    region: {},
    switchData:{},
    socketId:{},
    requestInfo:{},
    driverLocationMongoDB:{},
    showInfo:false
  }

  export function HomeReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
  
    return handler ? handler(state, action) : state;
  }