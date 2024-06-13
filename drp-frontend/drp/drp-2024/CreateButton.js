import React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateButton = ({ navigation, user, defaultValues, createCommunity=false }) => {
  const handlePress = () => {
    if (createCommunity) {
      navigation.navigate("Create Community", {item: defaultValues, route: {navigation: navigation, user: user}})
    } else {
      navigation.navigate("Create", {navigation, user})
    }
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
      backgroundColor: '#3d649b',
      borderRadius: 50,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default CreateButton;