// CustomMarker.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon set

const Marker = () => {
  return (
    <View style={styles.marker}>
      <Icon name="place" size={40} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'transparent',
  },
});

export default Marker;