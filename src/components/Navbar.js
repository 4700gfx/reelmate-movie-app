import React from 'react';
import logo from '../assets/images/reelmate-logo.png';
import instagram from '../assets/images/instagram.png';
import facebook from '../assets/images/facebook-logo-in-circular-shape.png';
import twitter from '../assets/images/twitter.png';
import youtube from '../assets/images/youtube.png';

const Navbar = ({ onSearch, lists, onOpenList, onCreate }) => {
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

  const handleCreateListClick = () => {
    onCreate(); // Open Create List Modal
  };

  return (
    <header>
      <nav>
        <img src={logo} alt='reelmate logo' />
        <div className='search-console'>
          <input
            className='input'
            placeholder='Search Here'
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <ul>
          {Object.keys(tabs).map(tab => (
            <li key={tab}>{tabs[tab]}</li>
          ))}
        </ul>

        <div className='list-section'>
          <h4>WATCH LIST</h4>
          <ul>
            {lists.map(list => (
              <li key={list.name} onClick={() => onOpenList(list.name)}>
                {list.name}
              </li>
            ))}
          </ul>
          <button onClick={handleCreateListClick}>+ Create A List</button>
        </div>

        <div className='social-console'>
          {Object.keys(icons).map(icon => (
            <a key={icon} href={'#Home'}>
              <img src={icons[icon]} alt={`${icon} icon`} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
