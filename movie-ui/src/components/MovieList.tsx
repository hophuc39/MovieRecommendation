
interface MovieListProps {
  movies: any[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="relative">
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none w-[150px]"
          >
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[225px] object-cover"
              />
              <div className="p-2">
                <h3 className="font-bold text-sm truncate" title={movie.title}>
                  {movie.title}
                </h3>
                <p className="text-gray-600 text-sm">{movie.release_date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
