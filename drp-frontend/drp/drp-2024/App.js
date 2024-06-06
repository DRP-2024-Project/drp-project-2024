

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen  from './UserScreen';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import SearchBar from './SearchBar';
import SimpleMap from './map';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="User ID">
      <Stack.Screen name="Find your community" component={SearchBar} />
        <Stack.Screen name="User ID" component={UserScreen} />
        <Stack.Screen name="Communities" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Map" component={SimpleMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}