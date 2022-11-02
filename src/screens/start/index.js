import React from 'react';

import {SafeAreaView, Text, Button} from 'react-native'; // button à supprimer
import {NetworkConsumer, NetworkProvider} from 'react-native-offline';
import {Icon} from 'react-native-vector-icons';

import styled from 'styled-components';
import theme from '../../config/theme';

import NoConnection from '../../components/offline';

const StartPage = ({navigation}) => {
  return (
    <NetworkProvider>
      <NetworkConsumer>
        {({isConnected}) =>
          isConnected ? (
            <AffichageStart>
              <LikeButton onPress={() => navigation.navigate('Main')}>
                <LikeText>Start</LikeText>
              </LikeButton>
            </AffichageStart>
          ) : (
            <NoConnection />
          )
        }
      </NetworkConsumer>
    </NetworkProvider>
  );
};

const LikeText = styled.Text`
  color: ${props => props.theme.secondary};
`;

const AffichageStart = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  display: flex;
  background-color: ${props => props.theme.primary};
`;

const LikeButton = styled.TouchableOpacity`
  padding: 15px;
  margin: 10px;
  border-radius: 50px;
  align-items: center;
  align-self: center;
  background-color: ${props => props.theme.primary};
  border: 3px ${props => props.theme.secondary};
`;
export default StartPage;
