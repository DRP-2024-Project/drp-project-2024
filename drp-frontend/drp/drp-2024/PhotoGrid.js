import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { REMOTE_HOST } from './Config';
import "react-image-gallery/styles/css/image-gallery.css";
import './styles/PhotoGrid.css';

const PhotoGrid = ({ community }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const url = new URL(`${REMOTE_HOST}/all-images`);
        url.searchParams.append('name', community);

        const response = await fetch(url.toString());
        const data = await response.json();
        const formattedImages = data.map(image => ({
          original: `data:image/jpeg;base64,${image}`,
          thumbnail: `data:image/jpeg;base64,${image}`,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [community]);

  return (
    <div className="photo-grid-container">
      <ImageGallery items={images} />
    </div>
  );
};

export default PhotoGrid;
