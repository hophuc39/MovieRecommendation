import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseSetup';

const SearchContainer = () => {
  const [user] = useAuthState(auth);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  console.log(user);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };
  

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Describe the movie you're looking for..."
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

export default SearchContainer;
