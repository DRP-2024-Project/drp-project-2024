import React, { useState, useEffect } from 'react';
import { 
    View, 
    TextInput, 
    Button, 
    StyleSheet, 
    Text, 
    ScrollView 
} from 'react-native';
import Tag from './Tag'
import { REMOTE_HOST } from './Config';

export default function HomeScreen({ navigation }) {

    const [tags, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`${REMOTE_HOST}/tags`);
        const json = await response.json();
        setData(json);
      };
  
      fetchData();
    }, []);
  
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

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Handle submission logic here, e.g., sending data to a server
    console.log('Form Data:', formData);
  };

//   console.log(tags);

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
        {tags.map((tag) => (
            <Tag tag_id={tag.id} tag_name={tag.name}/>
        ))}
        {/* <Tag tag_id={1} tag_name={'Rugby'}/>
        <Tag tag_id={2} tag_name={'jfdsug'}/> */}
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
});