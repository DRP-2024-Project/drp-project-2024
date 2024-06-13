import React, { useState } from 'react';
import { View, Button, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import { REMOTE_HOST } from './Config';

export default function RatingComponent( {commName, user, joined, setReloadStars} ) {
  const [showRating, setShowRating] = useState(false);

  const ratingCompleted = (rating) => {
    const sendRating = async () => {
      await fetch(`${REMOTE_HOST}/rate?commName=${commName}&username=${user}&rating=${rating}`, {
        method: 'POST',
      }); 
      setReloadStars(rating);
    };
    sendRating();
  };

  return (
    <View>
      <TouchableOpacity disabled={!joined} style={joined ? styles.button : styles.disabledButton} onPress={() => setShowRating(true)}>
          <Text style={styles.buttonText}>Rate</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showRating}
        onRequestClose={() => setShowRating(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Rate Us</Text>
            <Rating
              showRating
              onFinishRating={ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
            <TouchableOpacity style={styles.submitButton} onPress={() => setShowRating(false)}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3d649b',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
});