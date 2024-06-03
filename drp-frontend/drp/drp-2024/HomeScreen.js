import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const [communities, setData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://drp2024-backend-84f8cdfad73b.herokuapp.com/homePage/");
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, []);

  console.log(communities);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <SearchBar />
        </View>
      <View style={styles.container}>
    <FlatList
      data={communities}
      renderItem={renderItem}
      keyExtractor={item => item.communityId}
      contentContainerStyle={styles.listContainer}
    />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    color: '#000000', 
    fontWeight: 'bold',
  },
  listContainer: {
    paddingVertical: 20,
  },
  searchContainer: {
    padding: 5,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topRow: {
    marginBottom: 10,
  },
});