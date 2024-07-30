import React from 'react';
import logo from '../assets/images/reelmate-logo.png';

const Navbar = () => {
  const tabs = {
    home: 'Home',
    library: 'Library',
    friends: 'Friends',
    myList: 'My List',
  };

  return (
    <header>
      <nav>
        {/* Logo Image and Input */}
        <img src={logo} alt='reelmate logo' />
        <div className='search-console'>
        <input placeholder=' Search Here' />
        <button>Search</button>
        </div>

        {/* List Items Mapped By Object */}
        <ul>
          {Object.keys(tabs).map(tab => (<li key={tab}>{tabs[tab]}</li>))}
        </ul>

        {/* User List Section */}
        <div className='list-section'>
          <h4>WATCH LIST</h4>
          <ul>
            <li>Anime</li>
            <li>Movies</li>
            <li>Denzel Movies</li>
          </ul>
        </div>

        <div className='list-section'>
          <h4>CATAGORIES</h4>
          <ul>
            <li>Drama</li>
            <li>Action</li>
            <li>Comedies</li>
            <li>Anime</li>
            <li>Marvel/DC Movies</li>
            <li>Documentaries</li>
          </ul>
        </div>

        <button>Create A List</button>
        <button>Sign In</button>
      </nav>
    </header>
  );
};

export default Navbar;
