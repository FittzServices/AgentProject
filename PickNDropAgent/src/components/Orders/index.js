import React, {Component} from 'react';
import {View, Text} from 'native-base';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {OpenMapDirections} from 'react-native-navigation-directions';
import OrderList from './OrderList';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getCurrentLocation,
  getAllBookings,
  sendDeliveredData,
} from '../../routes/Home/modules/home';
import styles from './OrdersStyles';
import {Chase} from 'react-native-animated-spinkit';

class Orders extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      showCancel: false,
      showYest: false,
      showOlder: false,
    };
  }

  toggleCancel = () => {
    this.setState({
      showCancel: !this.state.showCancel,
    });
  };
  toggleYest = () => {
    this.setState({
      showYest: !this.state.showYest,
    });
  };
  toggleOlder = () => {
    this.setState({
      showOlder: !this.state.showOlder,
    });
  };
  UNSAFE_componentWillMount() {
    this.setUserLoading(true);
    setTimeout(() => {
      this.props.getCurrentLocation();
      this.props.getAllBookings();
      this.setUserLoading(false);
    }, 3000);
  }
  setUserLoading = data => {
    this.setState({
      loading: data,
    });
  };
  _callShowDirections = directions => {
    const latitude = parseFloat(directions.latitude);
    const longitude = parseFloat(directions.longitude);

    const startPoint = {
      longitude: this.props.region.longitude,
      latitude: this.props.region.latitude,
    };

    const endPoint = {
      longitude: longitude,
      latitude: latitude,
    };
    console.log(endPoint);
    console.log(startPoint);

    const transportPlan = 'w';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res);
    });
  };

  render() {
    const {loading, showCancel, showYest, showOlder} = this.state;
    const {allBookings} = this.props;

    const today = moment(new Date()).format('DD MMMM YYYY');

    const yesterday = moment(new Date())
      .subtract(1, 'days')
      .format('DD MMMM YYYY');
    const older = moment(new Date())
    .subtract(2, 'days')
    .format('DD MMMM YYYY');

  
    const todayBooking =
      allBookings &&
      allBookings.filter(
        booking => moment(booking.day).format('DD MMMM YYYY') === today,
      );

  
    const yesterdayBooking =
      allBookings &&
      allBookings.filter(
        booking =>
          (moment(booking.day).format('DD MMMM YYYY') === yesterday),
      );
    const olderBooking =
      allBookings &&
      allBookings.filter(
        booking => ((moment(booking.day).format('DD MMMM YYYY') <= older) )
      );

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.book}>BOOKINGS</Text>
          {(loading === false && (
            <View>
              {(!showCancel && (
                <View>
                  <TouchableOpacity onPress={this.toggleCancel}>
                    <Text style={styles.date}>
                      <Icon
                        style={{letterSpacing: 10}}
                        name="caret-down"
                        size={25}
                      />
                      Today, {today}
                    </Text>
                  </TouchableOpacity>

                  {todayBooking.map((booking, index) => {
                    return (
                      <OrderList
                        key={index}
                        bookingName={booking.userName}
                        status={booking && booking.status}
                        loading={loading}
                        _callShowDirections={this._callShowDirections}
                        date={booking.day}
                        _id={booking._id}
                        driverId={booking.driverId}
                        mobile={booking.mobile}
                        latitude={booking.pickUp.latitude}
                        longitude={booking.pickUp.longitude}
                        address={booking.pickUp.address}
                        sendDeliveredData={this.props.sendDeliveredData}
                        getAllBookings={this.props.getAllBookings}
                      />
                    );
                  })}
                </View>
              )) || (
                <TouchableOpacity onPress={this.toggleCancel}>
                  <Text style={styles.date}>
                    <Icon
                      style={{letterSpacing: 10}}
                      name="caret-up"
                      size={25}
                    />
                    Today, {today}
                  </Text>
                </TouchableOpacity>
              )}
              {(showYest && (
                <View>
                  <TouchableOpacity onPress={this.toggleYest}>
                    <Text style={styles.date}>
                      <Icon
                        style={{letterSpacing: 10}}
                        name="caret-down"
                        size={25}
                      />
                      Yesterday, {yesterday}
                    </Text>
                  </TouchableOpacity>

                  {yesterdayBooking.map((booking, index) => {
                    return (
                      <OrderList
                        key={index}
                        bookingName={booking.userName}
                        status={booking && booking.status}
                        loading={loading}
                        _callShowDirections={this._callShowDirections}
                        date={booking.day}
                        _id={booking._id}
                        driverId={booking.driverId}
                        mobile={booking.mobile}
                        latitude={booking.pickUp.latitude}
                        longitude={booking.pickUp.longitude}
                        address={booking.pickUp.address}
                        sendDeliveredData={this.props.sendDeliveredData}
                        getAllBookings={this.props.getAllBookings}
                      />
                    );
                  })}
                </View>
              )) || (
                <TouchableOpacity onPress={this.toggleYest}>
                  <Text style={styles.date}>
                    <Icon
                      style={{letterSpacing: 10}}
                      name="caret-up"
                      size={25}
                    />
                    Yesterday, {yesterday}
                  </Text>
                </TouchableOpacity>
              )}
              {(showOlder && (
                <View>
                  <TouchableOpacity onPress={this.toggleOlder}>
                    <Text style={styles.date}>
                      <Icon
                        style={{letterSpacing: 10}}
                        name="caret-down"
                        size={25}
                      />
                      Older
                    </Text>
                  </TouchableOpacity>
                  {olderBooking.map((booking, index) => {
                    return (
                      <OrderList
                        key={index}
                        bookingName={booking.userName}
                        status={booking && booking.status}
                        loading={loading}
                        _callShowDirections={this._callShowDirections}
                        date={booking.day}
                        _id={booking._id}
                        driverId={booking.driverId}
                        mobile={booking.mobile}
                        latitude={booking.pickUp.latitude}
                        longitude={booking.pickUp.longitude}
                        address={booking.pickUp.address}
                        sendDeliveredData={this.props.sendDeliveredData}
                        getAllBookings={this.props.getAllBookings}
                      />
                    );
                  })}
                </View>
              )) || (
                <TouchableOpacity onPress={this.toggleOlder}>
                  <Text style={styles.date}>
                    <Icon
                      style={{letterSpacing: 10}}
                      name="caret-up"
                      size={25}
                    />
                    Older
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )) || (
            <View style={styles.loadContainer}>
              <Chase size={65} color="tomato" />
              <Text style={styles.txt}>LOADING ...</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  allBookings: state.home.allBookings || [],
  region: state.home.region,
});

const mapActionCreators = {
  getCurrentLocation,
  getAllBookings,
  sendDeliveredData,
};

export default connect(mapStateToProps, mapActionCreators)(Orders);
