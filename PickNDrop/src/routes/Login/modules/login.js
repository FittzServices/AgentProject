import update from 'react-addons-update';
import constants from './actionConstant';
import axios from 'axios';

import {Actions} from 'react-native-router-flux';

const isEmpty = require('is-empty');

//Constant
const {
  GET_LOGIN_INPUT,
  INPUT_ERROR,
 
} = constants;

//Action

//Login input verification
export const getLoginInputData = userData => dispatch => {
  if (userData) {
    const url = 'https://pick-drop-server.herokuapp.com/api/login';
    axios
      .post(url, userData)
      .then(res => {
        // Save to localStorage
        dispatch({
          type: GET_LOGIN_INPUT,
          payload: res.data,
        });
        Actions.home();
        
      })
      .catch(err =>
        dispatch({
          type: INPUT_ERROR,
          payload: err.response.data,
        }),
      );
  }
};



////HANDLERS

function handleGetLoginInputData(state, action) {
  return update(state, {
    inputLoginData: {
      $set: action.payload,
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

const ACTION_HANDLERS = {
  GET_LOGIN_INPUT: handleGetLoginInputData,
  INPUT_ERROR:handleInputError
};

const initialState = {
  inputLoginData: {},
  inputError: {},
 
};

export function LoginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
