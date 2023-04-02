import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photo from './Photo';
import apiKey from '../config';

function Gallery({ searchTerm }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get('https://api.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.search',
        api_key: apiKey,
        text: searchTerm,
        per_page: 12,
        format: 'json',
        nojsoncallback: 1
      }
    })
    .then(response => {
      setLoading(false);
      setPhotos(response.data.photos.photo);
    })
    .catch(error => {
      setLoading(false);
      setError('An error occurred while fetching data from Flickr API');
    });
  }, [searchTerm]);

  return (
    <>
      {loading ? (
        <div className="photo-container">
          <h2>Loading...</h2>
        </div>
      ) : (
        <Photo photos={photos} error={error} />
      )}
    </>
  );
}

export default Gallery;
