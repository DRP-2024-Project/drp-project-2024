import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { View, FlatList, Text, StyleSheet } from 'react-native';
=======
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
>>>>>>> 57c497b8550bc1b83ab9ca1ecd75cee12733d38a
import SearchBar from './SearchBar';
import DropDownPicker from 'react-native-dropdown-picker';
import { REMOTE_HOST } from './Config';
import ItemRecord from './ItemRecord';
<<<<<<< HEAD
import CreateButton from './CreateButton';
=======
>>>>>>> 57c497b8550bc1b83ab9ca1ecd75cee12733d38a

export default function HomeScreen({ route }) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('title');
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [items, setItems] = useState([
    { label: 'Name', value: 'title' },
    { label: 'Rating', value: 'rating' }
  ]);
  const { navigation, user } = route.params;

  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REMOTE_HOST}/search/?orderBy=${value}&searchTerm=${search}`);
        const json = await response.json();
        setCommunities(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [value, search]);

  return (
    <View style={styles.container}>
<<<<<<< HEAD
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
      <CreateButton navigation={navigation}/>
    </View>
    <FlatList
      data={communities}
      renderItem={({ item }) => (
        <ItemRecord key={item.communityId} item={item} user={user} navigation={navigation}/>
=======
      <View style={styles.topRow}>
        <SearchBar searchPhrase={search} setSearchPhrase={setSearch} setClicked={() => { }} />
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
      {loading ? (
        <ActivityIndicator size="large" color="#D3D3D3" style={styles.loader} />
      ) : (
        <FlatList
          data={communities}
          renderItem={({ item }) => <ItemRecord item={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
>>>>>>> 57c497b8550bc1b83ab9ca1ecd75cee12733d38a
      )}
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
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  middleRow: {
    flexDirection: 'row',
    paddingBottom: 35,
    paddingLeft: 20,
    zIndex: 3000,
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
    fontSize: 16,
    marginRight: 10,
    alignSelf: 'center'
  },
  dropDownContainerStyle: {
    backgroundColor: '#fafafa',
    zIndex: 5000,
    elevation: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
