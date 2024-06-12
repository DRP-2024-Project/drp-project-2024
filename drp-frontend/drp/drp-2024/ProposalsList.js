import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { REMOTE_HOST } from './Config';
import ItemRecord from './ItemRecord';
import ItemProposalRecord from './ItemProposalRecord';


const ProposalList = ({ value, search, navigation, user, myCommunities, reload }) => {
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
        const response = await fetch(`${REMOTE_HOST}/searchProposals/?user=${user}`);
        const json = await response.json();
        setCommunities(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

export default ProposalList;