import React, { useEffect } from 'react';
import Photo from './Photo';

function Gallery({ searchTerm, photos, loading, error, onSearchTermChange }) {
  useEffect(() => {
    if (searchTerm) {
      onSearchTermChange(searchTerm);
    }
  }, [searchTerm, onSearchTermChange]);

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