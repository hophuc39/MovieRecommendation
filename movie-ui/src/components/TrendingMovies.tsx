import { useState, useEffect } from 'react';
import { getTrendingMoviesDay, getTrendingMoviesWeek } from '../api/movieApi';
import MovieList from './MovieList';

const TrendingMovies = () => {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');
  const [dayMovies, setDayMovies] = useState([]);
  const [weekMovies, setWeekMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Fetch cả 2 loại dữ liệu ngay từ đầu
        const [dayData, weekData] = await Promise.all([
          getTrendingMoviesDay(),
          getTrendingMoviesWeek()
        ]);
        setDayMovies(dayData);
        setWeekMovies(weekData);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []); // Chỉ fetch một lần khi component mount

  return (
    <div>
      <div className="flex items-center gap-6 mb-6">
        <h2 className="text-2xl font-bold">Trending</h2>
        <div className="flex rounded-full bg-tmdbDarkBlue p-1">
          <button
            className={`px-4 py-1 rounded-full ${timeWindow === 'day' ? 'bg-tmdbLightBlue text-white' : 'text-white'}`}
            onClick={() => setTimeWindow('day')}
          >
            Today
          </button>
          <button
            className={`px-4 py-1 rounded-full ${timeWindow === 'week' ? 'bg-tmdbLightBlue text-white' : 'text-white'}`}
            onClick={() => setTimeWindow('week')}
          >
            This Week
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className={timeWindow === 'day' ? 'block' : 'hidden'}>
            <MovieList movies={dayMovies} />
          </div>
          <div className={timeWindow === 'week' ? 'block' : 'hidden'}>
            <MovieList movies={weekMovies} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingMovies;
