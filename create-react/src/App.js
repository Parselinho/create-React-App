import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import apiKey from './config';

import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

function App() {
  // State variables
  const [photos, setPhotos] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('sunsets');
  
  // Listen to URL changes and update searchTerm
  useEffect(() => {
    const pathname = window.location.pathname;
    const searchTermFromPath = pathname.replace('/search/', '');
    // Set searchTerm state to the search term in the URL, or 'sunsets' if none is present
    setSearchTerm(searchTermFromPath || 'sunsets');
  }, []);

  // Fetch photos from Flickr API when searchTerm changes
  useEffect(() => {
    setLoading(true);
    setError(null);
  
    // Make an API request to Flickr with the searchTerm as a parameter
    axios.get('https://api.flickr.com/services/rest/', {
      params: {
        method: 'flickr.photos.search',
        api_key: apiKey,
        text: searchTerm,
        per_page: 24,
        format: 'json',
        nojsoncallback: 1
      }
    })
    .then(response => {
      setLoading(false);
      // Store photos in state variable
      setPhotos(prevPhotos => {
        // Set the photos state variable to a new object containing the previous photos and the new photos for the current searchTerm
        const newPhotos = { ...prevPhotos };
        newPhotos[searchTerm] = response.data.photos.photo;
        return newPhotos;
    });
    })
    .catch(error => {
      setLoading(false);
      setError('An error occurred while fetching data from Flickr API');
    });

  }, [searchTerm]);

  // Render components with React Router
  return (
    <BrowserRouter>
      <div className="container">
        {/* Render the SearchForm component */}
        <SearchForm onSubmit={setSearchTerm} />
        {/* Render the Nav component */}
        <Nav />
        <Routes>
          {/* Render the Gallery component for the home page with a default search term of "sunsets" */}
          <Route path="/" element={<Gallery searchTerm="sunsets" photos={photos["sunsets"] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          {/* Render the Gallery component for search results */}
          {/* <Route path="/search" element={<Gallery photos={photos[searchTerm] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} /> */}
          {/* Render the Gallery component for a specific search term */}
          <Route path="/search/:searchTerm" element={<Gallery photos={photos[searchTerm] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          {/* Render the Gallery component for the "cats" search term */}
          <Route path="/cats" element={<Gallery searchTerm="cats" photos={photos["cats"] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          {/* Render the Gallery component for the "dogs" search term */}
          <Route path="/dogs" element={<Gallery searchTerm="dogs" photos={photos["dogs"] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          {/* Render the Gallery component for the "computers" search term */}
          <Route path="/computers" element={<Gallery searchTerm="computers" photos={photos["computers"] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          {/* Render the NotFound component if no matching route is found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;