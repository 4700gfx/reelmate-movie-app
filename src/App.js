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
  // State Management of Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);
  const [isActorMoviesModalOpen, setIsActorMoviesModalOpen] = useState(false);
  const [isMovieDetailsModalOpen, setIsMovieDetailsModalOpen] = useState(false);
  const [isShowDetailsModalOpen, setIsShowDetailsModalOpen] = useState(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [isConfirmAddModalOpen, setIsConfirmAddModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  // State Management of List, Movies, Actors, and Results
  const [results, setResults] = useState([]);
  const [detailedResults, setDetailedResults] = useState([]);
  const [actorId, setActorId] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [showId, setShowId] = useState(null);
  const [lists, setLists] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [itemToAdd, setItemToAdd] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [completedList, setCompletedList] = useState([]); // Ensure this is initialized

  // Function to Add Search Item via API Calls
  const handleSearch = async (query) => {
    if (!query) return; // Avoid searching with empty query
  
    try {
      const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
      const data = await response.json();
      setResults(data.results);
      setIsModalOpen(true); // Open the modal to show results
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Handle Functions for Different Query Parameters
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

  // Function to Name Unnamed Lists
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
    const updatedLists = lists.map(list => {
      const existingItem = list.items.find(i => i.id === item.id);
      if (existingItem) {
        // Increment the Watch Count if item already exists
        return {
          ...list,
          items: list.items.map(i => i.id === item.id
            ? { ...i, watchCount: (i.watchCount || 0) + 1 }
            : i
          )
        };
      } else {
        // Add item if it does not exist
        return {
          ...list,
          items: [...list.items, { ...item, watchCount: 1 }]
        };
      }
    });

    setLists(updatedLists);
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

  const handleDeleteItem = (listName, itemId) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.name === listName
          ? { ...list, items: list.items.filter(item => item.id !== itemId) }
          : list
      )
    );
  
    // Update the current list to reflect the deletion in the modal
    if (currentList?.name === listName) {
      setCurrentList(prevList => ({
        ...prevList,
        items: prevList.items.filter(item => item.id !== itemId)
      }));
    }
  };

  const handleCompleteItem = (listName, item) => {
    const completedListName = 'Completed';
  
    setLists(prevLists => {
      const updatedLists = prevLists.map(list =>
        list.name === listName
          ? { ...list, items: list.items.filter(i => i.id !== item.id) }
          : list
      );
  
      const completedList = updatedLists.find(list => list.name === completedListName);
      if (completedList) {
        const existingItem = completedList.items.find(i => i.id === item.id);
        if (existingItem) {
          completedList.items = completedList.items.map(i =>
            i.id === item.id
              ? { ...i, watchCount: (i.watchCount || 0) + 1 }
              : i
          );
        } else {
          completedList.items.push({ ...item, watchCount: 1 });
        }
      } else {
        updatedLists.push({ name: completedListName, items: [{ ...item, watchCount: 1 }] });
      }
  
      // Update the current list to remove the completed item
      if (currentList?.name === listName) {
        setCurrentList(prevList => ({
          ...prevList,
          items: prevList.items.filter(i => i.id !== item.id)
        }));
      }
  
      return updatedLists;
    });

    // Ensure completed items are also reflected in the completed list state
    setCompletedList(prevCompletedList => {
      const existingItemIndex = prevCompletedList.findIndex(i => i.id === item.id);
      if (existingItemIndex > -1) {
        return prevCompletedList.map((i, index) =>
          index === existingItemIndex
            ? { ...i, watchCount: (i.watchCount || 0) + 1 }
            : i
        );
      } else {
        return [...prevCompletedList, { ...item, watchCount: 1 }];
      }
    });
  };

  return (
    <div className='App'>
      <Navbar
        onSearch={handleSearch}
        lists={lists}
        onOpenList={handleOpenList}
        onCreate={() => setIsCreateListModalOpen(true)}
        onRemoveList={handleRemoveList}
        completedList={completedList} // Pass completedList
        setCompletedList={setCompletedList} // Pass setCompletedList if needed in Navbar
      />

      <div className='app-content'>
        <Main />
        <MovieList completedList={completedList} /> {/* Pass completedList */}
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
        onAddToList={handleAddToList}
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
        onClose={() => setIsConfirmAddModalOpen(false)}
        lists={lists}
        onConfirm={handleConfirmAdd}
        item={itemToAdd}
        onAddToList={handleAddToList}
        onDeleteItem={handleDeleteItem}
        onCompleteItem={handleCompleteItem}
      />

      <ListModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        list={currentList}
        onDeleteItem={handleDeleteItem}
        onCompleteItem={handleCompleteItem}
        completedList={completedList} // Pass completedList here
      />

    </div>
  );
}

export default App;
