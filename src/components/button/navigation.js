import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';
const NavigationButton = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.push('Params')}>
      <Text>rgloijhgrpoihj</Text>
    </TouchableOpacity>
  );
};

export default NavigationButton;
