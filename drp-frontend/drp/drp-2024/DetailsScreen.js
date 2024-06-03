import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const InteractiveBox = ({ children, initialSize, enlargedSize }) => {
  const [size, setSize] = useState(initialSize);

  const toggleSize = () => {
    setSize(currentSize => (currentSize === initialSize ? enlargedSize : initialSize));
  };

  return (
    <TouchableOpacity onPress={toggleSize} style={[styles.box, { height: size }]}>
      {children}
    </TouchableOpacity>
  );
};


export default function ItemDetailScreen({ route }) {
  const { item } = route.params;

  return (
<View style={styles.container}>
  <View style={styles.topRow}>
    <Text style={styles.level}>Level: {item.level}</Text>
  </View>
  <View style={styles.middleRow}>
  <InteractiveBox initialSize={50} enlargedSize={100}>
      <Text style={styles.location}>{item.location}</Text>
    </InteractiveBox>
    <InteractiveBox initialSize={50} enlargedSize={100}>
      <Text style={styles.contactInfo}>{item.contactInfo}</Text>
    </InteractiveBox>
    <InteractiveBox initialSize={50} enlargedSize={100}>
      <Text style={styles.pricing}>{item.price} per {item.perTime}</Text>
    </InteractiveBox>
  </View>
  <Text style={styles.description}>{item.description}</Text>
  <View style={styles.scheduleRow}>
    <Text style={styles.schedule}>{item.schedule}</Text>
  </View>
  <View style={styles.ratingRow}>
    <Text style={styles.rating}>Rating: 5/5</Text>
  </View>
  <View style={styles.additionalInfoBox}>
    <Text style={styles.additionalInfo}>Additional Info:</Text>
    <View style={styles.equipmentBox}>
      <Text style={styles.equipmentRequired}>Equipment Required:</Text>
      <Text style={styles.equipmentList}>Shin Pads, Football Kit, Practice</Text>
    </View>
    <View style={styles.equipmentBox}>
      <Text style={styles.equipmentRequired}>Additional Links:</Text>
      <Text style={styles.equipmentList}>www.football.com</Text>
    </View>
  </View>
  <View style={styles.commentsSection}>
    <Text style={styles.commentsHeader}>Comments:</Text>
    <TextInput
      style={styles.commentsInput}
      placeholder="Write your comment..."
      multiline={true}
      numberOfLines={4}
    />
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topRow: {
    marginBottom: 10,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  level: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
  },
  contactInfo: {
    fontSize: 14,
  },
  pricing: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    marginVertical: 10,
  },
  scheduleRow: {
    marginBottom: 10,
  },
  schedule: {
    fontSize: 14,
  },
  ratingRow: {
    marginBottom: 10,
  },
  rating: {
    fontSize: 14,
  },
  additionalInfoBox: {
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  equipmentBox: {
    marginTop: 5,
    backgroundColor: '#c8c8c8',
    borderRadius: 5,
    padding: 5,
  },
  equipmentRequired: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  equipmentList: {
    fontSize: 14,
  },
  commentsSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  commentsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentsInput: {
    fontSize: 14,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginTop: 5,
    minHeight: 60, // Adjust height based on the design requirement
  },
});