import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const tags = {
  Basketball: require('./assets/icons/Basketball.png'),
  Climbing: require('./assets/icons/Climbing.png'),
  Cycling: require('./assets/icons/Cycling.png'),
  Dance: require('./assets/icons/Dance.png'),
  Football: require('./assets/icons/Football.png'),
  Golf: require('./assets/icons/Golf.png'),
  Gym: require('./assets/icons/Gym.png'),
  Martial_Arts: require('./assets/icons/Martial_Arts.png'),
  Rugby: require('./assets/icons/Rugby.png'),
  Running: require('./assets/icons/Running.png'),
  Skating: require('./assets/icons/Skating.png'),
  Swimming: require('./assets/icons/Swimming.png'),
  Tennis: require('./assets/icons/Tennis.png'),
  Volleyball: require('./assets/icons/Volleyball.png'),
  Walking: require('./assets/icons/Walking.png'),
  Yoga: require('./assets/icons/Yoga.png'), 
}

const Tag = ({ tag_name }) => {
  const tag_path = tag_name.replace(/ /g, '_');
  const img_source = tags[tag_path];

  return (
    <View style={styles.tagIconContainer}>
      <View style={styles.iconContainer}>
        <Image source={img_source} style={styles.icon} />
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
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    padding: 5,
  },
  iconContainer: {
    marginRight: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  tagContainer: {
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  tag: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
});

export default Tag;
