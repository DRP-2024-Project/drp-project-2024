import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { REMOTE_HOST } from './Config';
import Tag from './Tag'

const ItemRecord = ({ item, navigation }) => {
  const urlIcon = new URL(`${REMOTE_HOST}/icon`);
  urlIcon.searchParams.append('id', item.tag_id);

  return (
    <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Details', { item, user })}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Tag tag_name={item.tag}/>
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
    marginRight: 0,
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