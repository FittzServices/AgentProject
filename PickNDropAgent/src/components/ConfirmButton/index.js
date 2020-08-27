import React from 'react';
import SwipeButton from 'rn-swipe-button';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ComfirmStyles';
import SoundPlayer from 'react-native-sound-player';

const ConfirmButton = ({
  status,
  showInfo,
  confirmDriverRequest,
  pushShowRequestToInitial,
  requestInfo,
}) => {
  const handleConfirm = () => {
    confirmDriverRequest();
    pushShowRequestToInitial();
  };
  const facebookIcon = () => <Icon name="trash" color="aqua" size={30} />;

  function playSong() {
    try {
      SoundPlayer.playSoundFile('vibrat', 'mp3');
    } catch (e) {
      alert('Cannot play the file');
      console.log('cannot play the song file', e);
    }
  }

  return (
    <View>
      <Text style={styles.txt}>Request From : {requestInfo.userName}</Text>
      <Text style={{fontSize: 20}}>Address: {requestInfo.pickUp.address}</Text>

      <View style={styles.container}>
        {showInfo === true && null}
        {(status === 'pending' && playSong()) || null}

        <SwipeButton
          disabled={false}
          swipeSuccessThreshold={70}
          height={45}
          width={330}
          title="Confirm Request"
          onSwipeSuccess={() => {
            handleConfirm();
          }}
          railFillBackgroundColor="black"
          railFillBorderColor="aqua"
          thumbIconBackgroundColor="black"
          thumbIconComponent={facebookIcon}
          railBackgroundColor="aqua"
          railBorderColor="black"
        />
      </View>
    </View>
  );
};

export default ConfirmButton;
