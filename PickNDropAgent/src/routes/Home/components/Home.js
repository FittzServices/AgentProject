import React from 'react';
import {View, Text, Image} from 'react-native';
import {Container, Button} from 'native-base';
import MapContainer from './MapContainer';
import HeaderComponent from '../../../components/HeaderComponent';
import FooterContainer from '../../../components/FooterContainer';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../components/HeaderComponent/HeaderComponentStyles';

const carMarker = require('../../../assets/carMarker.png');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRequest: false,
      isVisible: false,
      showSwitch: true,
    };
  }
  ToggleButton() {
    this.setState(currentState => ({
      isVisible: !currentState.isVisible,
    }));
  }

  UNSAFE_componentWillMount() {
    this.props.getCurrentLocation();
    this.props.setCurrentUser();
    this.props.getLoginInputData();
    this.props.getUserToken();
    let rx = this;
    setTimeout(function() {
      rx.props.sendDriverCurrentData();
      rx.props.singleDataSwitch();
      rx.props.getDriverLocationMongodb();
      rx.props.getAllBookings();
      rx.setState({showSwitch: true});
    }, 5000);
    this.setState({showSwitch: false});
  }

  componentDidUpdate() {
    this.props.emittedByNearByDriver();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.requestInfo) {
      this.setState({
        showRequest: true,
      });
    }
  }
  componentDidMount() {
    let rx = this;
    setInterval(() => {
      rx.props.sendUpdatedCurrentLocation();
    }, 10000);
    setInterval(() => {
      rx.props.getCurrentLocation();
    }, 8000);
   
  
    
  }

  handleSetShowRequest = () => {
    this.setState({
      showRequest: false,
    });
  };

  render() {
    const {isVisible, showSwitch} = this.state;
    const {ProfilePic} = this.props.inputLoginData || '';
    const ImagePic = `https://pick-drop-server.herokuapp.com/${ProfilePic}`;
    return (
      <Container>
        <View style={{flex: 1}}>
          <HeaderComponent
            inputLoginData={this.props.inputLoginData}
            ToggleButton={() => this.ToggleButton()}
          />
          <Modal isVisible={isVisible}>
            <Icon
              name="times-circle"
              size={40}
              color="tomato"
              onPress={() => this.ToggleButton()}
            />
            <View style={styles.imageContainerZoom}>
              <Image
                resizemode="contain"
                style={styles.driverPicZoom}
                source={{uri: ImagePic}}
              />
            </View>
          </Modal>

          {this.props.region.latitude && (
            <MapContainer
              region={this.props.region}
              carMarker={carMarker}
              driverLocationMongoDB={this.props.driverLocationMongoDB}
              sendActiveData={this.props.sendActiveData}
              sendSwitchData={this.props.sendSwitchData}
              getDriverLocationMongodb={() =>
                this.props.getDriverLocationMongodb()
              }
              driverLocationMongoDB={this.props.driverLocationMongoDB}
              requestInfo={this.props.requestInfo}
              pushShowRequestToInitial={() =>
                this.props.pushShowRequestToInitial()
              }
              showInfo={this.props.showInfo}
              showSwitch={showSwitch}
              confirmDriverRequest={() => this.props.confirmDriverRequest()}
            />
          )}

          <FooterContainer
            driverLocationMongoDB={this.props.driverLocationMongoDB}
          />
        </View>
      </Container>
    );
  }
}

export default Home;
