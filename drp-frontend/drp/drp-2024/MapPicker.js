import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapPicker = ({ route }) => {
  const [region, setRegion] = useState({
    latitude: 51.49916494462091,
    longitude: -0.17731535886352467,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const {setSelectedLocation} = route.params;
  const onLocationSelect = setSelectedLocation;

  const [marker, setMarker] = useState(null);

  const handleMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    setMarker(coordinate);
    if (onLocationSelect) {
      setSelectedLocation(coordinate);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={handleMapPress}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width / 2 - 75,
  },
});

export default MapPicker;