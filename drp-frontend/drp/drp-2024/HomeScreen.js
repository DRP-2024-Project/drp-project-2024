import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import DropDownPicker from 'react-native-dropdown-picker';
import { REMOTE_HOST } from './Config';
import ItemRecord from './ItemRecord';
import ItemProposalRecord from './ItemProposalRecord'; // Import the ItemProposalRecord component
import CreateButton from './CreateButton';
import CommunityList from './CommunityList';

export default function HomeScreen({ route }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('title');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([
    { label: 'Name', value: 'title' },
    { label: 'Rating', value: 'rating' }
  ]);
  const { navigation, user } = route.params;


  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <SearchBar searchPhrase={search} setSearchPhrase={setSearch} setClicked={() => {}} />
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
        <CreateButton navigation={navigation} user={user} />
      </View>
      <CommunityList value={value} search={search} navigation={navigation} user={user} myCommunities={false}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
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
    paddingBottom: 15,
    paddingLeft: 20,
    zIndex: 3000,
    alignItems: 'center',
  },
  orderBy: {
    fontSize: 16,
    marginRight: 10,
    alignSelf: 'center'
  },
  dropdownContainer: {
    alignItems: "center",
    width: "40%",
    height: 40,
  },
  dropdownStyle: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  dropDownContainerStyle: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    zIndex: 5000,
    elevation: 20,
  },
  listContainer: {
    paddingVertical: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenCard: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
});
