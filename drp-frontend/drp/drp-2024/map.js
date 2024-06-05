import React from "react";
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 51.48989420314289,
      lng: -0.44184891947392424
    },
    zoom: 17
  };

  return (
    <View style={styles.mapContainer}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyCKYPRLMGq_8ht5IsCwfBJtFkSi9DAFioQ' }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
      <Marker
        lat={51.48989420314289}
        lng={-0.44184891947392424}
      />
    </GoogleMapReact>
  </View>
  );
}


const styles = StyleSheet.create({
  mapContainer: {
    height: '100%',
    width: '100%',
  },
  marker: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});