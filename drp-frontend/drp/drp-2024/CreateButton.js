import React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateButton = ({ navigation }) => {
  const handlePress = async () => {
    // const comm = {
    //   title: 'Sample Community',
    //   description: 'A community for testing',
    //   location: 'Sample Location',
    // };
    // const data = {
    //   comm: comm,
    //   imgs: [],
    // };

    // try {
    //   const response = await fetch('http://localhost:3000/createCommunity', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   const result = await response.json();
    //   console.log(result);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    navigation.navigate("Create", {})
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#d9dbda',
      borderRadius: 50,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default CreateButton;