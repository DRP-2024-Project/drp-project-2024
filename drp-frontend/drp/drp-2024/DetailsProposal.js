import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import { REMOTE_HOST } from './Config.js';
import ImageBanner from './ImageBanner.js';
import CreateButton from './CreateButton.js';
import Tag from './Tag.js';
import { CurrentRenderContext } from '@react-navigation/native';

export default function ItemDetailScreen({ route, navigation }) {
  const defaultBanner = require('./assets/default-proposal-banner.jpg');
  const { item, user } = route.params;

  const [interested, setInterested] = useState(false);
  const [memberNames, setMembers] = useState(undefined);
  const [memberUsernames, setMemberUsernames] = useState(undefined);

  const handleMessage = () => {
    navigation.navigate("MessageBoard", {navigation, item, user});
  };

  console.log(item);

  return (
    <ScrollView contentContainerStyle={styles.listContainer} style={styles.container}>
      <View style={styles.bannerContainer}>
        <ImageBanner source={defaultBanner} user={user} is_proposal={true} item={item} joined={interested} setJoined={setInterested} setMemberUsernames={setMemberUsernames} setMembers={setMembers}/>
      </View>

      <View style={styles.proposalBox}>
        <Text style={styles.proposalText}>This is a proposal for a community. Use the button below to create it.</Text>
      </View>

      <View style={styles.topRow}>
        <Tag tag_name={item.tag} style={styles.tag} />
        <CreateButton navigation={navigation} user={user} style={styles.createButton} />
      </View>

      <View style={[styles.boxContainer, styles.descriptionBox]}>
          <Text style={styles.title}>Description:</Text>
          <ScrollView style={styles.descriptionContent}>
            <Text style={styles.content}>{item.description}</Text>
          </ScrollView>
      </View>

      <Text style={styles.membersHeader}>Members:</Text>
        {memberNames && memberNames.map(member => (
          <View key={member}>
            <Text>{member}</Text>
          </View>
        ))}

      <View style={styles.commentsSection}>
          <Text style={styles.commentsHeader}>Comments:</Text>
          <TextInput
            style={styles.commentsInput}
            placeholder="Write your comment..."
            multiline={true}
            numberOfLines={4}
          />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    marginBottom: 20,
  },
  proposalText: {
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: '75%'
  },
  proposalBox: {
    marginHorizontal: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    height: '7.5%',
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  boxContainer: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  descriptionBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 16, 
    maxHeight: 150, 
  },
  descriptionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionContent: {
    flex: 1,
  },
  content: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  listContainer: {
    paddingVertical: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  membersHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  commentsSection: {
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  commentsInput: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    textAlignVertical: 'top',
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tag: {
    justifyContent: 'left'
  },
  createButton: {
    justifyContent: 'right'
  },
  
});
