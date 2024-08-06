// App.js
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import MovieList from './components/MovieList';
import Modal from './components/Modal';
import DetailedModal from './components/DetailedModal';
import ActorMoviesModal from './components/ActorMoviesModal';
import MovieDetailsModal from './components/MovieDetailsModal';

const API_KEY = '57e7da297e7cfe3c1ceff135422b6c96'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3/search/multi';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);
  const [isActorMoviesModalOpen, setIsActorMoviesModalOpen] = useState(false);
  const [isMovieDetailsModalOpen, setIsMovieDetailsModalOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [detailedResults, setDetailedResults] = useState([]);
  const [actorId, setActorId] = useState(null);
  const [movieId, setMovieId] = useState(null);

  const handleSearch = async (query) => {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    setResults(data.results);
    setIsModalOpen(true);
  };

  const handleOptionSelect = async (option) => {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&query=${option.name || option.title}`);
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

  return (
    <div className='App'>
      <Navbar onSearch={handleSearch} />
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
      />
    </div>
  );
}

export default App;
