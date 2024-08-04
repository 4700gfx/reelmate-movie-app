import React from 'react';
import logo from '../assets/images/reelmate-logo.png';
import instagram from '../assets/images/instagram.png';
import facebook from '../assets/images/facebook-logo-in-circular-shape.png';
import twitter from '../assets/images/twitter.png';
import youtube from '../assets/images/youtube.png';

const Navbar = () => {
  const tabs = {
    home: 'Home',
    library: 'Library',
    friends: 'Friends',
    myList: 'My List',
  };

  const icons = {
    instagram: instagram,
    facebook: facebook,
    twitter: twitter,
    youtube: youtube,
  };

  return (
    <header>
      <nav>
        {/* Logo Image and Input */}
        <img src={logo} alt='reelmate logo' />
        <div className='search-console'>
          <input className='input' placeholder=' Search Here' />
          <button>Search</button>
        </div>

        {/* List Items Mapped By Object */}
        <ul>
          {Object.keys(tabs).map(tab => (
            <li key={tab}>{tabs[tab]}</li>
          ))}
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
          <h4>CATEGORIES</h4>
          <ul>
            <li>Drama</li>
            <li>Action</li>
            <li>Comedies</li>
            <li>Anime</li>
            <li>Marvel/DC Movies</li>
            <li>Documentaries</li>
          </ul>
        </div>

        <div className='social-console'>
          {Object.keys(icons).map(icon => (
            <a key={icon} href={'#Home'}>
              <img src={icons[icon]} alt={`${icon} icon`} />
            </a>
          ))}
        </div>

        <button> + Create A List</button>
        <button>Sign In</button>
      </nav>
    </header>
  );
};

export default Navbar;
