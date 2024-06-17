

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen  from './UserScreen';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import DetailsProposal from './DetailsProposal';
import CreateScreen from './CreateScreen';
import CreateCommunityScreen from './CreateCommunityScreen';
import CreateProposalScreen from './CreateProposalScreen';
import SearchBar from './SearchBar';
import SimpleMap from './map';
import RatingComponent from './Rating';
import MessageBoard from './MessageBoard';
import Home from './MyHomePage';
import MapPicker from './MapPicker';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="User ID">
      <Stack.Screen name="Map Picker" component={MapPicker} />
      <Stack.Screen name="Find your community" component={SearchBar} />
        <Stack.Screen name="User ID" component={UserScreen} />
        <Stack.Screen name="Communities" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Details Proposal" component={DetailsProposal} />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen name="Create Community" component={CreateCommunityScreen} />
        <Stack.Screen name="Create Proposal" component={CreateProposalScreen} />
        <Stack.Screen name="Map" component={SimpleMap} />
        <Stack.Screen name="Rating" component={RatingComponent} />
        <Stack.Screen name="MessageBoard" component={MessageBoard} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}