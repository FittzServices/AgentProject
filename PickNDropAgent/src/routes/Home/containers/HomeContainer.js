import {connect} from 'react-redux';
import Home from '../components/Home';

import {
  getCurrentLocation,
  sendDriverCurrentData,
  sendUpdatedCurrentLocation,
  emittedByNearByDriver,
  getAllBookings,
  confirmDriverRequest,
  sendDeliveredData,
  getDriverLocationMongodb,
  sendActiveData,
  singleDataSwitch,
  sendSwitchData,
  pushShowRequestToInitial
} from '../modules/home';
import {
  setCurrentUser,
  getLoginInputData,
  getUserToken,
} from '../../Login/modules/login';
const mapStateToProps = state => ({
  region: state.home.region,
  socketId: state.home.socketId,
  updatedLocation: state.home.updatedLocation,
  requestInfo: state.home.requestInfo,
  allBookings: state.home.allBookings || [],
  confirmRequest: state.home.confirmRequest,
  confirmDelivery: state.home.confirmDelivery,
  driverLocationMongoDB: state.home.driverLocationMongoDB,
  driver: state.home.driver,
  switchData:state.home.switchData,
  toggle:state.home.toggle,
  showInfo:state.home.showInfo,
  inputLoginData:state.login.inputLoginData
})

const mapActionCreators = {
  getCurrentLocation,
  getLoginInputData,
  setCurrentUser,
  getUserToken,
  sendDriverCurrentData,
  sendUpdatedCurrentLocation,
  emittedByNearByDriver,
  getAllBookings,
  confirmDriverRequest,
  sendDeliveredData,
  getDriverLocationMongodb,
  sendActiveData,
  singleDataSwitch,
  sendSwitchData,
  pushShowRequestToInitial
};

export default connect(mapStateToProps, mapActionCreators)(Home);
