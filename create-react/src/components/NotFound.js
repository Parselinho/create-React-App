import React from "react";
import { useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();

  return (
    <div className="photo-container">
      <h2>404 - Page not found</h2>
      <p>The requested URL {location.pathname} was not found on this server.</p>
    </div>
  );
}

export default NotFound;