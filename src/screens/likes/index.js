import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native'; // à suppprimer plus tard
import {useFocusEffect} from '@react-navigation/native';
import {NetworkConsumer, NetworkProvider} from 'react-native-offline';

import styled from 'styled-components';
import theme from '../../config/theme';

import NoConnection from '../../components/offline';

const Likes = ({navigation}) => {
  const [liked, setDataReceived] = useState([]);

  const getImage = path => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${path}`;
  };

  useFocusEffect(() => {
    const getLikes = async () => {
      const likedLocal = (await AsyncStorage.getItem('liked'))
        ? JSON.parse(await AsyncStorage.getItem('liked'))
        : [];
      console.log(likedLocal);
      setDataReceived(likedLocal);
    };
    getLikes();
  });

  return (
    <NetworkProvider>
      <NetworkConsumer>
        {({isConnected}) =>
          isConnected ? (
            <ListeLikes>
              <BackButton onPress={() => navigation.navigate('Main')}>
                <LikeText>Back</LikeText>
              </BackButton>
              <RenduLikes>
                {liked.map(movie => (
                  <Like key={movie.id}>
                    <TitreLike>{movie.title}</TitreLike>
                    <ImageLike
                      source={{
                        uri: `${getImage(movie.poster_path)}`,
                      }}
                    />
                  </Like>
                ))}
              </RenduLikes>
            </ListeLikes>
          ) : (
            <NoConnection />
          )
        }
      </NetworkConsumer>
    </NetworkProvider>
  );
};

const ListeLikes = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  display: flex;
  background-color: ${props => props.theme.primary};
`;

const RenduLikes = styled.ScrollView`
  background-color: ${props => props.theme.primary};
`;

const Like = styled.View`
  padding: 10px;
  margin-bottom: 20px;
`;

const TitreLike = styled.Text`
  color: ${props => props.theme.secondary};
  font-size: 25;
  text-align: center;
`;
const ImageLike = styled.Image`
  width: 200;
  height: 300;
  margin-left: auto;
  margin-right: auto;
  border: 5px;
  border-color: ${props => props.theme.secondary};
`;
const BackButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${props => props.theme.primary};
  margin-right: 330px;
  left: 10;
  border-radius: 30px;
  border: 3px ${props => props.theme.secondary};
`;
const LikeText = styled.Text`
  color: ${props => props.theme.secondary};
  text-align: center;
`;

export default Likes;
