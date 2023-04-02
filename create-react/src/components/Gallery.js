import React, { useEffect } from 'react';
import Photo from './Photo';

function Gallery({ searchTerm, photos, loading, error, onSearchTermChange }) {
  // Call the onSearchTermChange function whenever the searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      onSearchTermChange(searchTerm);
    }
  }, [searchTerm, onSearchTermChange]);

  // Render the gallery component with photos and/or error message
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