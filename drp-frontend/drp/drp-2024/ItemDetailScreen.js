import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ItemDetailScreen({ route }) {
  // Get the itemId and title from navigation parameters
  const { item } = route.params;

  return (
    <View style={styles.container}>
  <View style={styles.topRow}>
    <Text style={styles.level}>Level: {item.level}</Text>
  </View>
  <View style={styles.middleRow}>
    <View style={styles.box}>
      <Text style={styles.location}>Location: {item.location}</Text>
    </View>
    <View style={styles.box}>
      <Text style={styles.contactInfo}>Contact Info: {item.contactInfo}</Text>
    </View>
    <View style={styles.box}>
      <Text style={styles.pricing}>Cost: {item.price} per {item.perTime}</Text>
    </View>
  </View>
  <View style={styles.bottomRow}>
    <Text style={styles.schedule}>Schedule: {item.schedule}</Text>
    <Text style={styles.rating}>Rating: {item.rating}</Text>
  </View>
  <Text style={styles.description}>Description: {item.description}</Text>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  box: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey'
  },
  level: {
    marginLeft: 10,
    fontWeight: 'bold'
  },
  location: {},
  contactInfo: {},
  pricing: {},
  schedule: {
    flex: 1
  },
  rating: {
    flex: 1
  },
  description: {
    marginTop: 10
  }
});
