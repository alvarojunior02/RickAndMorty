import React from 'react';
import {Text, View, SafeAreaView, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import styled from 'styled-components/native';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import CharactersScreen from './src/screens/CharactersScreen';
import SearchResultScreen from './src/screens/SearchReultScreen';
import InfoCharacterScreen from './src/screens/InfoCharacterScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      > 

        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Characters" component={CharactersScreen} />        
        <Stack.Screen name="SearchResult" component={SearchResultScreen} />
        <Stack.Screen name="InfoCharacter" component={InfoCharacterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

export default App;