const MovieList = ({ movies }: { movies: any[] }) => {
  return (
    <div className="flex gap-4">
      {movies.map((movie) => (
        <div key={movie.id} className="flex-none w-[150px]">
          <div className="rounded-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[225px] object-cover"
            />
          </div>
          <h3 className="mt-2 font-semibold line-clamp-2">{movie.title}</h3>
          <p className="text-sm text-gray-500">{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
