import {connect} from 'react-redux'

import Home from '../components/Home'

import {
    getCurrentLocation,
    getInputData,
  toggleSearchResultModal,
  getAddressSuggestion,
  getSelectedAddress,
  bookCar,
  getLoginInputData,
  getSignupInputData,
  setCurrentUser,
  setUserLoading,
  getNearByDrivers,
  changeCodeToAddress,
  getInitialAddresMatrix,
  bookCarInitial,
  clearEntireSate
} from '../modules/home'


const mapStateToProps = (state) =>({
    region: state.home.region,
    inputData: state.home.inputData || {},
  resultTypes: state.home.resultTypes || {},
  predictions: state.home.predictions || [],
  selectedAddress: state.home.selectedAddress || {},
  fare: state.home.fare,
  booking: state.home.booking || {},
  inputLoginData: state.home.inputData || {},
  inputError: state.home.inputError || {},
  inputSignupData: state.home.inputSignupData || {},
  signupError: state.home.signupError || {},
  currentUser: state.home.currentUser || {},
  isAuthenticated: state.home.isAuthenticated || {},
  loading: state.home.loading || {},
  nearByDrivers: state.home.nearByDrivers || [],
  initialAddress: state.home.initialAddress || {},
  initialDistanceMatrix: state.home.initialDistanceMatrix || {},
  initialFare: state.home.initialFare,
  InitialBooking: state.home.InitialBooking || {},
  resetState:state.home.resetState || {}

})

const mapActionCreators ={
    getCurrentLocation,
    getInputData,
  toggleSearchResultModal,
  getAddressSuggestion,
  getSelectedAddress,
  bookCar,
  getLoginInputData,
  getSignupInputData,
  setCurrentUser,
  setUserLoading,
  getNearByDrivers,
  changeCodeToAddress,
  getInitialAddresMatrix,
  bookCarInitial,
  clearEntireSate
}


export default connect(mapStateToProps,mapActionCreators)(Home)