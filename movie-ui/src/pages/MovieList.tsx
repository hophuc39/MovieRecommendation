import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import Navbar from '../components/Navbar';
import MovieFilter from '../components/MovieFilter';
import { getMovies, getGenres } from '../api/movieApi';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';

const MovieList = () => {
  const [selectedSort, setSelectedSort] = useState('popularity.desc');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [minUserScore, setMinUserScore] = useState(0);
  const [minUserVotes, setMinUserVotes] = useState(0);
  const [page, setPage] = useState(1);

  const { data: genres = [] } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres
  });

  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies', selectedSort, selectedGenres, minUserScore, minUserVotes, page],
    queryFn: () => getMovies({
      sort: selectedSort,
      genres: selectedGenres.join(","),
      minUserScore,
      minUserVotes,
      page
    })
  });

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    setPage(1);
  };

  const handleGenreChange = (genreId: number) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
    setPage(1);
  };

  const getActiveFilters = () => {
    const filters = [];
    if (selectedGenres.length > 0) {
      const genreNames = selectedGenres
        .map(id => genres.find((g: any) => g.id === id)?.name)
        .filter(Boolean);
      filters.push(`Genres: ${genreNames.join(', ')}`);
    }
    if (minUserScore > 0) filters.push(`Min Score: ${minUserScore}`);
    if (minUserVotes > 0) filters.push(`Min Votes: ${minUserVotes}`);
    return filters;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex flex-col">
        <div className="flex-grow max-w-8xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Left Sidebar - Filters */}
            <div className="w-72 flex-shrink-0">
              <MovieFilter
                selectedSort={selectedSort}
                onSortChange={handleSortChange}
                selectedGenres={selectedGenres}
                onGenreChange={handleGenreChange}
                genres={genres}
                minUserVotes={minUserVotes}
                onMinUserVotesChange={setMinUserVotes}
                minUserScore={minUserScore}
                onMinUserScoreChange={setMinUserScore}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-tmdbLightBlue"></div>
                </div>
              ) : movies?.items.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4">No movies found</h2>
                  {getActiveFilters().length > 0 ? (
                    <>
                      <p className="text-gray-600 mb-2">
                        No results found with the following filters:
                      </p>
                      <ul className="text-gray-600">
                        {getActiveFilters().map((filter, index) => (
                          <li key={index}>{filter}</li>
                        ))}
                      </ul>
                      <p className="text-gray-600 mt-4">
                        Try adjusting your filters to find more movies
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-600">
                      No movies available at the moment
                    </p>
                  )}
                </div>
              ) : (
                <>
                  {/* Results count */}
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Found {movies.total.toLocaleString()} movies
                    </p>
                  </div>

                  {/* Movie Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.items.map((movie: any) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="mt-8 flex justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2">
                        Page {page} of {Math.ceil((movies?.total || 0) / 20)}
                      </span>
                      <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page >= Math.ceil((movies?.total || 0) / 20)}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MovieList; 