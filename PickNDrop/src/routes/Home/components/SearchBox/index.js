import React from 'react';
import {Text} from 'react-native';
import {View, InputGroup, Input, Button} from 'native-base';
import SwitchButton from '../SwitchButton'
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './SearchBoxStyles';
export const SearchBox = ({
  getInputData,
  toggleSearchResultModal,
  getAddressSuggestion,
  selectedAddress,
  ToggleButton
}) => {
  const {selectedPickUp} = selectedAddress || {};
  function handleInput(key, val) {
    getInputData({
      key,
      value: val,
    });
    getAddressSuggestion();
  }

  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>PICK-UP</Text>
        <InputGroup>
          <Icon name="search" size={15} color="red" />
          <Input
            style={styles.inputSearch}
            onFocus={() => toggleSearchResultModal('pickUp')}
            placeholder="Choose pick-up location"
            onChangeText={handleInput.bind(this, 'pickUp')}
            value={selectedPickUp && selectedPickUp.address}
          />
        </InputGroup>
        <SwitchButton ToggleButton={()=>ToggleButton()}/>
      </View>

    </View>
  );
};

export default SearchBox;
