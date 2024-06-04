import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import DropDownPicker from 'react-native-dropdown-picker';

export default function HomeScreen({ navigation }) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('title');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([
    {label: 'Name', value: 'title'},
    {label: 'Rating', value: 'rating'}
  ]);


  const [communities, setData] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      console.log(value)
      const response = await fetch(`https://drp2024-backend-84f8cdfad73b.herokuapp.com/search/?orderBy=${value}&searchTerm=${search}`);
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, [value, search]);

  console.log(communities);

  return (
    <View style={styles.container}>
    <View style={styles.topRow}>
      <SearchBar searchPhrase={search} setSearchPhrase={setSearch} setClicked={() => {}}/>
    </View>
    <View style={styles.middleRow}>
      <Text style={styles.orderBy}>Order By: </Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        zIndex={3000}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdownStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
      />
    </View>
    <FlatList
      data={communities}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Details', { item })}
        >
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topRow: {
    padding: 10,
    zIndex: 1, // Lower zIndex than middleRow
    flexDirection: 'row',
    alignItems: 'center',  // Aligns vertically center
    justifyContent: 'flex-start'  // Aligns items to the left
  },
  middleRow: {
    flexDirection: 'row',
    paddingBottom: 35,
    paddingLeft: 20,
    zIndex: 3000, // Highest zIndex to ensure dropdown is on top
  },
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
  listContainer: {
    paddingVertical: 20,
  },
  dropdownContainer: {
    alignItems: "center",
    width: "50%",
    height: 40,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
  orderBy: {
    fontSize: 16, // Adjust to match the dropdown text size if necessary
    marginRight: 10, // Space between label and dropdown
    alignSelf: 'center' // Further ensures vertical alignment
  },
  dropDownContainerStyle: {
    backgroundColor: '#fafafa',
    zIndex: 5000, // Significantly high zIndex for dropdown items
    elevation: 20, // For Android elevation
  }
});
