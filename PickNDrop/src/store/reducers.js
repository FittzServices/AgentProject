import {combineReducers} from 'redux';
import {HomeReducer as home} from '../routes/Home/modules/home';
import {LoginReducer as login} from '../routes/Login/modules/login';
import {SignUpReducer as signup} from '../routes/Signup/modules/signup';
import { TrackDriverReducer as trackDriver } from "../routes/TrackDriver/modules/trackDriver";

export const makeRootReducer = () => {
  return combineReducers({
    home,
    login,
    signup,
    trackDriver
  });
};

export default makeRootReducer;
