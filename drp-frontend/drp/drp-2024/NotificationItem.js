import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { REMOTE_HOST } from './Config.js';

const NotificationItem = ({ notification, navigation, user, setModalVisible }) => {
  const [community, setCommunity] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (notification.is_proposal) {
          const response = await fetch(`${REMOTE_HOST}/getProposal/?id=${notification.proposal_id}`);
          const json = await response.json();
          setProposal(json.proposal);
        } else {
          const response = await fetch(`${REMOTE_HOST}/getCommunity/?id=${notification.community_id}`);
          const json = await response.json();
          setCommunity(json.community);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [notification])

  const handlePress = () => {
    setModalVisible(false);
    if (notification.is_proposal) {
      navigation.navigate("Details Proposal", { item: proposal, user})
    } else {
      navigation.navigate("Details", { item: community, user })
    }
  }

  return (
    <View style={styles.notificationContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationItem;