/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Calculator from './src/Calculator';

const App = () => {
  return (
    <View style={styles.App}>
      <StatusBar barStyle="dark-content" />
      <Calculator/>
    </View>
  );
};

const styles = StyleSheet.create({
  App:{
    margin:5
  }
});

export default App;
