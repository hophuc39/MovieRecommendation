import { Link } from 'react-router';
import CircularRating from './CircularRating';
import { useState } from 'react';

interface MovieCardProps {
  movie: any;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);
  const defaultMovieImage = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="group relative">
      <Link to={`/movie/${movie.tmdb_id}`}>
        {/* Poster Image */}
        <div className="rounded-lg overflow-hidden mb-4 bg-gray-200">
          <img
            src={!imageError && movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultMovieImage
            }
            alt={movie.title}
            onError={() => setImageError(true)}
            className={`w-full aspect-[2/3] object-cover transform transition duration-300 group-hover:scale-105
              ${(!movie.poster_path || imageError) ? 'p-8 object-contain' : ''}`}
          />
        </div>

        {/* Rating Circle */}
        <div className="absolute bottom-16 left-2">
          <CircularRating rating={movie.vote_average} />
        </div>

        {/* Movie Info */}
        <div className="pt-6">
          <h2 className="font-bold text-base line-clamp-1 group-hover:text-tmdbLightBlue transition-colors duration-200">
            {movie.title}
          </h2>
          <p className="text-gray-500 text-sm">
            {formatDate(movie.release_date)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;