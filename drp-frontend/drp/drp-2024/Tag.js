import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { REMOTE_HOST } from './Config';

const Tag = ({ tag_id, tag_name }) => {
  const urlIcon = new URL(`${REMOTE_HOST}/icon`);
  urlIcon.searchParams.append('id', tag_id);

  return (
    <View style={styles.tagIconContainer}>
      <View style={styles.iconContainer}>
        <Image source={{ uri: urlIcon.toString() }} style={styles.icon} />
      </View>
      <View style={styles.tagContainer}>
        <Text style={styles.tag}>{tag_name}</Text>
      </View>
    </View>
    )
};
  
const styles = StyleSheet.create({
  tagIconContainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    marginHorizontal: 5,
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
  
export default Tag;