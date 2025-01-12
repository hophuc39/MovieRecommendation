interface MovieFilterProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
  selectedGenres: number[];
  onGenreChange: (genreId: number) => void;
  genres: { id: number; name: string; }[];
  minUserVotes: number;
  onMinUserVotesChange: (value: number) => void;
  minUserScore: number;
  onMinUserScoreChange: (value: number) => void;
}

const MovieFilter = ({
  selectedSort,
  onSortChange,
  selectedGenres,
  onGenreChange,
  genres,
  minUserVotes,
  onMinUserVotesChange,
  minUserScore,
  onMinUserScoreChange
}: MovieFilterProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm space-y-6">
      <div>
        <h3 className="font-bold mb-4">Sort</h3>
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
          <option value="title.asc">Title (A-Z)</option>
          <option value="title.desc">Title (Z-A)</option>
        </select>
      </div>

      <div>
        <h3 className="font-bold mb-4">Genres</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {genres.map(genre => (
            <label key={genre.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.id)}
                onChange={() => onGenreChange(genre.id)}
                className="rounded text-tmdbLightBlue focus:ring-tmdbLightBlue"
              />
              {genre.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">User Score</h3>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={minUserScore}
          onChange={(e) => onMinUserScoreChange(parseFloat(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-1">
          {minUserScore} or higher
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Minimum User Votes</h3>
        <input
          type="range"
          min="0"
          max="500"
          step="50"
          value={minUserVotes}
          onChange={(e) => onMinUserVotesChange(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-1">
          {minUserVotes} votes
        </div>
      </div>
    </div>
  );
};

export default MovieFilter; 