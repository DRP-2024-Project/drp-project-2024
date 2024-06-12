import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { REMOTE_HOST } from './Config.js';

export default function ItemDetailScreen({ route, navigation }) {
  const { item, user } = route.params;

  const propName = item.title;
  const [interested, setInterested] = useState(false);
  const [loading, setLoading] = useState(true);  // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REMOTE_HOST}/getProposalMembers?proposal=${propName}`);
        const json = await response.json();
        console.log(json);
        if (json.usernames.includes(user)) {
            setInterested(true);
        }
      } catch (error) {
        console.error('Failed to fetch proposal members:', error);
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  const handleMessage = () => {
    navigation.navigate("MessageBoard", {navigation, item, user});
  }

  const handleInterested = async () => {
    setInterested(!interested);
    await fetch(`${REMOTE_HOST}/toggleInterested/?propName=${propName}&username=${user}`, {
      method: 'POST',
    });
  };

  const renderHeader = () => (
    <View>
      <View style={styles.propNameBox}>
        <Text style={styles.commName}>{propName}</Text>
      </View>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
          <Text style={{ color: 'white', fontSize: 24 }}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[interested ? styles.interestedButton : styles.notInterestedButton]}
          onPress={handleInterested}
        >
          <Text style={styles.interestedButtonText}>{interested ? 'Interested' : 'Add to Interests'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={[]}
      renderItem={() => <></>}
      keyExtractor={item => item}
      contentContainerStyle={styles.listContainer}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  propNameBox: {
    backgroundColor: '#e8e8e8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  commName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  interestedButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#32a852',
  },
  notInterestedButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
  },
  interestedButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  messageButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  description: {
    fontSize: 14,
    marginVertical: 10,
  },
  listContainer: {
    paddingVertical: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
