import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css'
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourties';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8839a974`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-storage")
    );

    setFavourites(movieFavourites);
  }, [])

  const addToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-storage", JSON.stringify(items));
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    addToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(favourite => favourite.imdbID != movie.imdbID);
    setFavourites(newFavouriteList);
    addToLocalStorage(newFavouriteList);
  };

  return (

    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-3 mb-3'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className="row">
        <MovieList handleFavouritesClick={addFavouriteMovie} movies={movies} favouriteComponent={AddFavourite}/>
      </div>

      <div className='row d-flex align-items-center mt-3 mb-3'>
        <MovieListHeading heading='Favourties' />
      </div>

      <div className="row">
        <MovieList handleFavouritesClick={removeFavouriteMovie} movies={favourites} favouriteComponent={RemoveFavourites}/>
      </div>

    </div>

  );
};

export default App;
