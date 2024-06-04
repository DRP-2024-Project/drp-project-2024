import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function UserScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const handlePress = async () => {
        const response = await fetch(`https://drp2024-backend-84f8cdfad73b.herokuapp.com/addMember/?username=${username}`, {
            method: 'POST',
        });
        // const response = await fetch(`http://localhost:3000/addMember/?username=${username}`, {
        //     method: 'POST',
        // });
        const json = await response.json();
        console.log(JSON.stringify(json));
        navigation.navigate("Communities");
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