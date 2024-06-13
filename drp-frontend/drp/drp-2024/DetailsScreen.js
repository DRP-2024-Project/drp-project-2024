import React, { useState, useEffect } from 'react';
import { Button, ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { REMOTE_HOST } from './Config.js';
import PhotoGrid from './PhotoGrid.js';
import ImageBanner from './ImageBanner.js';
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
  const [owner, setOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [rating, setRating] = useState(3.0);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REMOTE_HOST}/getRating?community=${commName}`);
        const text = await response.text();
        const new_rating = parseFloat(text);
        setRating(new_rating);
      } catch (error) {
        console.error('Failed to fetch rating', error);
      }
    };
    fetchData();
  }, [commName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REMOTE_HOST}/isOwner?community=${commName}&user=${user}`);
        const json = await response.json();
        setOwner(json.owner);
      } catch (error) {
        console.error('Failed to fetch ownership', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [commName, user]);

  const handleCreateEvent = async () => {
    const data = {
      date: newDate,
      time: newTime,
      user: user,
      comm: commName,
      desc: newDesc,
    };
    setModalVisible(false);
    await fetch(`${REMOTE_HOST}/createEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const handleMessage = () => {
    navigation.navigate('MessageBoard', { navigation, item, user });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.topRowContainer}>
          <View style={styles.bannerContainer}>
            <ImageBanner user={user} item={item} joined={joined} setJoined={setJoined} setMemberUsernames={setMemberUsernames} setMembers={setMembers}/>
          </View>

          <View style={styles.middleRow}>
            <View style={[styles.boxContainer, styles.locationBox]}>
              <Text style={styles.title}>Location:</Text>
              <Text style={styles.content}>{item.location}</Text>
            </View>
            <View style={[styles.boxContainer, styles.scheduleBox]}>
              <Text style={styles.title}>Schedule:</Text>
              {item.schedule === '' ? (
                <View style={styles.scheduleContainer}>
                  {((item.schedule === '' && joined) || owner) && (
                    <TouchableOpacity style={styles.organiseButton} onPress={() => setModalVisible(true)}>
                      <Text style={styles.organiseButtonText}>Organise</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <Text style={styles.content}>{item.schedule}</Text>
              )}
            </View>
            <View style={[styles.boxContainer, styles.pricingBox]}>
              <Text style={styles.title}>Pricing:</Text>
              <Text style={styles.content}>{item.price} per {item.perTime}</Text>
            </View>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.mapRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map', { latitude: item.latitude, longitude: item.longitude })}>
              <Text style={styles.buttonText}>View Map</Text>
            </TouchableOpacity>
            <View style={joined ? null : styles.disabledButton}>
              <RatingComponent />
            </View>
            <TouchableOpacity style={joined ? styles.button : styles.disabledButton} disabled={!joined} onPress={handleMessage}>
              <Text style={styles.buttonText}>Events</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.boxContainer, styles.descriptionBox]}>
            <Text style={styles.title}>Description:</Text>
            <ScrollView style={styles.descriptionContent}>
              <Text style={styles.content}>{item.description}</Text>
            </ScrollView>
          </View>
        </View>

        <View style={[styles.contactInfoBox]}>
          <Text style={styles.contactInfoText}>Contact Info: {item.contactInfo}</Text>
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
        {memberNames && memberNames.map(member => (
          <View key={member}>
            <Text>{member}</Text>
          </View>
        ))}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsHeader}>Comments:</Text>
          <TextInput
            style={styles.commentsInput}
            placeholder="Write your comment..."
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commNameBox: {
    marginBottom: 16,
  },
  commName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scheduleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  topRowContainer: {
    flex: 1,
    paddingTop: 20,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  boxContainer: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  content: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  organiseButton: {
    backgroundColor: '#3d649b',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    alignSelf: 'stretch',
  },
  organiseButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  mainContainer: {
    marginBottom: 20,
  },
  mapRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3d649b',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  descriptionBox: {
    height: 150, // Fixed height
    marginBottom: 16,
  },
  descriptionContent: {
    flex: 1,
  },
  contactInfoBox: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingRow: {
    marginBottom: 16,
  },
  additionalInfoBox: {
    marginBottom: 16,
  },
  additionalInfo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  equipmentBox: {
    marginBottom: 16,
  },
  equipmentRequired: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  equipmentList: {
    fontSize: 16,
  },
  membersHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  commentsSection: {
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  commentsInput: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    textAlignVertical: 'top',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  labelInputContainer: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#BDBDBD',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginRight: 10,
  },
  createButton: {
    backgroundColor: '#3d649b',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
