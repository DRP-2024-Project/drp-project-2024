import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';

const ItemRecord = ({ item }) => {
  const urlIcon = new URL('https://drp2024-backend-84f8cdfad73b.herokuapp.com/icon');
  urlIcon.searchParams.append('id', item.tag_id);

  const [tag, setData] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://drp2024-backend-84f8cdfad73b.herokuapp.com/tag?id=${item.tag_id}`);
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, []);

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
          <Image source={{ uri: urlIcon.toString() }} style={styles.icon} />
        </View>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{tag}</Text>
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