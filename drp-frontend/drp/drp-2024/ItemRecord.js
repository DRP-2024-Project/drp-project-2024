import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';

const ItemRecord = ({ item }) => {
  const url = new URL('https://drp2024-backend-84f8cdfad73b.herokuapp.com/icons');
  url.searchParams.append('id', item.tag_id);

  return (
    <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Details', { item })}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.tagIconContainer}>
        <View style={styles.iconContainer}>
          <Image source={{ uri: url.toString() }} style={styles.icon} />
        </View>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>Rugby</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    zIndex: 0, // Ensure this is the lowest in the stacking context
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  tagIconContainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  tagContainer: {
    backgroundColor: '#D3D3D3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
  },
  tag: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ItemRecord;