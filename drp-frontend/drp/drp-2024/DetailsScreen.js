import React,  { useState, useEffect } from 'react';
import { Button, FlatList, View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, DraggableList  } from 'react-native';
import { REMOTE_HOST } from './Config.js';
import PhotoGrid from './PhotoGrid.js';
import RatingComponent from './Rating.js';
import FixedRating from './FixedRating.js'

const InteractiveBox = ({ children, initialSize, enlargedSize }) => {
  const [size, setSize] = useState(enlargedSize);

  const toggleSize = () => {
    setSize(currentSize => (currentSize === initialSize ? enlargedSize : initialSize));
  };

  return (
    <TouchableOpacity onPress={toggleSize} style={[styles.box, { height: size }]}>
      {children}
    </TouchableOpacity>
  );
};

export default function ItemDetailScreen({ route, navigation }) {
  const { item, user } = route.params;

  const commName = item.title;

  const [memberNames, setMembers] = useState(undefined);
  const [memberUsernames, setMemberUsernames] = useState(undefined);
  const [joined, setJoined] = useState(false);
  const [rating, setRating] = useState(3.0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REMOTE_HOST}/getCommunityMembers?community=${commName}`);
        const json = await response.json();
        setMembers(json.names);
        setMemberUsernames(json.usernames);
        if (json.usernames.includes(user)) {
          setJoined(true);
        }
      } catch (error) {
        console.error('Failed to fetch community members:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REMOTE_HOST}/getRating?community=${commName}`);
        const text = await response.text();
        const new_rating = parseFloat(text);
        setRating(new_rating);
      } catch(error) {
        console.error('Failed to fetch rating', error);
      }
    };
    fetchData();
  }, []);


  const handleJoin = async () => {
    setJoined(!joined);
    await fetch(`${REMOTE_HOST}/toggleMemberInCommunity/?commName=${commName}&username=${user}`, {
      method: 'POST',
    });

    const response = await fetch(`${REMOTE_HOST}/getCommunityMembers?community=${commName}`);
    const json = await response.json();
    setMembers(json.names);
    setMemberUsernames(json.usernames);
  };

  const handleMessage = () => {
    navigation.navigate("MessageBoard", {navigation, item, user});
  }

  const renderHeader = () => (
    <View>
      <View style={styles.commNameBox}>
        <Text style={styles.commName}>{commName}</Text>
      </View>
      <View style={styles.topRow}>
        <Text style={styles.level}>Level: {item.level}</Text>
        {joined ? (
          <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
            {<MaterialIcons name="message" size={24} color="white" />
            //  <Text style={{ color: 'white', fontSize: 24 }}>Message</Text>
            }
          </TouchableOpacity>): null}
        <TouchableOpacity
          style={[joined ? styles.joinedButton : styles.notJoinedButton]}
          onPress={handleJoin}
        >
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
      <View style={styles.mapRow}>
        <Button title="View Map" color="#3d649b" borderRadius="10" onPress={() => navigation.navigate('Map', { latitude: item.latitude, longitude: item.longitude })} />
        <RatingComponent commName={item.title} user={user} />
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.scheduleRow}>
        <Text style={styles.schedule}>{item.schedule}</Text>
      </View>
      <View style={styles.ratingRow}>
        <FixedRating rating={rating} />
      </View>
      <View>
        <PhotoGrid community={item.title} />
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
      <Text style={styles.membersHeader}>Members:</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.commentsSection}>
      <Text style={styles.commentsHeader}>Comments:</Text>
      <TextInput
        style={styles.commentsInput}
        placeholder="Write your comment..."
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
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
    minHeight: 60,
  },
  mapRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  messageButton: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 50,
    transform: [{ translateX: -25 }],
  },
});
