import update from 'react-addons-update';
import constants from './actionConstant';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {Actions} from 'react-native-router-flux';
import setAuthToken from '../../../Util/setAuth';
import AsyncStorage from '@react-native-community/async-storage';


const isEmpty = require('is-empty');

//Constant
const {GET_LOGIN_INPUT,
        INPUT_ERROR,
        USER_LOADING,
        SAVE_TOKEN,
        REMOVE_TOKEN,
        GET_TOKEN,
        GENERATED_TOKEN
      
      } = constants;

//Action

//Login input verification
export const getLoginInputData = (userData) => dispatch => {
  if (userData) {
    console.log(userData);
    
    const url = 'https://pick-drop-server.herokuapp.com/api/driver-login';
    axios
      .post(url, userData)
      .then(res => {
        // Save to localStorage
        const {token} = res.data;
        if(token){
          Actions.Home()
        }
        
        const decoded = jwt_decode(token);
       console.log(decoded);
       
        setAuthToken(token);
        dispatch(saveUserToken(token))
      })
      .catch(err =>
        dispatch({
          type: INPUT_ERROR,
          payload: err.response.data,
        }),
      );
  }
};

//Save JWT token
export const saveUserToken = (token) => dispatch =>{
  
  AsyncStorage.setItem('jwtToken', token)
  .then((data)=>{
    console.log(data);
    Actions.Home()
    dispatch({
      type: SAVE_TOKEN,
      payload: data
    })
    dispatch(setUserLoading(false))
  }).catch((err)=>{
    console.log(err);
    dispatch(setUserLoading(false))
    
  })


}

export const getUserToken = () => dispatch => 

 AsyncStorage.getItem('jwtToken')
        .then((data) => {
          dispatch(setUserLoading(false))
            dispatch({
              type:GET_TOKEN,
              payload:data
            });
        })
        .catch((err) => {
          dispatch(setUserLoading(false))
          console.log(err);
        })

export const setCurrentUser = ()=>(dispatch,store) => {
  setTimeout(()=>{
    const token =store().login.token
    if(token){const decoded =jwt_decode(token)
      dispatch( {
        type: GET_LOGIN_INPUT,
        payload: decoded,
      });
    }else{
      console.log('token not present');
      
    }
    
  },3000)
 
};

// User loading
export const setUserLoading = (bool) => {
  return {
    type: USER_LOADING,
    payload:bool
  };
};
// Log user out
export const  logoutUser =()=>dispatch=>{
 // Remove token from local storage
  AsyncStorage.removeItem('jwtToken')
  .then((data) => {
    dispatch(setUserLoading(false))
      dispatch({
        type:REMOVE_TOKEN,
        payload:'token removed'});
        Actions.jump('Login',{type:'reset'})
  })
  .catch((err) => {
    dispatch(setUserLoading(false))
      console.log(err);
      
  })
}
  // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to empty object {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));
//   // Actions.jump('Login', {type:'reset'})
// };
// }



////HANDLERS

function handleGetLoginInputData(state, action) {
  return update(state, {
    inputLoginData: {
      $set: action.payload,
    },
    isAuthenticated: {
      $set: !isEmpty(action.payload),
    },
  });
}

function handleInputError(state, action) {
  return update(state, {
    inputError: {
      $set: action.payload,
    },
  });
}

function handleDriverLoading(state, action) {
  return update(state, {
    loading: {
      $set: true,
    },
  });
}

function handleGetToken(state, action) {
  return update(state, {
    token: {
      $set: action.payload,
    },
  });
}
function handleRemoveToken(state, action) {
  return update(state, {
    removetoken: {
      $set: action.payload,
    },
    isAuthenticated: {
      $set: false,
    },
  });
}
function handleSaveToken(state, action) {
  return update(state, {
    Savetoken: {
      $set: action.payload,
    },
  });
}

const ACTION_HANDLERS = {
  GET_LOGIN_INPUT: handleGetLoginInputData,
  INPUT_ERROR: handleInputError,
  USER_LOADING: handleDriverLoading,
  SAVE_TOKEN:handleSaveToken,
  REMOVE_TOKEN:handleRemoveToken,
  GET_TOKEN:handleGetToken,
};

const initialState = {
  inputLoginData: {},
  inputError: {},
  isAuthenticated: false,
  loading: false,
  genToken:{}
};

// export function LoginReducer(state = initialState, action) {
//   const handler = ACTION_HANDLERS[action.type];

//   return handler ? handler(state, action) : state;
// }
export function InitialApp(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

export function LoginReducer(state, action) {
  if (action.type === REMOVE_TOKEN) {
    state = undefined;
  }

  return InitialApp(state, action);
}
