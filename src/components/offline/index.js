import React from 'react';
import theme from '../../config/theme';
import styled from 'styled-components';
import {Text, SafeAreaView} from 'react-native';
const NoConnection = () => {
  return (
    <BackOffline>
      <LikeText> Vous êtes hors ligne...</LikeText>
      <LikeText> Connectez vous pour continuer</LikeText>
    </BackOffline>
  );
};
const BackOffline = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  display: flex;
  background-color: ${props => props.theme.primary};
`;
const LikeText = styled.Text`
  color: ${props => props.theme.secondary};
  font-size: 40;
  text-align: center;
`;

export default NoConnection;
