import React from 'react';
import {Text, Image, View} from 'react-native';

const defaultImage =
  'https://mj-gallery.com/eb525a45-7776-47e5-9c79-ed9c995f3d0a/grid_0.png';

const Card = props => {
  return (
    <View>
      <View>
        <Image
          defaultSource={{uri: defaultImage}} // ignorer dans le debug
          source={{uri: props.image ? props.image : defaultImage}} // affichage de l'image si elle existe ou de l'image par défaut
        />
      </View>
    </View>
  );
};

export default Card;
