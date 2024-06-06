import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { REMOTE_HOST } from './Config';
import Carousel from 'react-native-reanimated-carousel';

const PhotoGrid = ({ community }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const url = new URL(`${REMOTE_HOST}/all-images`);
        url.searchParams.append('name', community);

        const response = await fetch(url.toString());
        const data = await response.json();
        setImages(data.map(image => `data:image/jpeg;base64,${image}`));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [community]);

  const screenWidth = Dimensions.get('screen').width;
  const imageHeight = Dimensions.get('screen').height * 0.3;

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={[styles.loadingContainer, { width: screenWidth - 40, height: imageHeight }]}>
          <ActivityIndicator size="large" color="#D3D3D3" />
        </View>
      ) : (
        <Carousel
          loop
          width={screenWidth}
          height={imageHeight}
          data={[...new Array(images.length).keys()]}
          scrollAnimationDuration={1000}
          renderItem={({ index }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: images[index] }} style={[styles.image, { width: screenWidth - 40, height: imageHeight }]} />
            </View>
          )}
          mode="parallax"
          parallaxScrollingScale={0.9}
          parallaxScrollingOffset={50}
        />
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
  image: {
    resizeMode: 'cover',
    marginHorizontal: 20,
    borderRadius: 5,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a semi-transparent background
  },
});

export default PhotoGrid;
