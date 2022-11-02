import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

// factorisation du code: on cree un componnent Button
//    ->{onPress,label}: destructuration

const GoBackButton = ({onPress, label, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default GoBackButton;
