import { useQuery } from '@tanstack/react-query';
import { getWatchlist } from '../api/movieApi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseSetup';
import { Link, useNavigate } from 'react-router';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Watchlist = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const { data: movies, isLoading } = useQuery({
    queryKey: ['watchlist'],
    queryFn: getWatchlist,
    enabled: !!user
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-tmdbLightBlue"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex flex-col">
        <div className="flex-grow max-w-8xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">My Watchlist</h1>
          {movies?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie: any) => (
                <Link
                  key={movie.tmdb_id}
                  to={`/movie/${movie.tmdb_id}`}
                  className="group"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You haven't added any movies to your watchlist yet.</p>
              <Link to="/movies" className="text-tmdbLightBlue hover:underline">
                Browse Movies
              </Link>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Watchlist; 