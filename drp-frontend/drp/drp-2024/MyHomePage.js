import React,  { useState, useEffect, useCallback } from 'react';
import { REMOTE_HOST } from './Config.js';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Title, Button } from 'react-native';
import CommunityList from './CommunityList.js';
import NotificationList from './NotificationList.js';
import { useFocusEffect } from '@react-navigation/native';


export default function HomePageScreen({ route }) {

    const { navigation, user } = route.params;
    const [reload, setReload] = useState(false);

    const handlePress = async () => {
        navigation.navigate("Communities", { navigation, user });
    };



    useFocusEffect(
    useCallback(() => {
      // focus
      setReload(reload => !reload);

      return () => {
        // unfocus
      };
    }, [])
  );



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
              reload={reload}
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