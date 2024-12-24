import { useState, useEffect } from 'react';

import MoviesList from './MovieList';

const TrendingMovies = () => {
  const [timeWindow, setTimeWindow] = useState('day'); // 'day' or 'week'
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // const data = await fetchTrendingMovies(timeWindow);
        // setMovies(data);
      } catch (error) {
        console.error('Error loading trending movies');
      }
    };

    fetchMovies();
  }, [timeWindow]);

  return (
    <div className="trending-movies-container" style={{
      backgroundImage: "url('/background.jpg')",
    }}>
      <div>
        <h1 className="trending-title"> Trending Movies</h1>
        <div className="trending-buttons">
          <button className='btn btn-primary' onClick={() => setTimeWindow('day')}>Today</button>
          <button className='btn btn-primary' onClick={() => setTimeWindow('week')}>This Week</button>
        </div>
        <MoviesList movies={movies} />
      </div>
    </div>
  );
};

export default TrendingMovies;
