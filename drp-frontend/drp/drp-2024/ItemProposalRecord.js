import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { REMOTE_HOST } from './Config';
import Tag from './Tag';

const ItemProposalRecord = ({ item, navigation, user }) => {
  const urlIcon = new URL(`${REMOTE_HOST}/icon`);
  urlIcon.searchParams.append('id', item.tag_id);

  return (
    <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Details Proposal', { item, user })}
    >
      <View style={styles.header}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Tag tag_name={item.tag}/>
        </View>
        <View style={styles.proposalBadge}>
          <Text style={styles.proposalText}>Proposal</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#E3EAF4',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    opacity: 0.5,
  },
  title: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  proposalBadge: {
    backgroundColor: '#ff6347', // Use a noticeable color
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  proposalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ItemProposalRecord;
