import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PhotoGrid = ({ community }) => {
  const url1 = new URL('https://drp2024-backend-84f8cdfad73b.herokuapp.com/images');
  url1.searchParams.append('name', community);
  url1.searchParams.append('id', '0');
  console.log(url1.toString())

  const url2 = new URL('https://drp2024-backend-84f8cdfad73b.herokuapp.com/images');
  url2.searchParams.append('name', community);
  url2.searchParams.append('id', '1');

  const url3 = new URL('https://drp2024-backend-84f8cdfad73b.herokuapp.com/images');
  url3.searchParams.append('name', community);
  url3.searchParams.append('id', '2');

  const url4 = new URL('https://drp2024-backend-84f8cdfad73b.herokuapp.com/images');
  url4.searchParams.append('name', community);
  url4.searchParams.append('id', '3');

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.row}>
          <Image source={{ uri: url1.toString() }} style={styles.image} />
          <Image source={{ uri: url2.toString() }} style={styles.image} />
        </View>
        <View style={styles.row}>
          <Image source={{ uri: url3.toString() }} style={styles.image} />
          <Image source={{ uri: url4.toString() }} style={styles.image} />
        </View>
      </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
});

export default PhotoGrid;