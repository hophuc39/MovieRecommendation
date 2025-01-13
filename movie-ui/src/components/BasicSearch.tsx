import { useState } from 'react';
import { useNavigate } from 'react-router';

const BasicSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for a movie, tv show, person......"
        className="flex-1 px-6 py-4 rounded-l-full text-lg focus:outline-none"
      />
      <button
        type="submit"
        className="px-8 py-4 bg-gradient-to-r from-tmdbLightGreen to-tmdbLightBlue text-white rounded-r-full font-bold hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
};

export default BasicSearch; 