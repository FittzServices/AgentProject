import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {createLogger} from 'redux-logger';
import createSocketIoMiddleware from 'redux-socket.io';


import io from "socket.io-client/dist/socket.io";

export const socket = io("https://pick-drop-server.herokuapp.com", {jsonp:false});
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const log =  createLogger({
        diff: true,
        collapsed:true
    })

    export default (initialState ={})=>{

        const middleware = [thunk, log, socketIoMiddleware];

        const enhancers = [];
        
        
        const store = createStore(
            rootReducer(),
            initialState,
            compose(
                applyMiddleware(...middleware),
                ...enhancers
            )
        );

        return store;
    };