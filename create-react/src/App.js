import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import apiKey from './config';

import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

function App() {
  const [photos, setPhotos] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('sunsets');
  
  // Listen to URL changes and update searchTerm
  useEffect(() => {
    const pathname = window.location.pathname;
    const searchTermFromPath = pathname.replace('/search/', '');
    setSearchTerm(searchTermFromPath || 'sunsets');
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
  
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
      setPhotos(prevPhotos => {
        const newPhotos = { ...prevPhotos };
        newPhotos[searchTerm] = response.data.photos.photo;
        return newPhotos;
      });
    })
    .catch(error => {
      setLoading(false);
      setError('An error occurred while fetching data from Flickr API');
    });
  
    // Update URL with searchTerm
    if (searchTerm !== 'sunsets') {
      window.history.pushState({}, '', `/search/${searchTerm}`);
    } else {
      window.history.pushState({}, '', '/');
    }
  }, [searchTerm]);

  return (
    <BrowserRouter>
      <div className="container">
        <SearchForm onSubmit={setSearchTerm} />
        <Nav />
        <Routes>
          <Route path="/" element={<Gallery searchTerm="sunsets" photos={photos["sunsets"] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          <Route path="/search" element={<Gallery photos={photos[searchTerm] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          <Route path="/search/:searchTerm" element={<Gallery photos={photos[searchTerm] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          <Route path="/cats" element={<Gallery searchTerm="cats" photos={photos["cats"] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          <Route path="/dogs" element={<Gallery searchTerm="dogs" photos={photos["dogs"] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          <Route path="/computers" element={<Gallery searchTerm="computers" photos={photos["computers"] || []} loading={loading} error={error} onSearchTermChange={setSearchTerm} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;