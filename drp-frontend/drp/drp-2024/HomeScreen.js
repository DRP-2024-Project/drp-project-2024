import React, {useState, useEffect} from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    <FlatList
      data={communities}
      renderItem={renderItem}
      keyExtractor={item => item.communityId}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#87ceeb",
  },
  title: {
    fontSize: 24,
  },
});