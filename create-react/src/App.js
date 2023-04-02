import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <SearchForm />
        <Nav />
        <Routes>
          <Route path="/" element={<Gallery searchTerm="sunsets" />} />
          <Route path="/search" element={<Gallery />} />
          <Route path="/search/:searchTerm" element={<Gallery />} />
          <Route path="/cats" element={<Gallery searchTerm="cats" />} />
          <Route path="/dogs" element={<Gallery searchTerm="dogs" />} />
          <Route path="/computers" element={<Gallery searchTerm="computers" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;