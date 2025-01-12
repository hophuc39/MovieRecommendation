import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { getMovieDetail } from '../api/movieApi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseSetup';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';
import ProfileImage from '../components/ProfileImage';
import CircularRating from '../components/CircularRating';
import heartIcon from '../assets/icons/heart.svg';
import bookmarkIcon from '../assets/icons/bookmark.svg';
import ActionButton from '../components/ActionButton';
import Footer from '../components/Footer';
import ReviewForm from '../components/ReviewForm';

const MovieDetail = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetail(id as string),
    enabled: !!id
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

  if (isError || !movie) {
    return (
      <>
        <Navbar />
        <div className="max-w-8xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
            <p className="text-gray-600 mb-4">
              The movie you're looking for could not be found.
            </p>
            <Link
              to="/movies"
              className="text-tmdbLightBlue hover:underline"
            >
              Browse all movies
            </Link>
          </div>
        </div>
      </>
    );
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleMarkAsFavorite = () => {
    // TODO: Implement mark as favorite functionality
    console.log('Mark as favorite clicked');
  };

  const handleAddToWatchlist = () => {
    // TODO: Implement add to watchlist functionality
    console.log('Add to watchlist clicked');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex flex-col">
        <div className="flex-grow">
          <div className="relative">
            {/* Hero Section with Backdrop */}
            <div
              className="relative h-[600px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${backdropUrl})`
              }}
            >
              <div className="absolute inset-0 bg-tmdbDarkBlue/80" />
              <div className="relative max-w-8xl mx-auto px-4 py-8 h-full">
                <div className="flex h-full gap-8">
                  {/* Poster */}
                  <div className="w-[300px] flex-shrink-0">
                    <img
                      src={posterUrl}
                      alt={movie.title}
                      className="w-full h-[450px] rounded-lg object-cover shadow-lg"
                    />
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 text-white pt-8">
                    <h1 className="text-4xl font-bold mb-2">
                      {movie.title} <span className="font-normal">({new Date(movie.release_date).getFullYear()})</span>
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                      {/* Release date and other info */}
                      <div className="flex items-center gap-2 text-sm">
                        <span>{formatDate(movie.release_date)}</span>
                        <span>•</span>
                        <span>{movie.genres?.map((g: { name: string }) => g.name).join(', ')}</span>
                        <span>•</span>
                        <span>{formatRuntime(movie.runtime)}</span>
                      </div>
                    </div>

                    {/* Rating and Actions */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <CircularRating rating={movie.vote_average} />
                        <div className="text-sm">
                          User<br />Score
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <ActionButton
                          icon={heartIcon}
                          tooltip="Mark as favorite"
                          onClick={handleMarkAsFavorite}
                        />
                        <ActionButton
                          icon={bookmarkIcon}
                          tooltip="Add to your watchlist"
                          onClick={handleAddToWatchlist}
                        />
                      </div>
                    </div>

                    {/* Tagline */}
                    {movie.tagline && (
                      <div className="italic text-gray-300 mb-4">{movie.tagline}</div>
                    )}

                    {/* Overview */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Overview</h3>
                      <p className="text-gray-300">{movie.overview}</p>
                    </div>

                    {/* Credits */}
                    <div className="grid grid-cols-3 gap-8">
                      {movie.credits?.crew
                        ?.filter((person: { job: string }) => ['Director', 'Screenplay', 'Story'].includes(person.job || ''))
                        .slice(0, 3)
                        .map((person: { id: number; name: string; job: string }) => (
                          <div key={person.id}>
                            <h4 className="font-bold">{person.name}</h4>
                            <p className="text-sm text-gray-300">{person.job}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cast Section */}
            <div className="max-w-8xl mx-auto px-4 py-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Top Billed Cast</h2>
                <Link
                  to={`/movie/${movie.tmdb_id}/cast`}
                  className="text-tmdbLightBlue hover:text-tmdbLightBlue/80"
                >
                  Full Cast & Crew
                </Link>
              </div>
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400/30 scrollbar-track-transparent">
                <div className="flex gap-4">
                  {movie.credits?.cast?.slice(0, 10).map((person: any) => (
                    <div key={person.id} className="flex-none w-[140px]">
                      <Link to={`/person/${person.id}`} className="hover:opacity-75 transition-opacity">
                        <div className="rounded-lg overflow-hidden">
                          <ProfileImage
                            path={person.profile_path}
                            name={person.name}
                            className="w-full h-[175px] object-cover"
                            type="tmdbPath"
                          />
                        </div>
                        <h3 className="mt-2 font-semibold line-clamp-2">{person.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{person.character}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="max-w-8xl mx-auto px-4 pb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Reviews</h2>
                {user && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="text-tmdbLightBlue hover:text-tmdbLightBlue/80"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {/* Review Form Modal */}
              {showReviewForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                    <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                    <ReviewForm movieId={id as string} onClose={() => setShowReviewForm(false)} />
                  </div>
                </div>
              )}

              {movie.reviews?.length > 0 ? (
                <div className="space-y-8">
                  {[...movie.reviews]
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 3)
                    .map((review: any) => (
                      <div key={review.id} className="bg-white rounded-lg p-6 shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <ProfileImage
                              path={review.author_details?.avatar_path}
                              name={review.author}
                              className="w-16 h-16 rounded-full"
                              type="mixedPath"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-lg">A review by {review.author}</h3>
                              {review.author_details?.rating && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">Rating:</span>
                                  <CircularRating rating={review.author_details.rating} />
                                </div>
                              )}
                            </div>
                            <p className="text-gray-500 text-sm mb-4">
                              Written on {new Date(review.created_at).toLocaleDateString()}
                            </p>
                            <div className="prose prose-sm max-w-none">
                              <p>{review.content}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  We don't have any reviews for {movie.title} yet.
                </div>
              )}
            </div>

            {/* Similar Movies */}
            {movie.similarMovies?.items?.length > 0 && (
              <div className="max-w-8xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
                <MovieList movies={movie.similarMovies.items} />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MovieDetail;