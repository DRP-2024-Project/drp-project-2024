import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { REMOTE_HOST } from './Config.js';

export default function ItemDetailScreen({ route, navigation }) {
  const { item, user } = route.params;

  const commName = item.title;

  const [memberNames, setMembers] = useState(undefined);
  const [memberUsernames, setMemberUsernames] = useState(undefined);
  const [joined, setJoined] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${REMOTE_HOST}/getCommunityMembers?community=${commName}`);
//         const json = await response.json();
//         setMembers(json.names);
//         setMemberUsernames(json.usernames);
//         if (json.usernames.includes(user)) {
//           setJoined(true);
//         }
//       } catch (error) {
//         console.error('Failed to fetch community members:', error);
//       }
//     };

//     fetchData();
//   }, []);


const handleMessage = () => {
    navigation.navigate("MessageBoard", {navigation, item, user});
  }

  const handleJoin = async () => {
    // setJoined(!joined);
    // await fetch(`${REMOTE_HOST}/toggleMemberInCommunity/?commName=${commName}&username=${user}`, {
    //   method: 'POST',
    // });

    // const response = await fetch(`${REMOTE_HOST}/getCommunityMembers?community=${commName}`);
    // const json = await response.json();
    // setMembers(json.names);
    // setMemberUsernames(json.usernames);
  };

  const renderHeader = () => (
    <View>
      <View style={styles.commNameBox}>
        <Text style={styles.commName}>{commName}</Text>
      </View>
      <View style={styles.topRow}>
        {joined ? (
          <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
            <MaterialIcons name="message" size={24} color="white" />
          </TouchableOpacity>) : null}
        <TouchableOpacity
          style={[joined ? styles.joinedButton : styles.notJoinedButton]}
          onPress={handleJoin}
        >
          <Text style={styles.joinButtonText}>{joined ? 'Joined' : 'Join'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={memberNames}
      renderItem={({ item }) => (
        <View>
          <Text>{item}</Text>
        </View>
      )}
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
  joinedButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#32a852',
  },
  notJoinedButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
  },
  joinButtonText: {
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
