import React, { useEffect, useState } from "react";
import axios from 'axios';

// TMDB API Key
const TMDB_API_KEY = '57e7da297e7cfe3c1ceff135422b6c96';

const MovieList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [actorList, setActorList] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&with_genres=16&with_original_language=ja&language=en-US&sort_by=popularity.desc&page=1`);
        setAnimeList(response.data.results.slice(0, 4)); // Get top 4 animes
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching anime:', error);
      }
    };

    const fetchTvShows = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        setTvList(response.data.results.slice(0, 4)); // Get top 5 TV shows
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    const fetchActors = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        setActorList(response.data.results.slice(0, 4)); // Get top 4 actors
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    fetchAnime();
    fetchTvShows();
    fetchActors();
  }, []);

  return (
    <>
      <section className="anime-container">
        <h1 className="center">Top Animes</h1>
        <div className="anime-list">
          {animeList.map((anime, index) => (
            <div key={anime.id} className="anime-card">
              <img 
                src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`} 
                alt={anime.name} 
              />
              <div className="anime-info">
                <h3>{anime.name}</h3>
              </div>
              <div className="anime-hover-info">
                <p className="rank-title">Rank: {index + 1}</p>
                <p>{anime.overview}</p>
                <button>Watch Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tv-container">
        <h1 className="center">Top TV Shows</h1>
        <div className="tv-list">
          {tvList.map((tvShow, index) => (
            <div key={tvShow.id} className="tv-card">
              <img 
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} 
                alt={tvShow.name} 
              />
              <div className="tv-info">
                <h3>{tvShow.name}</h3>
              </div>
              <div className="tv-hover-info">
                <p className="rank-title">Rank: {index + 1}</p>
                <p>{tvShow.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="actor-container">
        <h1 className="center">Popular Actors</h1>
        <div className="actor-list">
          {actorList.map((actor, index) => (
            <div key={actor.id} className="actor-card">
              <img 
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
                alt={actor.name} 
              />
              <div className="actor-info">
                <h3>{actor.name}</h3>
              </div>
              <div className="actor-hover-info">
                <p className="rank-title">Rank: {index + 1}</p>
                <p>Known for: {actor.known_for.map(movie => movie.title || movie.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default MovieList;
