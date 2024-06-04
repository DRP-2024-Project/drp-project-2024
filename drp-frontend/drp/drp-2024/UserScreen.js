import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function UserScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const handlePress = () => {
        Alert.alert('Username', `You entered: ${username}`);
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter your username:</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <Button title="Submit" onPress={handlePress} />
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#fff',
    },
    label: {
      fontSize: 18,
      marginBottom: 12,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
  });