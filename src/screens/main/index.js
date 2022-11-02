import React from 'react';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import {FlatList} from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkConsumer, NetworkProvider} from 'react-native-offline';
import NoConnection from '../../components/offline';
import theme from '../../config/theme';

const Main = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  //{/*Si le film existe déjà dans la liste de like*/}
  //{/*Alors on l'enlève de cette liste*/}
  const isInLikes = async movie => {
    const likedLocal =
      (await AsyncStorage.getItem('liked')) !== null
        ? JSON.parse(await AsyncStorage.getItem('liked'))
        : [];
    // const likedLocal = JSON.parse(await AsyncStorage.getItem('liked'));
    console.log(likedLocal);
    const exist = likedLocal.filter(fav => fav.id === movie.id);
    return exist.length > 0;
  };

  const addOrRemoveLikes = async movie => {
    const liked =
      (await AsyncStorage.getItem('liked')) !== null
        ? JSON.parse(await AsyncStorage.getItem('liked'))
        : [];
    liked.push(movie);

    const exist = await isInLikes(movie);
    console.log(exist);
    //{/*Si le personnage existe dans la liste de favoris*/}
    //{/*On le supprime*/}
    if (exist) {
      const newLiked = liked.filter(fav => fav.id !== movie.id);
      await AsyncStorage.setItem('liked', JSON.stringify(newLiked));
    } else {
      await AsyncStorage.setItem('liked', JSON.stringify(liked));
    }
  };

  const checkLiked = async () => {
    const liked = AsyncStorage.getItem('liked')
      ? JSON.parse(await AsyncStorage.getItem('liked'))
      : [];
    console.log(liked);
  };

  const loadNextPage = () => {
    setPage(page + 1);
  };

  const getImage = path => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${path}`;
  };
  useEffect(() => {
    const getDatas = async () => {
      try {
        const result = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=5e08b63d40d83ffb200f2f493ab8e699&language=en-US&page=${page}`,
        );
        //setMovies(result.data.results);
        setMovies([...movies, ...result.data.results]);
        console.log(result.data.results);
        showMessage({
          message: 'Récupération réussie',
          type: 'info',
          color: 'white',
          backgroundColor: 'green',
          position: 'center',
          duration: 400,
        });
      } catch (err) {
        console.log(err);
        showMessage({
          message: 'Récupération échoué...',
          type: 'info',
          color: 'white',
          backgroundColor: 'red',
          position: 'center',
          duration: 400,
        });
      }
    };
    getDatas();
  }, [page]);

  return (
    <NetworkProvider>
      <NetworkConsumer>
        {({isConnected}) =>
          isConnected ? (
            <ListeDeFilm>
              <NextButton onPress={() => navigation.navigate('Likes')}>
                <LikeText>Likes</LikeText>
              </NextButton>

              <RenduFilms
                data={movies}
                keyExtractor={item => item.id}
                onEndReached={loadNextPage}
                renderItem={({item}) => (
                  <Film>
                    <TitreFilm>{item.title}</TitreFilm>
                    <ImageFilm
                      source={{
                        uri: `${getImage(item.poster_path)}`,
                      }}
                    />
                    <LikeButton onPress={() => addOrRemoveLikes(item)}>
                      <LikeText>Ajouter aux favoris</LikeText>
                    </LikeButton>
                  </Film>
                )}
              />
            </ListeDeFilm>
          ) : (
            <NoConnection />
          )
        }
      </NetworkConsumer>
    </NetworkProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ListeDeFilm = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  display: flex;
  background-color: ${props => props.theme.primary};
`;

const RenduFilms = styled.FlatList`
  background-color: ${props => props.theme.primary};
`;

const Film = styled.View`
  padding: 10px;
`;

const TitreFilm = styled.Text`
  color: ${props => props.theme.secondary};
  font-size: 25;
  text-align: center;
`;
const ImageFilm = styled.Image`
  width: 200;
  height: 300;
  margin-left: auto;
  margin-right: auto;
  border: 5px;
  border-color: ${props => props.theme.secondary};
`;

const LikeButton = styled.TouchableOpacity`
  padding: 15px;
  margin: 10px;
  background-color: ${props => props.theme.primary};
  align-items: center;
  align-self: center;
  border-radius: 30px;
  border: 3px ${props => props.theme.secondary};
`;
const NextButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${props => props.theme.primary};
  margin-left: 330px;
  right: 10;
  border-radius: 30px;
  border: 3px ${props => props.theme.secondary};
`;

const LikeText = styled.Text`
  color: ${props => props.theme.secondary};
  text-align: center;
`;
export default Main;
