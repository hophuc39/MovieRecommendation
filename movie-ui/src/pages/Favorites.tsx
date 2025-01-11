import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseSetup';

const Favorites = () => {
  const [user] = useAuthState(auth);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites', user?.uid],
    queryFn: () => {
      // TODO: Implement API call to get user's favorites
      return [];
    },
    enabled: !!user
  });

  return (
    <>
      <Navbar />
      <div className="max-w-8xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Favorite Movies</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded ${view === 'grid' ? 'bg-tmdbLightBlue text-white' : 'hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded ${view === 'list' ? 'bg-tmdbLightBlue text-white' : 'hover:bg-gray-100'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-tmdbLightBlue"></div>
          </div>
        ) : favorites?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">You haven't added any movies to your favorites yet.</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <MovieList movies={favorites || []} />
          </div>
        ) : (
          <div className="space-y-4">
            {favorites?.map((movie: any) => (
              <div key={movie.id} className="flex gap-4 p-4 bg-white rounded-lg shadow">
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-500">{movie.release_date}</p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites; 