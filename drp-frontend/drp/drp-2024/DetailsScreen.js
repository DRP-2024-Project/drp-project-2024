import React, { useState, useEffect } from 'react';
import { PixelRatio } from 'react-native';
import { Button, ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ActivityIndicator, Platform, Linking } from 'react-native';
import { REMOTE_HOST } from './Config.js';
import PhotoGrid from './PhotoGrid.js';
import ImageBanner from './ImageBanner.js';
import RatingComponent from './Rating.js';
import FixedRating from './FixedRating.js';
import { createNotification } from './NotificationCreator.js'; 

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

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

export default function ItemDetailScreen({ route, navigation }) {
  const { item, user } = route.params;

  const commName = item.title;

  const [memberNames, setMembers] = useState(undefined);
  const [memberUsernames, setMemberUsernames] = useState(undefined);
  const [owner, setOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reloadStars, setReloadStars] = useState(0.0);
  const [url, setUrl] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [rating, setRating] = useState(0.0);
  const [ratingNumber, setRatingNumber] = useState(0.0);
  const [joined, setJoined] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const urlLoaded = new URL(`${REMOTE_HOST}/images`);
        urlLoaded.searchParams.append('name', commName);
        urlLoaded.searchParams.append('id', '0');
        setUrl(urlLoaded);
      } catch (error) {
        console.error('Error fetching banner image:', error);
      }
    };

    fetchImage();
  }, [commName]);

  useEffect(() => {
    const fetchData = async () => {
        var response;
        try {
          response = await fetch(`${REMOTE_HOST}/getCommunityMembers?community=${commName}`);

          const json = await response.json();
          setMembers(json.names);
          setMemberUsernames(json.usernames);
          if (json.usernames.includes(user)) {
            setJoined(true);
          }
        } catch (error) {
          console.error('Failed to fetch community members:', error);
        } finally {
          setLoading(false); // Set loading to false after data is fetched
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
      } catch (error) {
        console.error('Failed to fetch rating', error);
      }
    };
    fetchData();
  }, [reloadStars]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REMOTE_HOST}/getRatingNumber?community=${commName}`);
        const text = await response.text();
        const new_rating = parseInt(text);
        setRatingNumber(new_rating);
      } catch (error) {
        console.error('Failed to fetch rating number', error);
      }
    };
    fetchData();
  }, [reloadStars]);

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
    
    createNotification({community_id: item.id, is_proposal: false, title: `New Event at ${commName}`, message: newDesc});
  };

  const handleMessage = () => {
    navigation.navigate('MessageBoard', { navigation, item, user });
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${REMOTE_HOST}/getUnreadEvents/?community=${item.id}&user=${user}`);
            const json = await response.json();
            setEvents(json.events);
        } catch (error) {
            console.error('Failed to fetch community events:', error);
        }
    };

    fetchData(); // Initial fetch

    // const intervalId = setInterval(fetchData, 5000);
    // return () => clearInterval(intervalId);
  }, [item.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  const parsedLatitude = parseFloat(item.latitude);
  const parsedLongitude = parseFloat(item.longitude);

  const openMap = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${parsedLatitude},${parsedLongitude}`,
      android: `geo:0,0?q=${parsedLatitude},${parsedLongitude}`
    });

    Linking.openURL(url).catch(err => Alert.alert('Error', 'Unable to open map'));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.topRowContainer}>
          <View style={styles.bannerContainer}>
            <ImageBanner source={{uri: url.toString()}} is_proposal={false} user={user} item={item} joined={joined} setJoined={setJoined} setMemberUsernames={setMemberUsernames} setMembers={setMembers} loading={loading}/>
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
                  {(joined) ? (
                    <TouchableOpacity style={styles.organiseButton} onPress={() => setModalVisible(true)}>
                      <Text style={[styles.organiseButtonText, {fontSize: getFontSize(10)}]}>Organise</Text>
                    </TouchableOpacity>
                  ) : <Text style={styles.content}>Sessions organised by members</Text>}
                </View>
              ) : (
                <View style={styles.scheduleContainer}>
                  <Text style={styles.content}>{item.schedule}</Text>
                  {owner ? (
                    <TouchableOpacity style={styles.organiseButton} onPress={() => setModalVisible(true)}>
                      <Text style={styles.organiseButtonText}>Organise</Text>
                    </TouchableOpacity>
                  ): null}
                </View>
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
            <TouchableOpacity style={styles.button} onPress={() => openMap()}>
              <Text style={styles.buttonText}>View Map</Text>
            </TouchableOpacity>
            <View>
              <RatingComponent joined={joined} user={user} commName={commName} setReloadStars={setReloadStars} />
            </View>
            <View style={styles.eventsContainer}>
              <TouchableOpacity style={joined ? styles.button : styles.disabledButton} disabled={!joined} onPress={handleMessage}>
                <Text style={styles.buttonText}>Events</Text>
                {events.length > 0 && joined ? (
                  <View style={styles.badgeContainer}>
                  <View style={styles.badge}>
                      <Text style={styles.badgeText}>{events.length}</Text>
                  </View>
              </View>
                ): null}
              </TouchableOpacity>
            </View>
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

        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingsText}>Ratings ({ratingNumber}):</Text>
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
        <View style={styles.membersContainer}>
          <Members memberNames={memberNames} memberUsernames={memberUsernames} joined={joined} loading={loading}/>
        </View>

        {/* <View style={styles.commentsSection}>
          <Text style={styles.commentsHeader}>Comments:</Text>
          <TextInput
            style={styles.commentsInput}
            placeholder="Write your comment..."
            multiline={true}
            numberOfLines={4}
          />
        </View> */}
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

const Members = ({ memberNames, memberUsernames, joined, loading }) => {
    return <View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Text style={styles.membersHeader}>Members:</Text>
            {memberNames && memberNames.length > 0 ? (memberNames.map((name, index) => (
              <View key={index} style={styles.memberContainer}>
                <Text style={styles.memberName}>{name}</Text>
                {/* <Text style={styles.memberUsername}>@{memberUsernames[index]}</Text> */}
              </View>
            ))) : <Text style={styles.memberName}>No members</Text>}
          </>
        )}
      </View>
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
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
    flexDirection: 'row', // Ensure button and badge are in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
    position: 'relative', // Ensure relative positioning
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
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5, 
    maxHeight: 250, 
    height: 150,
  },
  descriptionContent: {
    flex: 1,
  },
  contactInfoBox: {
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 10,
    height: 50,
    alignSelf: "flex-end",
    width: '50%',
    alignContent: 'center',
    alignItems: 'center',
  },
  contactInfoText: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  eventsContainer: {
    margin: 20,
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: -25,
  },
  ratingsText: {
    fontWeight: 'bold',
    fontSize: '25',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  membersContainer: {
    marginVertical: 10,
  },
  memberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  memberName: {
    fontSize: 14,
  },
  memberUsername: {
    fontSize: 14,
    color: '#888',
  },
  memberContent: {
    fontSize: 14,
    color: '#888',
  },
});
