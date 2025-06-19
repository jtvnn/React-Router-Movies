import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5001/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movies' slice of state
          setMovies(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    setSaved(prevList => {
      if (prevList.includes(id)) return prevList;
      return [...prevList, id];
    });
  };

  return (
    <div>
      <SavedList list={movies.filter(movie => saved.includes(movie.id))} />

      <Routes>
        <Route path='/' element={<MovieList movies={movies} />} />
        <Route path='movies/:id' element={<Movie addToSavedList={addToSavedList} />} />
      </Routes>
    </div>
  );
}
