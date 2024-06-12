import React,  { useState, useEffect } from 'react';
import { REMOTE_HOST } from './Config.js';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Title, Button } from 'react-native';
import CommunityList from './CommunityList.js';
import NotificationList from './NotificationList.js';

export default function HomePageScreen({ route }) {

    const { navigation, user } = route.params;

    const handlePress = async () => {
        navigation.navigate("Communities", { navigation, user });
    };

    return (
        <View style={styles.container}>
          <NotificationList user={user} navigation={navigation}/>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>My Communities</Text>
          </View>
          <View style={styles.listContainer}>
            <CommunityList 
              value={''} 
              search={''} 
              navigation={navigation} 
              user={user} 
              myCommunities={true}
            />
          </View>
          <Button title="Find More Communities" color="#3d649b" borderRadius="10" onPress={handlePress} />
        </View>
      );
    }


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#f8f9fa',
          padding: 20,
        },
        headerContainer: {
          marginBottom: 20,
        },
        headerText: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#343a40',
        },
        listContainer: {
          flex: 1,
        }
    });