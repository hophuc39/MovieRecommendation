import { Link } from 'react-router';

const MovieList = ({ movies }: { movies: any[] }) => {
  return (
    <div className="flex gap-4">
      {movies.map((movie) => (
        <Link
          key={movie.tmdb_id}
          to={`/movie/${movie.tmdb_id}`}
          className="flex-none w-[150px] hover:opacity-75 transition-opacity"
        >
          <div className="rounded-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[225px] object-cover"
            />
          </div>
          <h3 className="mt-2 font-semibold line-clamp-2">{movie.title}</h3>
          <p className="text-sm text-gray-500">{movie.release_date}</p>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
