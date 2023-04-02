import React from 'react';

function Photo({ photos, error }) {
  if (error) {
    return (
      <div className='photo-container'>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className='photo-container'>
      <h2>Results</h2>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={photo.title} />
          </li>
        ))}
      </ul>
      {photos.length === 0 && (
        <li className='not-found'>
          <h3>No Results Found</h3>
          <p>Your search did not return any results. Please try again.</p>
        </li>
      )}
    </div>
  );
}

export default Photo;
