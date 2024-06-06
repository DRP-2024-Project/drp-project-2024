import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const SelectedTag = ({ name }) => {
    return (
      <View style={styles.tagIconContainer}>
        <View style={styles.iconContainer}>
            <Icon
                name="check"
                type="font-awesome"
                color="white"
                size={20}
                containerStyle={styles.icon}
            />
        </View>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{name}</Text>
        </View>
      </View>
    );
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

export default SelectedTag;