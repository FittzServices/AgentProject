import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {Container} from 'native-base';
import MapContainer from './MapContainer';

import FooterComponent from '../../../components/FooterComponents';
import FindDriver from './FindDriver';
import FindDriver2 from './FindDriver2';
import Fare from './Fare';
import Fab from './Fab';
import Fab2 from './Fab2';
import InitialFare from './InitialFare';
import {Actions} from 'react-native-router-flux';

const carMarker = require('../../../assets/carMarker.png');

export default class Home extends Component {
  state = {
    initialAddress: '',
    changeSearch: false,
    enableButton: false,
  };
  UNSAFE_componentWillMount() {
    let rx = this;

    this.props.getCurrentLocation();

    setInterval(function() {
      rx.props.getNearByDrivers();
    }, 5000);
    this.props.getInitialAddresMatrix();
    setTimeout(function() {
      rx.props.changeCodeToAddress();
    }, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.booking.status === 'confirmed') {
       Actions.trackDriver();
    }
    if (this.props.booking.status === 'delivered') {
      this.props.clearEntireSate();
    }
    this.props.getCurrentLocation();
  }

  ToggleButton() {
    this.setState(currentState => ({
      changeSearch: !currentState.changeSearch,
    }));
  }
  ChangeEnableButton() {
    this.setState(currentState => ({
      enableButton: !currentState.enableButton,
    }));
  }

  render() {
    const {status} = this.props.booking
    
    const newStatus = this.props.InitialBooking.status;

    return (
        
      <Container>
      {(status||newStatus) !== 'pending'  && (
        <View style={{flex: 1}}>
          {this.props.region.latitude && (
            <MapContainer
              region={this.props.region}
              getInputData={this.props.getInputData}
              toggleSearchResultModal={this.props.toggleSearchResultModal}
              getAddressSuggestion={this.props.getAddressSuggestion}
              resultTypes={this.props.resultTypes}
              predictions={this.props.predictions}
              getSelectedAddress={this.props.getSelectedAddress}
              selectedAddress={this.props.selectedAddress}
              getLoginInputData={this.props.getLoginInputData}
              inputLoginData={this.props.inputLoginData}
              carMarker={carMarker}
              nearByDrivers={this.props.nearByDrivers}
              initialAddress={this.props.initialAddress}
              ToggleButton={() => this.ToggleButton()}
              changeSearch={this.state.changeSearch}
            />
          )}
          {(this.state.changeSearch && (
            <Fab onPressAction={() => this.props.bookCar()} />
          )) || (
            <Fab2
              onPressAction={() => this.props.bookCarInitial()}
              ChangeEnableButton={() => this.ChangeEnableButton()}
              enableButton={this.state.enableButton}
            />
          )}

          {(this.state.changeSearch && <Fare fare={this.props.fare} />) || (
            <InitialFare initialFare={this.props.initialFare} />
          )}
          <FooterComponent />
        </View>
        ) || (this.state.changeSearch &&
        <FindDriver selectedAddress={this.props.selectedAddress} />
        ||
        <FindDriver2 initialAddress={this.props.initialAddress} />) }
      </Container>
    );
  }
}
