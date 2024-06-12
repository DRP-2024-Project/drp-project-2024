import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import NotificationItem from './NotificationItem'; // Adjust the import path as necessary

const notifications = [
  { id: '1', title: 'Welcome!', message: 'Thanks for joining our community.' },
  { id: '2', title: 'New Feature', message: 'Check out the new feature in your profile.' },
  { id: '3', title: 'Reminder', message: 'Don’t forget to complete your profile.' },
];

const NotificationList = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleModal} style={styles.headerContainer}>
        <Text style={styles.header}>
          Notifications ({notifications.length})
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleToggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Notifications</Text>
            <FlatList
              data={notifications}
              renderItem={({ item }) => <NotificationItem notification={item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainer}
            />
            <Button title="Close" onPress={handleToggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default NotificationList;