import React from 'react';
import {Text, View, SafeAreaView, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import store from './src/store';

import styled from 'styled-components/native';

import { useAppDispatch } from './src/hooks';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';

const Tab = createBottomTabNavigator();

function SearchScreen() {
  return (
    <View>
      <Text>Pesquisar por personagens</Text>
    </View>
  )
}

function CharactersScreen() {
  return (
    <View>
      <Text>Todos os personagens</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const TabIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

export default App;