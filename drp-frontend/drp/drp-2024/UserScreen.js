import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import { REMOTE_HOST } from './Config';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

export default function UserScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const handlePress = async () => {
        const response = await fetch(`${REMOTE_HOST}/login/?username=${username}`, {
            method: 'POST',
        });

        const json = await response.json();
        const user = json.username;
       
        if (!json.exists) {
            setModalVisible(true);
        } else {
            navigation.navigate("Home", { navigation, user });
        }
    };

    const submitName = async () => {
        setModalVisible(false);

        await fetch(`${REMOTE_HOST}/addUser/?username=${username}&name=${name}`, {
            method: 'POST',
        });

        const user = username;
        navigation.navigate("Home", { navigation, user });
    }

    const closeModal = () => {
        setModalVisible(false);
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter your username:</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                onSubmitEditing={handlePress}
            />
            <Button title="Submit" color="#3d649b" borderRadius="10" onPress={handlePress} />
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
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={closeModal}>
                                <Ionicons name="close" size={24} color="#d3d3d3" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalText}>Account not registered</Text>
                        <Text style={styles.label}>Enter name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Name"
                            onSubmitEditing={submitName}
                        />
                        <Button title="Submit" color="#3d649b" borderRadius="10" onPress={submitName} />
                    </View>
                </View>
            </Modal>
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
        backgroundColor: '#E3EAF4',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    closeButtonContainer: {
        alignSelf: 'flex-end',
    }
});