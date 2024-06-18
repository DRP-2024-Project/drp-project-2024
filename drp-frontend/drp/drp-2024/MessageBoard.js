import React, { useState, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import Message from './Message.js';
import { REMOTE_HOST } from './Config.js';

export default function MessageBoardScreen({ route }) {
    const { navigation, item, user } = route.params;

    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${REMOTE_HOST}/getEvents/?commId=${item.id}`);
                const json = await response.json();
                setEvents(json);
            } catch (error) {
                console.error('Failed to fetch community events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Initial fetch

        // const intervalId = setInterval(fetchData, 5000);

        // return () => clearInterval(intervalId);
    }, [item.id]);

    useEffect(() => {
        fetch(`${REMOTE_HOST}/readEvents/?user=${user}&community=${item.id}`, {
            method: 'POST',
        });
    }, [events]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
            ) : (
                <FlatList
                    data={events}
                    renderItem={({ item }) => <Message event={item} user={user} />}
                    keyExtractor={item => item.id.toString()} // Ensure key is a string
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={<Text style={styles.noEvents}>There are no new events</Text>}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    listContainer: {
        paddingVertical: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noEvents: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
      },
});
