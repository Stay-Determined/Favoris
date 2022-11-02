import React from 'react';

import {Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import styled from 'styled-components';
import theme from './theme';

import StartPage from '../screens/start';
import Main from '../screens/main';
import Likes from '../screens/likes';

const Stack = createNativeStackNavigator();
const Routes = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerStyle: {backgroundColor: theme.primary},
          headerTintColor: theme.secondary,
        }}>
        <Stack.Screen
          options={{
            title: 'Movie Liker',
            headerLeft: () => <Text />,
          }}
          name="Start"
          component={StartPage}
        />
        <Stack.Screen
          options={{
            title: 'Movie Liker',
            headerLeft: () => <Text />,
            headerRight: () => <Text />,
          }}
          name="Main"
          component={Main}
        />
        <Stack.Screen
          options={{
            title: 'Vos films Favoris',
            headerLeft: () => <Text />,
          }}
          name="Likes"
          component={Likes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const LikeText = styled.Text`
  color: ${props => props.theme.secondary};
`;

const Next = styled.TouchableOpacity`
  padding-left: 5px;
  padding-right: 5px;
  background-color: ${props => props.theme.primary};
  align-items: center;
  align-self: center;
  border-radius: 50px;
  border: 3px ${props => props.theme.secondary};
`;

export default Routes;
