import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ route }) {

  const { navigation, _ } = route.params;

  return (
    <View style={styles.container}>
      <Button
        title="Create Community"
        onPress={() => navigation.navigate('Create Community', route.params)}
      />
      <View style={styles.spacer} />
      <Button
        title="Create Proposal"
        onPress={() => navigation.navigate('Create Proposal', route.params)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
  },
  spacer: {
    height: 20,
  },
});
