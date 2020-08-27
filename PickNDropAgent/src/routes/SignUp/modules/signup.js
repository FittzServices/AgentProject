import update from 'react-addons-update';
import constants from './actionConstants';
import axios from 'axios';
import {Alert} from 'react-native'
import {Actions} from 'react-native-router-flux';

const isEmpty = require('is-empty');

//Constant
const {
    GET_SIGNUP_INPUT,
    SIGNUP_ERROR,
    SET_CURRENT_USER,
    USER_LOADING,
    USER_TOKEN,
} = constants;

//Action

//Signup input verification
export const getSignupInputData = userData => dispatch => {
    if (userData){
    const url = 'https://pick-drop-server.herokuapp.com/api/register';
    axios
      .post(url, userData)
      .then(res => {
        // Save to localStorage
        if(res.data.status==='pending'){
          Actions.Verify()
        }
        dispatch({
          type: GET_SIGNUP_INPUT,
          payload: res.data,
        });
  
      })
      .catch(err =>
        dispatch({
          type: SIGNUP_ERROR,
          payload: err.response.data,
        }),
      );
    }
  };


  //Verify Toeken
export const verifyCode = userData => dispatch => {
    console.log(userData);
    const url = `https://pick-drop-server.herokuapp.com/api/phone-verify`;
    axios
      .post(url, userData)
      .then(res => {
       
        if(res.data==='approved'){
          Alert.alert('Pick N Drop','Your Phone Number has been successfully verified')
            Actions.jump('Login')
    
        }
        
        dispatch({
          type: USER_TOKEN,
          payload: res.data
        });
      })
  
      .catch(err =>
        console.log('something went wrong')
        
      );
  };
  

//current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

////HANDLERS

function handleGetSignupInputData(state, action) {
    return update(state, {
      inputSignupData: {
        $set: action.payload,
      },
    });
  }

  function handleUserToken(state, action) {
    return update(state, {
      token: {
        $set: action.payload,
      },
    });
  }

function handleCurrentUser(state, action) {
  return update(state, {
    isAuthenticated: {
      $set: !isEmpty(action.payload),
    },
    currentUser: {
      $set: action.payload,
    },
  });
}

function handleUserLoading(state, action) {
  return update(state, {
    loading: {
      $set: true,
    },
  });
}

function handleSignupError(state, action) {
    return update(state, {
      signupError: {
        $set: action.payload,
      },
    });
  }


const ACTION_HANDLERS = {
    GET_SIGNUP_INPUT: handleGetSignupInputData,
  SIGNUP_ERROR: handleSignupError,
  SET_CURRENT_USER: handleCurrentUser,
  USER_LOADING: handleUserLoading,
  USER_TOKEN: handleUserToken,
};

const initialState = {
    token: {},
    inputSignupData: {},
    signupError: {},
  isAuthenticated: false,
  currentUser: {},
  loading: false,
};

export function SignUpReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
