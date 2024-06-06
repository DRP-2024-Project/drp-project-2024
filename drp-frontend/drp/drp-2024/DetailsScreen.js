import React,  { useState, useEffect } from 'react';
import { FlatList, ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import PhotoGrid from './PhotoGrid.js';
import StarRating from './StarRating';
import { REMOTE_HOST } from './Config.js';

const InteractiveBox = ({ children, initialSize, enlargedSize }) => {
  const [size, setSize] = useState(initialSize);

  const toggleSize = () => {
    setSize(currentSize => (currentSize === initialSize ? enlargedSize : initialSize));
  };

  return (
    <TouchableOpacity onPress={toggleSize} style={[styles.box, { height: size }]}>
      {children}
    </TouchableOpacity>
  );
};


export default function ItemDetailScreen({ route }) {
  const { item, user } = route.params;

  const commName = item.title

  const [memberNames, setMembers] = useState(undefined);
  const [memberUsernames, setMemberUsernames] = useState(undefined);
  const [joined, setJoined] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
      // const response = await fetch(`${REMOTE_HOST}/getCommunityMembers?community=${commName}`);
        const response = await fetch(`http://localhost:3000/getCommunityMembers?community=${commName}`);
        const json = await response.json();
        setMembers(json.names);
        setMemberUsernames(json.usernames);
        if (json.usernames.includes(user)) {
          setJoined(true);
        }
      } catch(error) {
        console.error('Failed to fetch community members:', error);
      }
    };

    fetchData();
  }, []);

  const handleJoin = async () => {
    console.log(memberUsernames);
    console.log(memberNames);
    setJoined(!joined);
    const response = await fetch(`http://localhost:3000/toggleMemberInCommunity/?commName=${commName}&username=${user}`, {
      method: 'POST',
    });
    // const response = await fetch(`${REMOTE_HOST}/toggleMemberInCommunity/?commName=${commName}&username=${user}`, {
    //     method: 'POST',
    // });
    
  };

  return (
<ScrollView style={styles.container}>
  <View style={styles.topRow}>
    <Text style={styles.level}>Level: {item.level}</Text>
    <TouchableOpacity 
    style={[joined ? styles.joinedButton : styles.notJoinedButton]}
    onPress={handleJoin}>
      <Text style={styles.joinButtonText}>{joined ? 'Joined' : 'Join'}</Text>
  </TouchableOpacity>
  </View>
  <View style={styles.middleRow}>
  <InteractiveBox initialSize={50} enlargedSize={100}>
      <Text style={styles.location}>{item.location}</Text>
    </InteractiveBox>
    <InteractiveBox initialSize={50} enlargedSize={100}>
      <Text style={styles.contactInfo}>{item.contactInfo}</Text>
    </InteractiveBox>
    <InteractiveBox initialSize={50} enlargedSize={100}>
      <Text style={styles.pricing}>{item.price} per {item.perTime}</Text>
    </InteractiveBox>
  </View>
  <Text style={styles.description}>{item.description}</Text>
  <View style={styles.scheduleRow}>
    <Text style={styles.schedule}>{item.schedule}</Text>
  </View>
  <View style={styles.ratingRow}>
    <StarRating rating={item.rating} maxRating={5} />
  </View>
  <View>
    <PhotoGrid community={item.title}/>
  </View>
  <View style={styles.additionalInfoBox}>
    <Text style={styles.additionalInfo}>Additional Info:</Text>
    <View style={styles.equipmentBox}>
      <Text style={styles.equipmentRequired}>Equipment Required:</Text>
      <Text style={styles.equipmentList}>{item.requiredEquipment}</Text>
    </View>
    <View style={styles.equipmentBox}>
      <Text style={styles.equipmentRequired}>Additional Links:</Text>
      <Text style={styles.equipmentList}>{item.links}</Text>
    </View>
  </View>
  <View style={styles.membersSection}>
    <Text style={styles.membersHeader}>Members:</Text>
    <FlatList
      data={memberNames}
      renderItem={({ item }) => (<Text>{item}</Text>)}
      keyExtractor={item => item}
      contentContainerStyle={styles.listContainer}
    />
  </View>
  <View style={styles.commentsSection}>
    <Text style={styles.commentsHeader}>Comments:</Text>
    <TextInput
      style={styles.commentsInput}
      placeholder="Write your comment..."
      multiline={true}
      rows={4}
    />
  </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topRow: {
    marginBottom: 10,
  },
  joinedButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 'auto',
    backgroundColor: 'green',
  },
  notJoinedButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 'auto',
    backgroundColor: '#d3d3d3',
  },
  joinButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  level: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
  },
  contactInfo: {
    fontSize: 14,
  },
  pricing: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    marginVertical: 10,
  },
  scheduleRow: {
    marginBottom: 10,
  },
  schedule: {
    fontSize: 14,
  },
  ratingRow: {
    marginBottom: 10,
  },
  rating: {
    fontSize: 14,
  },
  additionalInfoBox: {
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  equipmentBox: {
    marginTop: 5,
    backgroundColor: '#c8c8c8',
    borderRadius: 5,
    padding: 5,
  },
  equipmentRequired: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  equipmentList: {
    fontSize: 14,
  },
  membersSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  membersHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentsSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  commentsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentsInput: {
    fontSize: 14,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginTop: 5,
    minHeight: 60, // Adjust height based on the design requirement
  },
});