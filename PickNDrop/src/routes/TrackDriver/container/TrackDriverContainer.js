import {connect} from 'react-redux'
import TrackDriver from '../components/TrackDriver'
import {
    getCurrentLocation,
    getDriverInfo,
    getDriverLocation,
    getDistanceFromDriver,
    getDelivertStatus,
    clearAfterStateDelivered
} from '../modules/trackDriver'

const mapStateToProps = (state)=>({
    region: state.trackDriver.region,
    selectedAddress:state.home.selectedAddress || {},
    InitialBooking:state.home.InitialBooking ||{},
    driverInfo:state.trackDriver.driverInfo || {},
    driverLocation:state.trackDriver.driverLocation,
    showDriverFound:state.trackDriver.showDriverFound,
    showCarMarker:state.trackDriver.showCarMarker,
    distanceFromDriver:state.trackDriver.distanceFromDriver || {},
    booking:state.home.booking || {},
    delivery:state.trackDriver.delivery || {}
});

const mapActionCreators ={
    getCurrentLocation,
    getDriverInfo,
    getDriverLocation,
    getDistanceFromDriver,
    getDelivertStatus,
    clearAfterStateDelivered
};

export default connect(mapStateToProps,mapActionCreators)(TrackDriver)