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
        const user = await response.text();
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
        padding: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});