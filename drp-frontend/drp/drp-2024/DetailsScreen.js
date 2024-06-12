import React,  { useState, useEffect, useCallback } from 'react';
import { Button, FlatList, View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { REMOTE_HOST } from './Config.js';
import PhotoGrid from './PhotoGrid.js';
import RatingComponent from './Rating.js';
import FixedRating from './FixedRating.js';

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
  const [owner, setOwner] = useState(false);

  //For creating a new event in an unscheduled community
  const [modalVisible, setModalVisible] = useState(false);
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [newDesc, setNewDesc] = useState('')
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
  }, [commName, user]);


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
  }, [commName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respone = await fetch(`${REMOTE_HOST}/isOwner?community=${commName}&user=${user}`);
        const json = await respone.json();
        setOwner(json.owner);
      } catch(error) {
        console.erro('Failed to fetch ownership', error);
      }
    };
    fetchData();
    }, [commName, user]);

  useEffect(() => {
    console.log(owner);
  }, [owner]);

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

  const handleCreateEvent = async() => {
    const data = {
      date: newDate,
      time: newTime,
      user: user,
      comm: commName,
      desc: newDesc
    }
    const notification = {
      title: 'New Event',
      message: newDesc,
      community_id: item.id,
    }
    setModalVisible(false);
    await fetch(`${REMOTE_HOST}/createEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    await fetch(`${REMOTE_HOST}/createNotification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    })
  }

  const handleMessage = () => {
    navigation.navigate("MessageBoard", {navigation, item, user});
  }

  const renderHeader = useCallback(() => (
    <View>
      <View style={styles.commNameBox}>
        <Text style={styles.commName}>{commName}</Text>
      </View>
      <View style={styles.topRow}>
        <Text style={styles.level}>Level: {item.level}</Text>
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
          <Text style={styles.schedule}>{item.schedule === '' ? "No fixed schedule" : item.schedule}</Text>
          {((item.schedule === '' && joined) || owner) && <TouchableOpacity 
            style={styles.organiseButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.organiseButtonText}>Organise a session</Text>
          </TouchableOpacity>
          }
        </InteractiveBox>
        <InteractiveBox initialSize={50} enlargedSize={100}>
          <Text style={styles.pricing}>{item.price} per {item.perTime}</Text>
        </InteractiveBox>
      </View>
      <View style={styles.mapRow}>
        <Button title="View Map" color="#3d649b" borderRadius="10" onPress={() => navigation.navigate('Map', { latitude: item.latitude, longitude: item.longitude })} />
        {joined ? (<RatingComponent commName={item.title} user={user} />): null } 
        {joined ? (<Button title="Events" color="#3d649b" borderRadius="10" onPress={handleMessage} />): null}
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
  ), [memberNames, memberUsernames, joined, owner]);

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
    <View style={styles.container}>
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
    />
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>

        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.commName}>Create an event</Text>
          <View style={styles.inputRow}>
            <View style={styles.labelInputContainer}> 
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                value={newDate}
                onChangeText={setNewDate}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.labelInputContainer}> 
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={styles.input}
                value={newTime}
                onChangeText={setNewTime}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.labelInputContainer}> 
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={newDesc}
                onChangeText={setNewDesc}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>
      </View>
      </View>
      </Modal>
    </View>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  organiseButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  labelInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9dbda',
    borderRadius: 10,
    padding: 10, 
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  createButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
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
  schedule: {
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
  organiseButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  organiseButtonText: {
    fontSize: 14, // Reduced font size
    color: "#3d649b",
  },
});
