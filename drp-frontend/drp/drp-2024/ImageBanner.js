import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { REMOTE_HOST } from './Config';

const ImageBanner = ({ source, user, item, is_proposal, joined, setJoined, setMemberUsernames, setMembers, loading }) => {
  const [imageLoading, setImageLoading] = useState(true); // State for image loading

  const title = item.title;

  const handleJoin = async () => {
      setJoined(!joined);
      var response;

      if (!is_proposal) {
        await fetch(`${REMOTE_HOST}/toggleMemberInCommunity/?commName=${title}&username=${user}`, {
          method: 'POST',
        });

        response = await fetch(`${REMOTE_HOST}/getCommunityMembers?community=${title}`);
      } else {
        await fetch(`${REMOTE_HOST}/toggleInterested/?propName=${title}&username=${user}`, {
          method: 'POST',
        });

        response = await fetch(`${REMOTE_HOST}/getProposalMembers?proposal=${title}`);
      }

      const json = await response.json();

      setMembers(json.names);
      setMemberUsernames(json.usernames);
  };

  const screenWidth = Dimensions.get('screen').width;
  const imageHeight = Dimensions.get('screen').height * 0.2;

  return (
    <View style={styles.container}>
      {loading && imageLoading ? (
        <View style={[styles.loadingContainer, { width: screenWidth, height: imageHeight }]}>
          <ActivityIndicator size="large" color="#D3D3D3" />
        </View>
      ) : (
        <View style={[styles.imageContainer, { width: screenWidth, height: imageHeight }]}>
          <Image
            source={source}
            style={[styles.image, { width: screenWidth, height: imageHeight }]}
            onLoad={() => setImageLoading(false)} // Set imageLoading to false when image is loaded
          />
          <View style={styles.overlay}>
            <TouchableOpacity
              style={[joined ? styles.joinedButton : styles.notJoinedButton]}
              onPress={handleJoin}
            >
              <Text style={styles.joinButtonText}>{joined ? 'Joined' : 'Join'}</Text>
            </TouchableOpacity>
            <View style={styles.levelTagContainer}>
              <View style={styles.levelContainer}>
                <Text style={styles.levelLabel}>Level:</Text>
                <Text style={styles.level}>{item.level}</Text>
              </View>
            </View>
            <View style={styles.communityTextContainer}>
              <Text style={styles.communityText}>{title}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  communityTextContainer: {
    position: 'absolute',
    top: '70%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better text readability
    paddingVertical: 5,
  },
  communityText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  levelTagContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'column',
    alignItems: 'left',
  },
  levelContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better text readability
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  levelLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  level: {
    color: '#fff',
    fontSize: 14,
  },
  tagContainer: {
    marginTop: 5,
  },
  tag: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#000',
    padding: 3,
    borderRadius: 5,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a semi-transparent background
  },
  joinedButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  notJoinedButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ImageBanner;
