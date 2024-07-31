//Hero Section
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

//TMDB API Key
const TMDB_API_KEY = '57e7da297e7cfe3c1ceff135422b6c96'; 

const Main = () => {
  const [movies, setMovies] = useState([]);

  //API Fetch Function
  useEffect(() => {
    //Regular Fetch Function
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
        setMovies(response.data.results);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className='carousel-container'>
      <h1 className='center'> OUT NOW</h1>
      <section>
      {/* Checks To See If The Movie Data Array Length Is More Than Zero */}
      {movies.length > 0 ? (
        <Carousel className='carousel' showThumbs={false} infiniteLoop={true} autoPlay={true} showStatus={false}>
          {/* Maps The Movie Data Array Into The Carousel Component */}
            {/* JSX For Each Movie In The Movie Data Array  */}
          {movies.map(movie => (
            <div key={movie.id} className='carousel-slide'>
              <div className='movie-card'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className='movie-info'>
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                  <button> Watch Now </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>Loading movies...</p>
      )}
      </section>
      
      <h1 className='center'>HOW TO USE THIS APP</h1>
      <div className='instruction-container'>

        <div className='instruction'>
        <h2>Press Create A List</h2>
        <p>Press Create a List to Start Looking Into Our Database of Different Actors, Shows and Movies. Add The The Name and Purpose of Your List </p>
        </div>

        <div className='instruction'>
          <h2>Search Your Favorites</h2>
          <p>
            Search for your favorites within our database of different actors, shows and movies. 
          </p>
        </div>

        <div className='instruction'>
          <h2>Add To Your List</h2>
          <p>
            Add to your list of favorites and organize them into different actors, catagories and more.
          </p>
        </div>
        <div className='instruction'>
          <h2>Check Off When Done</h2>
          <p>
            Check off the list of episodes when watched and share different reviews of your favorite shows.
          </p>
        </div>  
      </div>

    </div>
  );
};

export default Main;