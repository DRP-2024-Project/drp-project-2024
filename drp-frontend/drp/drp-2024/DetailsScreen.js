import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function ItemDetailScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.level}>Level: intermediate</Text>
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
      <Text style={styles.description}>Description: {item.description}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.schedule}>Schedule: {item.schedule}</Text>
        <Text style={styles.rating}>Rating: 4/5</Text>
        <Text style={styles.box}> Hello Harvey </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10 // Consistent padding around the container
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10 // Provides some spacing after the row
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10 // Adds a margin before the bottom row
  },
  box: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginHorizontal: 5 // Provides horizontal spacing between boxes
  },
  level: {
    fontWeight: 'bold'
  },
  location: {},
  contactInfo: {},
  pricing: {},
  schedule: {
    flex: 1 // Allows the schedule to expand to fit its content
  },
  rating: {
    flex: 1 // Allows the rating to expand to fit its content
  },
  description: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center' // Centers the text horizontally within its container
  },
});