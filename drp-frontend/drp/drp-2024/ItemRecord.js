import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { REMOTE_HOST } from './Config';
import Tag from './Tag';

const ItemRecord = ({ item, navigation, user }) => {
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
    backgroundColor: '#E3EAF4',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
});

export default ItemRecord;
