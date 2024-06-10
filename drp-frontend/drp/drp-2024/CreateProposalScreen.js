import React, { useState } from 'react';
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
} from 'react-native';
import Tag from './Tag'
import SelectedTag from './SelectedTag'
import { REMOTE_HOST, TAGS } from './Config';

// verifyCommData: verifies that all data for creating a community is of the correct form
// Return: returns "" if all data is valid or errMessage if there is some invalid data
function verifyProposalData(data) {
  console.log(data);
  if (!data.title) {
    return "Please enter a Title.";
  } else if (!data.description) {
    return "Please enter a Description.";
  } else if (!data.tag_id) {
    return "Please choose an activity type."
  }
}

export default function HomeScreen({ route }) {
    const { navigation, user } = route.params;

    const beginState = Object.keys(TAGS).reduce((acc, currentItem) => {
      acc[currentItem] = false; 
      return acc;
    }, {});
  
  const [formData, setFormData] = useState({
        title: '',
        description: '',
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

  const [modalVisible, setModalVisible] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const handleSubmit = async () => {
    const data = {
      title: formData.title,
      description: formData.description,
      tag_id: TAGS[tag],
      ownerUser: user
    };

    if (!checkInputs(data)) {
      return;
    }

    try {
      const response = await fetch(`${REMOTE_HOST}/createProposal`, {
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
    navigation.navigate("Communities", {})
  };

  const checkInputs = (data) => {
    const msg = verifyProposalData(data)
    if (msg) {
      setErrMessage(msg);
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
      
      <Button title="Submit" onPress={handleSubmit} />
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errMessage}</Text>
            <Button title="Close" onPress={closeModal} />
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
});
