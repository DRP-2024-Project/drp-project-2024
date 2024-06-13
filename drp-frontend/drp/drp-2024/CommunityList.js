import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { REMOTE_HOST } from './Config';
import ItemRecord from './ItemRecord';
import ItemProposalRecord from './ItemProposalRecord';


const CommunityList = ({ value, search, navigation, user, myCommunities, reload, reloadHomePage=false }) => {
  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState([]);


  const renderItem = ({ item }) => {
    if (item.type === 'proposal') {
      return <ItemProposalRecord item={item.data} navigation={navigation} user={user} />;
    } else {
      return <ItemRecord item={item.data} navigation={navigation} user={user} />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REMOTE_HOST}/search/?orderBy=${value}&searchTerm=${search}&myCommunities=${myCommunities}&user=${user}`);
        const json = await response.json();
        setCommunities(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    if (reloadHomePage) {
      const intervalId = setInterval(fetchData, 1000);
      return () => clearInterval(intervalId);
    }
    
  }, [value, search, reload]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
      ) : (
        <FlatList
          data={communities}
          renderItem={renderItem}
          keyExtractor={item => item.communityId}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listContainer: {
    paddingVertical: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityList;