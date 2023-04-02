import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found-heading">Oops! Page not found.</h1>
      <p className="not-found-text">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/" className="not-found-link">Back to Home</Link>
    </div>
  );
}

export default NotFound;