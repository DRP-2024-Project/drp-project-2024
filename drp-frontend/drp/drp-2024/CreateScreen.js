import React, { useState, useEffect } from 'react';
import { 
    View, 
    TextInput, 
    Button, 
    StyleSheet, 
    Text, 
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import Tag from './Tag'
import SelectedTag from './SelectedTag'
import { REMOTE_HOST, TAGS } from './Config';
import { launchImageLibrary } from 'react-native-image-picker';

export default function HomeScreen({ navigation }) {
    const beginState = Object.keys(TAGS).reduce((acc, currentItem) => {
      acc[currentItem] = false; 
      return acc;
    }, {});
  
  const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        'per Time': '',
        location: '',
        schedule: '',
        'contact Info': '',
        'required Equipment': '',
        links: '',
        rating: '',
        level: '',
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

  // For choosing an image
  const [imageSource, setImageSource] = useState(null);
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setImageSource(source.uri, 'base64');
      }
    });
  };

  const handleSubmit = async () => {
    const comm = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      perTime: formData['per Time'],
      location: formData.location,
      schedule: formData.schedule,
      contactInfo: formData['contact Info'],
      equipmentRequired: formData['required Equipment'],
      links: formData.links,
      rating: formData.rating,
      level: formData.level,
      tag_id: TAGS[tag],
    };
    const data = {
      comm: comm,
      imgs: [imageSource],
    };

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
    navigation.navigate("Communities", {})
  };

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
      <View style={styles.imageButton}>
        <Button title="Select Image" onPress={selectImage} />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
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
  image: {
    width: 200,
    height: 200,
  },
});

// TODO:
// Make it so that on a press the correct tag id is sent
// Make it so that only one tag can be pressed at a time
// Handle submit
