import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    // Render a navigation bar with links to other pages
    <nav className='main-nav'>
      <ul>
        <li>
          <Link to='/cats'>Cats</Link>
        </li>
        <li>
          <Link to='/dogs'>Dogs</Link>
        </li>
        <li>
          <Link to='/computers'>Computers</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
