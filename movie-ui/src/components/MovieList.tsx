import MovieCard from './MovieCard';

interface MovieListProps {
  movies: any[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="flex gap-4">
      {movies.map((movie) => (
        <div key={movie.tmdb_id} className="flex-none w-[150px]">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
