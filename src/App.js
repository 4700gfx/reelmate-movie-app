import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import MovieList from './components/MovieList';
import Modal from './components/Modal';
import DetailedModal from './components/DetailedModal';
import ActorMoviesModal from './components/ActorMoviesModal';
import MovieDetailsModal from './components/MovieDetailsModal';
import ShowDetailsModal from './components/ShowDetailsModal';
import CreateListModal from './components/CreateListModal';
import ConfirmAddModal from './components/ConfirmAddModal';
import ListModal from './components/ListModal';

const API_KEY = '57e7da297e7cfe3c1ceff135422b6c96'; 
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  //State Management of Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);
  const [isActorMoviesModalOpen, setIsActorMoviesModalOpen] = useState(false);
  const [isMovieDetailsModalOpen, setIsMovieDetailsModalOpen] = useState(false);
  const [isShowDetailsModalOpen, setIsShowDetailsModalOpen] = useState(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [isConfirmAddModalOpen, setIsConfirmAddModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  

  //State Magement of List, Movies, Actors and Results
  const [results, setResults] = useState([]);
  const [detailedResults, setDetailedResults] = useState([]);
  const [actorId, setActorId] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [showId, setShowId] = useState(null);
  const [lists, setLists] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [itemToAdd, setItemToAdd] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [selectedList, setSelectedList] = useState(null);


  //Function to Add Search Item via API Calls
  const handleSearch = async (query) => {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    setResults(data.results);
    setIsModalOpen(true);
  };


  //Handle Functions for Different Query Parameters
  const handleOptionSelect = async (option) => {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${option.name || option.title}`);
    const data = await response.json();
    setDetailedResults(data.results);
    setIsModalOpen(false);
    setIsDetailedModalOpen(true);
  };

  const handleActorClick = (actorId) => {
    setActorId(actorId);
    setIsDetailedModalOpen(false);
    setIsActorMoviesModalOpen(true);
  };

  const handleMovieClick = (movieId) => {
    setMovieId(movieId);
    setIsActorMoviesModalOpen(false);
    setIsDetailedModalOpen(false);
    setIsMovieDetailsModalOpen(true);
  };

  const handleShowClick = (showId) => {
    setShowId(showId);
    setIsDetailedModalOpen(false);
    setIsShowDetailsModalOpen(true);
  };


  //Function to Name Unnamed Lists
  const handleCreateList = (listName) => {
    if (!listName) {
      listName = 'My List';
    }
  
    let duplicateCount = lists.filter(list => list.name.startsWith(listName)).length;
  
    if (duplicateCount > 0) {
      listName = `${listName} ${duplicateCount + 1}`;
    }
  
    setLists([...lists, { name: listName, items: [] }]);
    setIsCreateListModalOpen(false);
  };
  

  const handleSearchForList = async (query) => {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    setSearchResults(data.results);
  };

  const handleAddToList = (item) => {
    setItemToAdd(item);
    setIsConfirmAddModalOpen(true);
    setIsDetailedModalOpen(false); // Close Detailed Modal after adding
  };
  
  const handleConfirmAdd = (item, listName) => {
    setLists(lists.map(list =>
      list.name === listName
        ? { ...list, items: [...list.items, item] }
        : list
    ));
    setIsConfirmAddModalOpen(false);
  };

  const handleOpenList = (listName) => {
    const list = lists.find(list => list.name === listName);
    setCurrentList(list);
    setIsListModalOpen(true);
  };

  const handleRemoveList = (listName) => {
    setLists(lists.filter(list => list.name !== listName));
  };



  return (
    <div className='App'>
      <Navbar
        onSearch={handleSearch}
        lists={lists}
        onOpenList={handleOpenList}
        onCreate={() => setIsCreateListModalOpen(true)}
        onRemoveList={handleRemoveList} // Pass the remove function
      />

      <div className='app-content'>
        <Main />
        <MovieList />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        results={results}
        onOptionSelect={handleOptionSelect}
      />
      <DetailedModal
        isOpen={isDetailedModalOpen}
        onClose={() => setIsDetailedModalOpen(false)}
        results={detailedResults}
        onActorClick={handleActorClick}
        onMovieClick={handleMovieClick}
        onShowClick={handleShowClick}
        onAddToList={handleAddToList} // Pass handleAddToList here
      />
      <ActorMoviesModal
        isOpen={isActorMoviesModalOpen}
        onClose={() => setIsActorMoviesModalOpen(false)}
        actorId={actorId}
        onMovieClick={handleMovieClick}
      />
      <MovieDetailsModal
        isOpen={isMovieDetailsModalOpen}
        onClose={() => setIsMovieDetailsModalOpen(false)}
        movieId={movieId}
        onAddToList={handleAddToList}
      />
      <ShowDetailsModal
        isOpen={isShowDetailsModalOpen}
        onClose={() => setIsShowDetailsModalOpen(false)}
        showId={showId}
        onAddToList={handleAddToList}
      />
      <CreateListModal
        isOpen={isCreateListModalOpen}
        onClose={() => setIsCreateListModalOpen(false)}
        onCreate={handleCreateList}
        onSearch={handleSearchForList}
        searchResults={searchResults}
        onAddToList={handleAddToList}
      />

      <ConfirmAddModal
        isOpen={isConfirmAddModalOpen}
        onClose={() => setIsConfirmAddModalOpen(false)} // This function will close the modal
        lists={lists}
        onConfirm={handleConfirmAdd}
        item={itemToAdd}
        onAddToList={handleAddToList}
      />


      <ListModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        list={currentList}
      />
    </div>
  );
}

export default App;
