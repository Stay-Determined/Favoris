import React from 'react';
import {SafeAreaView, Text, View, Dimensions} from 'react-native';
import Routes from './src/config/routes';
import FlashMessage from 'react-native-flash-message';
import {ThemeProvider} from 'styled-components';
import theme from './src/config/theme';
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        style={{
          width: '100%',
          height: Dimensions.get('window').height,
        }}>
        <Routes />
        <FlashMessage position={'top'} />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
