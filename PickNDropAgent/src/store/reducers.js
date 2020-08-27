import {combineReducers} from 'redux';
import {HomeReducer as home} from '../routes/Home/modules/home' 
import {LoginReducer as login} from '../routes/Login/modules/login'
import {SignUpReducer as signup} from '../routes/SignUp/modules/signup'

export const makeRootReducer =()=>{
    return  combineReducers({
         home,
         login,
         signup,
     });
  }

export default  makeRootReducer