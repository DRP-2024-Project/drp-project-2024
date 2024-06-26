import React, { useEffect, useState } from 'react';
import { 
    View, 
    TextInput, 
    Button, 
    StyleSheet, 
    Text, 
    ScrollView,
    TouchableOpacity,
    Platform,
    Modal,
    SafeAreaView
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Tag from './Tag'
import SelectedTag from './SelectedTag'
import { REMOTE_HOST, TAGS } from './Config';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import { createNotification } from './NotificationCreator.js';


// verifyCommData: verifies that all data for creating a community is of the correct form
// Return: returns "" if all data is valid or errMessage if there is some invalid data
function verifyCommData(data) {
  if (!data.title) {
    return "Please enter a Title.";
  } else if (!data.description) {
    return "Please enter a Description.";
  } else if (!data.price) {
    return "Please enter a Price.";
  } else if (!data.perTime && data.price) {
    return "Please enter a payment time frame.";
  } else if (!data.location) {
    return "Please enter a Location.";
  } else if (data.scheduled && !data.schedule) {
    return "Please enter a Schedule.";
  } else if (!data.contactInfo) {
    return "Please enter contact info.";
  } else if (!data.level) {
    return "Please enter a level of standard.";
  } else if (!data.tag_id) {
    return "Please choose an activity type."
  } else if (!/^£\d+$/.test(data.price)) {
    return `Please eneter a valid price, £{number}.`
  } else if (data.level != "Beginner" &&
             data.level != "Intermediate" &&
             data.level != "Advanced"
            ) {
    return "Please enter a valid level of standard, 'Beginner', " +
           "'Intermediate', 'Advanced'"
  }
}

export default function HomeScreen({ route }) {

    const { defaultValues, navigation, user } = route.params;
    
    var item = defaultValues;
    var fromProposal = item != null;

    if (!fromProposal) {
      item = {title: '',
              description: '',
              level: '',
              tag_id: '',
      }
    }

    const beginState = Object.keys(TAGS).reduce((acc, currentItem) => {
      acc[currentItem] = false; 
      return acc;
    }, {});
  
  const [formData, setFormData] = useState({
        title: item.title,
        description: item.description,
        price: '',
        'per Time': '',
        location: '',
        'contact Info': '',
        'required Equipment': '',
        links: '',
        level: item.level,
  });

  // For the tag Buttons
  // tag: Represents the id of the selected tag
  // selected: Represents whether a tag is selected at all
  // tagStates: Represents whether each item is selected
  const [tag, setTag] = useState('');
  const [tagStates, setTagStates] = useState(beginState);

  const handlePress = (currTag) => {
    // Selecting a new tag
    if (currTag != tag) {
      setTagStates(prevState => ({
        ...prevState,
        [tag]: false,
        [currTag]: true,
      }));
    } else {
      setTagStates(prevState => ({
        ...prevState,
        [currTag]: false,
      }));
    }
    setTag(currTag);
  };

  // For the text data
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (fromProposal) {
      handlePress(item.tag);
    }}
  , []);

  // For the schedule toggle
  const [scheduled, setScheduled] = useState(false);
  const [schedule, setSchedule] = useState('');

  // For choosing an image
  const [imageSource, setImageSource] = useState(null);
  const selectImage = async () => {
    // Request permission to access media library
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // For square aspect ratio
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImageSource(result.assets[0].base64);
    } else if (result.cancelled) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    }
  };

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const handleSubmit = async () => {
    const comm = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      perTime: formData['per Time'],
      location: formData.location,
      scheduled: scheduled,
      schedule: schedule,
      contactInfo: formData['contact Info'],
      equipmentRequired: formData['required Equipment'],
      links: formData.links,
      rating: 0,
      level: formData.level,
      ownerUser: user,
      tag_id: TAGS[tag],
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude
    };
    const data = {
      comm: comm,
      imgs: [imageSource],
    };

    if (!checkInputs(data)) {
      return;
    }

    try {
      const response = await fetch(`${REMOTE_HOST}/createCommunity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      // TODO: Logic for if the name is taken
    } catch (error) {
      console.error('Error:', error);
    }

    if (fromProposal) {
      createNotification({community_id:null, proposal_id:item.id, is_proposal:true, title: `Community "${formData.title}" created!`, message:`This community was created from the proposal "${item.title}".`})
    }

    navigation.navigate("Communities", { navigation, user });
  };

  const checkInputs = (data) => {
    const msg = verifyCommData(data.comm)
    if (msg) {
      setErrMessage(msg);
      setModalVisible(true);
      return false;
    } else if (!data.imgs[0]) {
      setErrMessage("Please select a photo.");
      setModalVisible(true);
      return false;
    }
    return true;
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(formData).map((key) => (
        <View key={key} style={styles.inputRow}>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <TextInput
            style={styles.input}
            value={formData[key]}
            onChangeText={(value) => handleChange(key, value)}
          />
        </View>
      </View>
      ))}
      <View style={styles.inputRow}>
      <View style={styles.labelInputContainer}>
        <Text style={styles.label}>
          Are there fixed organised sessions/events?
        </Text>
        <CheckBox
          checked={scheduled}
          onPress={() => setScheduled(!scheduled)}
        />
      </View>
      </View>

      {scheduled && <View style={styles.inputRow}>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Schedule</Text>
          <TextInput
            style={styles.input}
            value={schedule}
            onChangeText={(value) => setSchedule(value)}
          />
        </View>
      </View>}

      <Text style={styles.title}>Choose Activity Type</Text>
      <View style={styles.iconsContainer}>
        {Object.keys(TAGS).map((tag) => (
            <TouchableOpacity 
              style={styles.tagContainer} 
              onPress={() => handlePress(tag)}
              key={tag}
            >
                {tagStates[tag] ? <SelectedTag name={tag}/> : <Tag tag_name={tag}/>}
            </TouchableOpacity>
        ))}
      </View>
      <View style={styles.imageButton}>
        <Button title="Select Image" color="#3d649b" borderRadius="10" onPress={selectImage} />
      </View>
      <View style={styles.imageButton}>
      <Button
        title="Pick a Location"
        color="#3d649b"
        borderRadius="10"
        onPress={() => navigation.navigate('Map Picker', {setSelectedLocation})}
      />
    </View>
      <Button title="Submit" color="#3d649b" borderRadius="10" onPress={handleSubmit} />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errMessage}</Text>
            <Button title="Close" color="#3d649b" borderRadius="10" onPress={closeModal} />
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagContainer: {
    margin: 10,
  },
  imageButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
