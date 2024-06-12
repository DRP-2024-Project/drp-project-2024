import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { REMOTE_HOST } from './Config';
import Tag from './Tag'; // Assuming Tag is a custom component you have for displaying tags

const ImageBanner = ({ user, item, joined, setJoined, setMemberUsernames, setMembers }) => {
  const [url, setUrl] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true); // State for image loading

  const community = item.title;

  const handleJoin = async () => {
    setJoined(!joined);
    await fetch(`${REMOTE_HOST}/toggleMemberInCommunity/?commName=${community}&username=${user}`, {
      method: 'POST',
    });

    const response = await fetch(`${REMOTE_HOST}/getCommunityMembers?community=${community}`);
    const json = await response.json();
    setMembers(json.names);
    setMemberUsernames(json.usernames);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${REMOTE_HOST}/getCommunityMembers?community=${community}`);
        const json = await response.json();
        setMembers(json.names);
        setMemberUsernames(json.usernames);
        if (json.usernames.includes(user)) {
          setJoined(true);
        }
      } catch (error) {
        console.error('Failed to fetch community members:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [community, user]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const urlLoaded = new URL(`${REMOTE_HOST}/images`);
        urlLoaded.searchParams.append('name', community);
        urlLoaded.searchParams.append('id', '0');
        setUrl(urlLoaded);
      } catch (error) {
        console.error('Error fetching banner image:', error);
      }
    };

    fetchImage();
  }, [community]);

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
            source={{ uri: url.toString() }}
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
              {/* <View style={styles.tagContainer}>
                <Tag tag_name={item.tag} style={styles.tag} />
              </View> */}
            </View>
            <View style={styles.communityTextContainer}>
              <Text style={styles.communityText}>{community}</Text>
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
