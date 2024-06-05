import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { REMOTE_HOST } from './Config';
import 'react-native-reanimated';

const PhotoGrid = ({ community }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      }
    };

    fetchImages();
  }, [community]);

  const screenWidth = Dimensions.get('screen').width;
  const imageHeight = Dimensions.get('screen').height * 0.3;

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
  };

  return (
    <View style={styles.container}>
      {images.length > 0 && (
        <Carousel
          loop
          width={screenWidth}
          height={imageHeight}
          data={[...new Array(images.length).keys()]}
          scrollAnimationDuration={1000}
          renderItem={({ _ }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: images[currentIndex] }} style={[styles.image, { width: screenWidth - 40, height: imageHeight }]} />
            </View>
          )}
          onSnapToItem={(index) => setCurrentIndex(index)}
        />
      )}
      <TouchableOpacity onPress={handlePrevious} style={[styles.button, styles.buttonLeft]}>
        <Text style={styles.buttonText}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext} style={[styles.button, styles.buttonRight]}>
        <Text style={styles.buttonText}>{'>'}</Text>
      </TouchableOpacity>
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
    marginHorizontal: 20,  // Add margin to the image
    borderRadius: 5,
  },
  button: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  buttonLeft: {
    left: 10,
  },
  buttonRight: {
    right: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,  // Increase font size for better visibility
  },
});

export default PhotoGrid;
