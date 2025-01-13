import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { searchMovies, searchMoviesWithLLM } from '../api/movieApi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseSetup';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Search = () => {
  const defaultPoster = 'https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg';
  const [user] = useAuthState(auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [searchType, setSearchType] = useState<'llm' | 'basic'>(user ? 'llm' : 'basic');

  const { data: movies, isLoading } = useQuery({
    queryKey: ['search', query, searchType],
    queryFn: () => searchType === 'llm' ? searchMoviesWithLLM(query) : searchMovies(query),
    enabled: !!query
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex flex-col">
        <div className="flex-grow max-w-8xl mx-auto px-4 py-8 w-full">
          <div className="space-y-8">
            {/* LLM Search */}
            <div className="max-w-2xl mx-auto w-full">
              <h2 className="text-2xl font-bold mb-4 text-center">AI-Powered Search</h2>
              <form onSubmit={handleSearch} className="flex gap-2 w-full">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onClick={() => setSearchType('llm')}
                  placeholder="Describe the movie you're looking for..."
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-tmdbLightBlue"
                />
                <button
                  type="submit"
                  onClick={() => setSearchType('llm')}
                  className="px-6 py-2 bg-tmdbLightBlue text-white rounded-lg hover:bg-tmdbLightBlue/90 whitespace-nowrap"
                >
                  AI Search
                </button>
              </form>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Pro tip: Try describing the plot, themes, or feelings you're looking for!
              </p>
            </div>
          </div>

          {query && !isLoading && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">
                {searchType === 'llm' ? 'AI Search Results' : 'Search Results'} for "{query}"
              </h2>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-tmdbLightBlue"></div>
            </div>
          ) : movies?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie: any) => (
                <Link
                  key={movie.tmdb_id}
                  to={`/movie/${movie.tmdb_id}`}
                  className="group"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2">
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultPoster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h2 className="font-semibold group-hover:text-tmdbLightBlue transition-colors">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No movies found matching "{query}"</p>
            </div>
          ) : null}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Search; 