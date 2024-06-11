import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { REMOTE_HOST } from './Config.js';

export default function ItemDetailScreen({ route, navigation }) {
  const { item, user } = route.params;

  const commName = item.title;
  const [interested, setInterested] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REMOTE_HOST}/getProposalMembers?proposal=${commName}`);
        const json = await response.json();
        console.log(json);
        if (json.usernames.includes(user)) {
            setInterested(true);
        }
      } catch (error) {
        console.error('Failed to fetch proposal members:', error);
      }
    };

    fetchData();
  }, []);


const handleMessage = () => {
    navigation.navigate("MessageBoard", {navigation, item, user});
  }

  const handleInterested = async () => {
    setInterested(!interested);
    await fetch(`${REMOTE_HOST}/toggleInterested/?propName=${commName}&username=${user}`, {
      method: 'POST',
    });
  };

  const renderHeader = () => (
    <View>
      <View style={styles.commNameBox}>
        <Text style={styles.commName}>{commName}</Text>
      </View>
      <View style={styles.topRow}>
        {interested ? (
          <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
            {/* <MaterialIcons name="message" size={24} color="white" /> */}
            <Text style={{ color: 'white', fontSize: 24 }}>Message</Text>

          </TouchableOpacity>) : null}
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
  commNameBox: {
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
    flex: 1,
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
  description: {
    fontSize: 14,
    marginVertical: 10,
  },
  listContainer: {
    paddingVertical: 10,
  },
});
