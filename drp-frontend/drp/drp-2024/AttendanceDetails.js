import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const AttendanceDetails = ({ members, title }) => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {members.map((member) => (
            <Text style={styles.name} key={member.username}>{member.name}</Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: "#D9E0EA",
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  }
});

export default AttendanceDetails;